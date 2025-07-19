// File: components/PortfolioSectionsSelector.jsx
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle, faInfoCircle, faPhone, faBriefcase, faFileAlt, faLightbulb,
  faBuilding, faGraduationCap, faTrophy, faTasks, faQuoteRight, faCertificate,
  faNewspaper, faSearchPlus, faImages, faVideo, faHeadphonesAlt, faPalette,
  faBlog, faEnvelopeOpenText, faQuestionCircle, faShareAlt, faGlobe, faCodeBranch,
  faLock // Needed for disabled options
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin, faGithub, faTwitter, faFacebook, faInstagram // Examples for social media
} from '@fortawesome/free-brands-svg-icons'; // For brand icons


export default function PortfolioSectionsSelector({ label, name, selectedSections, onChange, description, currentPlanTier, planTiersOrder }) {
  // Helper function to check if an option is allowed based on the current plan tier
  const isOptionAllowed = (optionMinPlan) => {
    if (!currentPlanTier) return false; // If no plan is selected, disable all
    const currentTierIndex = planTiersOrder.indexOf(currentPlanTier);
    const optionTierIndex = planTiersOrder.indexOf(optionMinPlan);
    return currentTierIndex >= optionTierIndex;
  };

  // Define comprehensive portfolio sections with categories and Font Awesome icons
  // Added plan-specific border colors
  const getPlanBorderColorClass = (minPlan) => {
    switch (minPlan) {
      case 'essential':
        return 'border-blue-300'; // Light blue for essential
      case 'enhanced':
        return 'border-purple-300'; // Light purple for enhanced
      case 'premium':
        return 'border-yellow-300'; // Light yellow for premium
      default:
        return 'border-gray-200'; // Default
    }
  };

  const portfolioSectionOptions = [
    {
      category: "Core Essentials",
      description: "Fundamental sections for any professional portfolio to establish your online presence.",
      options: [
        { id: "profilePhoto", title: "Profile Photo & Header", minPlan: "essential", icon: faUserCircle },
        { id: "aboutMe", title: "About Me / Bio", minPlan: "essential", icon: faInfoCircle },
        { id: "contactInfo", title: "Contact Information", minPlan: "essential", icon: faPhone },
        { id: "services", title: "Services Offered", minPlan: "enhanced", icon: faBriefcase },
        { id: "callToAction", title: "Call to Action", minPlan: "enhanced", icon: faGlobe }
      ],
    },
    {
      category: "Professional Showcase",
      description: "Highlight your expertise, career journey, and significant contributions.",
      options: [
        { id: "resume", title: "Resume / CV", minPlan: "essential", icon: faFileAlt },
        { id: "skills", title: "Skills & Expertise", minPlan: "essential", icon: faLightbulb },
        { id: "experience", title: "Work Experience", minPlan: "enhanced", icon: faBuilding },
        { id: "education", title: "Education & Qualifications", minPlan: "essential", icon: faGraduationCap },
        { id: "achievements", title: "Awards & Achievements", minPlan: "essential", icon: faTrophy },
        { id: "projects", title: "Notable Projects", minPlan: "essential", icon: faTasks },
        { id: "codeSnippets", title: "Code Snippets / Gists", minPlan: "premium", icon: faCodeBranch }
      ],
    },
    {
      category: "Impact & Credibility",
      description: "Build trust, validate your skills, and showcase your professional recognition.",
      options: [
        { id: "testimonials", title: "Client Testimonials", minPlan: "premium", icon: faQuoteRight },
        { id: "certificates", title: "Certifications", minPlan: "essential", icon: faCertificate },
        { id: "publications", title: "Publications / Articles", minPlan: "premium", icon: faNewspaper },
        { id: "caseStudies", title: "Case Studies / Portfolio Items", minPlan: "premium", icon: faSearchPlus },
      ],
    },
    {
      category: "Creative Media & Assets",
      description: "Showcase your visual work, audio samples, and dynamic content.",
      options: [
        { id: "imageGallery", title: "Image Gallery", minPlan: "enhanced", icon: faImages },
        { id: "videoShowcase", title: "Video Showcase", minPlan: "premium", icon: faVideo },
        { id: "audioSamples", title: "Audio Samples", minPlan: "premium", icon: faHeadphonesAlt },
        { id: "animationsGraphics", title: "Animations", minPlan: "premium", icon: faPalette },
      ],
    },
    {
      category: "Engagement & Growth",
      description: "Tools to connect with visitors, expand your reach, and answer common questions.",
      options: [
        { id: "blog", title: "Blog / Latest Posts", minPlan: "enhanced", icon: faBlog },
        { id: "newsletter", title: "Newsletter Signup", minPlan: "enhanced", icon: faEnvelopeOpenText },
        { id: "faq", title: "FAQ Section", minPlan: "enhanced", icon: faQuestionCircle },
        { id: "socialIcons", title: "Social Media Links", minPlan: "essential", icon: faShareAlt },
        { id: "customSection", title: "Custom Section", minPlan: "premium", icon: faGlobe }
      ],
    },
  ];

  const handleToggleSection = (optionId, optionMinPlan) => {
    if (!isOptionAllowed(optionMinPlan)) {
      return;
    }
    onChange(optionId, !selectedSections.includes(optionId));
  };

  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-blue-gemini-700 mb-4">{label}</h3>
      {description && <p className="text-gray-700 mb-6">{description}</p>}

      {!currentPlanTier && (
        <p className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg mb-6">
          Please select a portfolio plan above to enable section selections.
        </p>
      )}

      <div className="space-y-8"> {/* Spacing between categories */}
        {portfolioSectionOptions.map((categoryData) => (
          <div key={categoryData.category} className="border glass border-gray-gemini-200 rounded-xl p-6 bg-gray-gemini-50">
            <h4 className="text-xl font-bold text-gray-gemini-800 mb-2">{categoryData.category}</h4>
            <p className="text-gray-gemini-600 text-sm mb-5">{categoryData.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryData.options.map((option) => {
                const isSelected = selectedSections.includes(option.id);
                const isDisabled = !isOptionAllowed(option.minPlan);
                const borderColorClass = getPlanBorderColorClass(option.minPlan);

                return (
                  <div
                    key={option.id}
                    className={`relative p-4 rounded-lg border transition-all duration-200 ease-in-out group
                                ${isDisabled
                                  ? `opacity-60 cursor-not-allowed bg-gray-100 ${borderColorClass}` // Disabled styles
                                  : isSelected
                                    ? `border-blue-500 bg-gradient-to-b from-[rgb(213,235,247)] to to-[rgb(238,244,249)] shadow-md transform animate-gradient-shift` // Selected with gradient animation
                                    : `border-gray-200 bg-white hover:${borderColorClass} hover:shadow-sm cursor-pointer`
                                }
                                ${!isDisabled ? 'active:scale-95 active:shadow-lg transform-gpu' : ''} `} // Pop on active
                    onClick={() => handleToggleSection(option.id, option.minPlan)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={option.icon} className={`w-8 h-8 text-xl ${isDisabled ? "text-gray-400" : "text-blue-600"}`} />
                      </div>
                      <span className={`font-medium text-lg ${isDisabled ? "text-gray-500" : (isSelected ? "text-blue-800" : "text-gray-800")}`}>
                        {option.title}
                      </span>
                    </div>
  
                    {isDisabled && (
                       <div className="absolute top-2 right-2 text-gray-500" title={`Available in ${option.minPlan} plan`}>
                         <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
                       </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind CSS for gradient-shift animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-shift {
          background-size: 200% 200%; /* Important for background position animation */
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
}