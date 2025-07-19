// File: components/ClientForm.jsx

import { useState, useEffect } from "react";
import FormField from "./FormField";
import FileUpload from "./FileUpload";
import PriceCardSelector from "./PriceCardSelector";
import ColorPalettePicker from "./ColorPalettePicker";
import PortfolioSectionsSelector from "./PortfolioSectionsSelector";
import qrcode from "/qrcode.jpeg"
// NEW IMPORTS:
import AchievementList from "./AchievementList"; // Assuming this path
import ProjectList from "./ProjectList";         // Assuming this path
import SocialLinkList from "./SocialLinkList";   // Assuming this path

// Firebase imports
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ... rest of your ClientForm component

const YOUR_UPI_ID = "bajrangsoni080@oksbi"; // Replace with your actual UPI ID
const UPI_QR_CODE_URL_BASE = `https://upiqr.in/api/qr?vpa=${YOUR_UPI_ID}&amount=`; // Example QR API (replace with a reliable one)

export default function ClientForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    resume: null, // File object
    profilePhoto: null, // File object
    desiredPortfolioStyle: "",
    achievements: [],
    projects: [],
    socialLinks: [],
    priceRange: "",
    selectedFeatures: [],
    preferredColors: [],
    portfolioSections: [],
    otherRequirements: "",
    consentToProceed: false,
    paymentScreenshot: null, // File object
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status

  // Define the order of plan tiers for comparison
  const planTiersOrder = ['essential', 'enhanced', 'premium'];

  // ... (priceOptions and featureOptions are the same as before)
  const priceOptions = [
    {
      value: "99",
      label: "Foundation", // Professional name
      icon: "✨",
      slogan: "Your essential digital footprint, simplified.",
      tier: "essential",
      features: [
        "Single-page responsive design",
        "Curated template selection",
        "Personalized content integration"
      ],
      insight: "Initiate your professional journey. A strategic investment for immediate impact.",
    },
    {
      value: "199",
      label: "Ascend", // Professional name
      icon: "🚀",
      slogan: "Elevate your professional narrative with dynamic presentation.",
      tier: "enhanced",
      badge: "Most Popular", // Professional badge
      features: [
        "Multi-section interactive layout",
        "Customized brand aesthetics",
        "Subtle scroll animations",
        "Dedicated contact module"
      ],
      insight: "Command attention. Your expertise, showcased with refined precision.",
    },
    {
      value: "399",
      label: "Apex", // Professional name
      icon: "🌟",
      slogan: "Establish unparalleled authority and strategic digital presence.",
      tier: "premium",
      features: [
        "Comprehensive multi-page structure",
        "Advanced interactive elements",
        "Seamless social media integration",
        "Optimized for search engines (SEO)"
      ],
      insight: "Define your legacy. A distinguished platform for leading industry visionaries.",
    },
  ];

  const featureOptions = [
    { value: "contactForm", label: "Interactive Contact Form", minPlan: "essential" },
    { value: "advancedAnimations", label: "Advanced Animations & Interactions", minPlan: "premium" },
    { value: "socialShare", label: "Social Media Share Buttons", minPlan: "enhanced" },
    { value: "basicAnalytics", label: "Basic Analytics Integration", minPlan: "enhanced" },
    { value: "siteSearch", label: "Site Search Functionality", minPlan: "premium" },
    { value: "dynamicContentFilters", label: "Dynamic Content Filters (e.g., projects)", minPlan: "premium" },
    { value: "accessibilityFeatures", label: "Advanced Accessibility Features", minPlan: "enhanced" },
  ];


  const currentPlanTier = priceOptions.find(opt => opt.value === form.priceRange)?.tier || null;

  // ... (useEffect hook for deselecting features/sections is the same)
  useEffect(() => {
    if (!currentPlanTier) return; // Do nothing if no plan is selected

    const currentTierIndex = planTiersOrder.indexOf(currentPlanTier);

    setForm(prevForm => {
      let updatedFeatures = [...prevForm.selectedFeatures];
      let updatedSections = [...prevForm.portfolioSections];
      let changesMade = false;

      // Deselect features not available in the current plan
      updatedFeatures = updatedFeatures.filter(featureId => {
        const featureDef = featureOptions.find(f => f.value === featureId);
        if (featureDef && planTiersOrder.indexOf(featureDef.minPlan) > currentTierIndex) {
          changesMade = true;
          return false; // Remove this feature
        }
        return true; // Keep this feature
      });

      // To handle the `portfolioSections` deselection accurately in `ClientForm`,
      // we need the `portfolioSectionOptions` definition here, or a simplified `minPlan` map for them.
      // Let's add a simplified map for now.
      const getMinPlanForSection = (id) => {
        // This is a simplified map. In a real app, you'd import the full definitions.
        const map = {
          profilePhoto: 'essential', aboutMe: 'essential', contactInfo: 'essential', services: 'enhanced',
          resume: 'essential', skills: 'essential', experience: 'enhanced', education: 'enhanced',
          achievements: 'essential', projects: 'essential', testimonials: 'premium', certificates: 'premium',
          publications: 'premium', caseStudies: 'premium', imageGallery: 'premium', videoShowcase: 'premium',
          audioSamples: 'premium', animationsGraphics: 'premium', blog: 'enhanced', newsletter: 'enhanced',
          faq: 'enhanced', socialIcons: 'essential', clientLogin: 'premium', bookingSystem: 'premium',
          eCommerce: 'premium', multilingual: 'premium'
        };
        return map[id] || 'premium'; // Default to premium if not found (safer)
      };

      updatedSections = updatedSections.filter(sectionId => {
        const minPlan = getMinPlanForSection(sectionId);
        if (planTiersOrder.indexOf(minPlan) > currentTierIndex) {
          changesMade = true;
          return false;
        }
        return true;
      });


      if (changesMade) {
        return {
          ...prevForm,
          selectedFeatures: updatedFeatures,
          portfolioSections: updatedSections,
        };
      }
      return prevForm;
    });
  }, [form.priceRange, currentPlanTier]);


 const handleChange = (e) => {
  const { name, value, files, type, checked } = e.target;

  let newValue;

  // Handle file inputs specifically
  if (type === "file") {
    // If files exist (e.g., FileList is not empty), take the first file.
    // Otherwise, set to null (if no file is selected or cleared).
    newValue = files && files.length > 0 ? files[0] : null;
  } else if (type === "checkbox") {
    newValue = checked;
  } else {
    // For all other input types (text, textarea, select)
    newValue = value;
  }

  setForm((prevForm) => {
    const newForm = {
      ...prevForm,
      [name]: newValue,
    };

    // Remove error for this field if it exists
    if (errors[name]) {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return { ...newForm, errors: newErrors }; // Return updated form and errors
    }
    return newForm;
  });
};

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    const featureDef = featureOptions.find(f => f.value === value);
    if (!featureDef || planTiersOrder.indexOf(currentPlanTier) < planTiersOrder.indexOf(featureDef.minPlan)) {
      return;
    }

    setForm((prevForm) => {
      const newFeatures = checked
        ? [...prevForm.selectedFeatures, value]
        : prevForm.selectedFeatures.filter((feature) => feature !== value);
      return { ...prevForm, selectedFeatures: newFeatures };
    });
  };

  const handleColorChange = (colors) => {
    setForm((prevForm) => ({
      ...prevForm,
      preferredColors: colors,
    }));
  };

  const handlePortfolioSectionChange = (sectionId, isChecked) => {
    setForm((prevForm) => {
      const newSections = isChecked
        ? [...prevForm.portfolioSections, sectionId]
        : prevForm.portfolioSections.filter((id) => id !== sectionId);
      return { ...prevForm, portfolioSections: newSections };
    });
  };

  const handleAddItem = (fieldName, newItem) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: [...prevForm[fieldName], newItem],
    }));
  };

  const handleRemoveItem = (fieldName, index) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: prevForm[fieldName].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Your Full Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Your Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.priceRange) newErrors.priceRange = "Please select a portfolio plan.";

    if (form.consentToProceed) {
      if (!form.paymentScreenshot) newErrors.paymentScreenshot = "Please upload a screenshot of your successful UPI payment.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to upload files to Firebase Storage
  const uploadFile = async (file, path) => {
    if (!file) return null;
    const storageRef = ref(storage, `${path}/${file.name}_${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    alert("Please review and correct the highlighted fields before submitting.");
    return;
  }

  setIsSubmitting(true); // Disable the submit button
  let submissionForm = { ...form };

  try {
    // Log each upload step to trace delays
    console.log("Uploading resume...");
    submissionForm.resume = await uploadFile(form.resume, 'resumes');
    console.log("✅ Resume uploaded:", submissionForm.resume);

    console.log("Uploading profile photo...");
    submissionForm.profilePhoto = await uploadFile(form.profilePhoto, 'profilePhotos');
    console.log("✅ Profile photo uploaded:", submissionForm.profilePhoto);

    console.log("Uploading payment screenshot...");
    submissionForm.paymentScreenshot = await uploadFile(form.paymentScreenshot, 'paymentScreenshots');
    console.log("✅ Payment screenshot uploaded:", submissionForm.paymentScreenshot);

    // Add submission date
    submissionForm.submissionDate = new Date();

    // Save to Firestore
    console.log("Saving data to Firestore...");
    const docRef = await addDoc(collection(db, "orders"), submissionForm);
    console.log("✅ Document written with ID:", docRef.id);

    alert("Thank you! Your project details have been received and saved successfully. We will be in touch shortly!");

    // Reset the form
    setForm({
      name: "",
      email: "",
      resume: null,
      profilePhoto: null,
      desiredPortfolioStyle: "",
      achievements: [],
      projects: [],
      socialLinks: [],
      priceRange: "",
      selectedFeatures: [],
      preferredColors: [],
      portfolioSections: [],
      otherRequirements: "",
      consentToProceed: false,
      paymentScreenshot: null,
    });

    setErrors({});
  } catch (error) {
    console.error("🚨 Error during submission:", error);
    alert("There was an error submitting your form. Please try again.\n\n" + error.message);
  } finally {
    setIsSubmitting(false); // ✅ Ensure the button is re-enabled
  }
};



  function getSelectedPriceInfo() {
    const selected = priceOptions.find(opt => opt.value === form.priceRange);
    return {
      label: selected ? selected.label : "Not selected",
      amount: selected ? selected.value : "0",
    };
  }

  const selectedPriceInfo = getSelectedPriceInfo();
  const upiQrCodeUrl = form.priceRange ? `${UPI_QR_CODE_URL_BASE}${selectedPriceInfo.amount}` : '';

  return (
    <div className="background min-h-screen  font-sans text-gray-900 ">
      <header className="bg-gradient-to-b from-[rgb(213,235,247)] to to-[rgb(238,244,249)] shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
     
          {/* <img src="../../public/brandwhite.png" alt="" className="md:h-30 mb-4 " /> */}
          <div className="h-full p-6 justify-center flex gap-4 items-center text-5xl text-blue-900 font-bold"><img src="logo.svg" className="h-20" alt="" />Classic Vantage</div>
          
        </div>
      </header>

      {/* Increased max-width for main container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <p className="text-lg text-center text-gray-700 mb-8">
          Share your details and vision below. Our team at Classic Vantage is excited to bring your professional story to life.
        </p>

        <form className="space-y-12" onSubmit={handleSubmit}>

          {/* Personal Details */}
          <section className="p-8 glass rounded-2xl grid grid-cols-1 md:gap-0 gap-6 md:grid-cols-2">
              <div className="herosection"></div>
            <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-8 text-center">Your Core Details</h2>
            <div className="space-y-2 grid grid-cols-1 gap-2">
              <FormField
                label="Full Name"
                name="name"
                type="text"
                placeholder="e.g., Sarah Chen"
                onChange={handleChange}
                value={form.name}
                error={errors.name}
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="e.g., sarah.chen@example.com"
                onChange={handleChange}
                value={form.email}
                error={errors.email}
              />
              <FileUpload
                label="Upload Your Latest Resume/CV"
                name="resume"
                onChange={handleChange}
              />
              <FileUpload
                label="Upload a Professional Profile Photo"
                name="profilePhoto"
                onChange={handleChange}
              />
            </div>
            </div>
          </section>

          {/* Portfolio Vision */}
          <section className="py-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">Crafting Your Vision</h2>
            <div className="space-y-10">

              {/* Desired Portfolio Style */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-gemini-700 mb-4">Your Desired Aesthetic</h3>
                <p className="text-gray-700 mb-4">Describe the overall look and feel you envision for your Classic Vantage portfolio. Think about colors, layouts, and general mood.</p>
                <FormField
                  label=""
                  name="desiredPortfolioStyle"
                  type="textarea"
                  placeholder="e.g., 'A modern, clean design with bold typography and interactive elements.', 'Elegant and timeless, emphasizing my design work with a soft color palette.'"
                  onChange={handleChange}
                  value={form.desiredPortfolioStyle}
                  rows={4}
                />
              </div>

              {/* Key Achievements */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-gemini-700 mb-4">Key Achievements & Highlights</h3>
                <p className="text-gray-700 mb-4">Share your most impactful achievements or career highlights. Each entry should be concise and demonstrate your value.</p>
                <AchievementList
                  achievements={form.achievements}
                  onAddAchievement={(newAchievement) => handleAddItem("achievements", { id: Date.now(), text: newAchievement })}
                  onRemoveAchievement={(index) => handleRemoveItem("achievements", index)}
                />
              </div>
              <hr className="border-t border-gray-200" />

              {/* Notable Projects */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-gemini-700 mb-4">Showcase Your Notable Projects</h3>
                <p className="text-gray-700 mb-4">Detail the key projects you've worked on. Highlight your role, the challenges, and the impact you made. Include links if available.</p>
                <ProjectList
                  projects={form.projects}
                  onAddProject={(newProject) => handleAddItem("projects", { id: Date.now(), ...newProject })}
                  onRemoveProject={(index) => handleRemoveItem("projects", index)}
                />
              </div>
              <hr className="border-t border-gray-200" />

              {/* Social & Professional Links */}
              <div>
                <h3 className="text-2xl font-semibold text-blue-gemini-700 mb-4">Connect Your Professional Presence</h3>
                <p className="text-gray-700 mb-4">Provide links to your professional platforms where people can learn more about you.. </p>
                <SocialLinkList
                  links={form.socialLinks}
                  onAddLink={(newLink) => handleAddItem("socialLinks", { id: Date.now(), ...newLink })}
                  onRemoveLink={(index) => handleRemoveItem("socialLinks", index)}
                />
              </div>
            </div>
          </section>

          {/* Portfolio Features & Plan - Updated Section */}
          <section className="py-8">
            <div className="space-y-10">
              {/* Portfolio Plan Selection - Using PriceCardSelector */}
              <div>
                <PriceCardSelector
                  label="Select Your Strategic Portfolio Plan"
                  name="priceRange"
                  options={priceOptions}
                  selectedValue={form.priceRange}
                  onChange={handleChange}
                  error={errors.priceRange}
                  description="Choose the Classic Vantage plan that best aligns with your professional aspirations and desired digital impact."
                />
              </div>
              <hr className="border-t border-gray-200" />

              {/* Portfolio Content Sections - NEW SECTION */}
              <div>
                <PortfolioSectionsSelector
                  label="Which Sections Would You Like to Include?"
                  name="portfolioSections"
                  selectedSections={form.portfolioSections}
                  onChange={handlePortfolioSectionChange}
                  currentPlanTier={currentPlanTier} // Pass current plan tier
                  planTiersOrder={planTiersOrder}   // Pass order for comparison
                  description="Select the key content areas you want to feature on your Classic Vantage portfolio website. (Multiple selections allowed)"
                />
              </div>
              <hr className="border-t border-gray-200" />
            </div>
          </section>

          {/* Customization & Other Requirements */}
          <section className="py-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">Personalize Your Vision</h2>

            <div className="space-y-10">
              <div>
                <ColorPalettePicker
                  label="Preferred Color Palette"
                  name="preferredColors"
                  selectedColors={form.preferredColors}
                  onChange={handleColorChange}
                  description="Define the aesthetic of your Classic Vantage portfolio by selecting a harmonious color palette."
                />
              </div>
              <hr className="border-t border-gray-200" />

              <div>
                <FormField
                  label="Any Specific Requirements or Additional Notes?"
                  name="otherRequirements"
                  type="textarea"
                  placeholder="Share any unique design preferences, content ideas, or other important details here. (e.g., 'I prefer a dark mode option', 'Integrate my Behance portfolio directly')"
                  onChange={handleChange}
                  value={form.otherRequirements}
                  rows={5}
                />
              </div>
            </div>
            <hr className="mt-12 border-t-2 border-gray-200" />
          </section>

          {/* Consent & Payment Section */}
          <section className="py-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">Confirm & Begin Your Project</h2>

            <div className="flex items-start mb-10 p-8 bg-gradient-to-br from-white to-transparent rounded-lg glass">
              <input
                type="checkbox"
                id="consentToProceed"
                name="consentToProceed"
                checked={form.consentToProceed}
                onChange={handleChange}
                className="form-checkbox mt-1.5 flex-shrink-0"
              />
              <label htmlFor="consentToProceed" className="ml-3 text-base text-gray-700 leading-relaxed cursor-pointer">
                I understand that by checking this box and proceeding, I am confirming my readiness to commence with the Classic Vantage portfolio creation based on my selections.
                <span className="font-bold block text-xl mt-2 text-blue-gemini-700">Estimated Project Cost: {form.priceRange ? `₹${selectedPriceInfo.amount}` : 'Please select a plan above.'}</span>
                <span className="text-sm text-gray-600 block mt-1">
                  (Detailed scope and feature confirmation will follow this submission.)
                </span>
              </label>
            </div>

            {form.consentToProceed && form.priceRange && (
              <div className="payment-section flex justify-center items-stretch gap-28 flex-col md:flex-row mt-10 p-12 bg-blue-gemini-50 rounded-xl border glass border-blue-gemini-100 grow text-center">
                {/* scanner left side */}
                <div className=" flex flex-col items-center"><p className=" text-gray-800 font-semibold text-xl">
                  <span className="text-blue-gemini-600">{YOUR_UPI_ID}</span>
                  </p>
                  {upiQrCodeUrl ? (
                    <img
                    src={qrcode}
                    alt="UPI QR Code"
                    className="mx-auto w-48 h-48 sm:w-56 sm:h-56 border border-gray-gemini-300 p-2 rounded-lg bg-white shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/192x192/E0E7FF/4338CA?text=QR+Code+Error"; }}
                    />
                  ) : (
                    <p className="text-red-500 text-sm mt-3">Please select a plan to generate the QR code.</p>
                  )}
                  
                  <p className="mt-2 text-gray-800 font-semibold text-xl">
                    Amount: <span className="text-blue-gemini-600">₹{selectedPriceInfo.amount}</span>
                  </p>
                </div>

                {/* right side ss and submit section  */}
                <div class="flex flex-col justify-around gap-6 items-start">
  <h3 class="text-2xl font-bold text-blue-gemini-800">Complete Your Payment via UPI</h3>
  <p class="text-lg text-gray-700">
    Your Classic Vantage plan: <span class="font-bold text-blue-gemini-600">{selectedPriceInfo.label}</span>
  </p>
  <FileUpload
    label="Upload Payment Confirmation Screenshot"
    name="paymentScreenshot"
    onChange={handleChange}
    error={errors.paymentScreenshot}
  />
  <button
    type="submit"
    class="w-full py-3 text-white text-xl font-bold rounded-3xl bg-gradient-to-r from-blue-gemini-400 to-blue-gemini-700 hover:from-blue-gemini-500 hover:to-blue-gemini-800 transition duration-300 ease-in-out transform hover:-translate-y-0.5  shadow-lg"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Submitting...' : (form.consentToProceed && form.priceRange ? `Submit` : 'Initiate Your Classic Vantage Project')}
  </button>
</div>
              
            
              </div>
            )}
          </section>


        </form>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Classic Vantage. All rights reserved.</p>
          <p className="mt-2 text-sm">Crafting timeless digital presences.</p>
        </div>
      </footer>
    </div>
  );
}