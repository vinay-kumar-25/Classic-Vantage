// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '/firebaseConfig'; // Your Firebase config
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Create a query to get documents from the 'orders' collection, ordered by submissionDate
        const ordersCollectionRef = collection(db, "orders");
        const q = query(ordersCollectionRef, orderBy("submissionDate", "desc")); // Newest first

        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id, // Document ID
          ...doc.data() // All fields from the document
        }));
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div className="text-center py-10 text-lg font-medium text-gray-700">Loading orders...</div>;
  if (error) return <div className="text-center py-10 text-xl font-bold text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      <header className="bg-gradient-to-r from-blue-gemini-700 to-blue-gemini-900 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 leading-tight">
            Classic Vantage Admin Dashboard
          </h1>
          <p className="text-xl sm:text-2xl font-light opacity-90">
            Reviewing client project inquiries.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Received Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center text-xl text-gray-600 p-8 bg-white rounded-lg shadow-sm">No orders received yet. Stay tuned!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-blue-gemini-700 mb-2">{order.name}</h3>
                  <p className="text-gray-700 mb-1">Email: <span className="font-medium">{order.email}</span></p>
                  <p className="text-gray-700 mb-1">Plan: <span className="font-medium">{order.priceRange ? `₹${order.priceRange}` : 'Not Selected'}</span></p>
                  <p className="text-gray-600 text-sm italic mb-4">
                    Submitted: {order.submissionDate?.toDate().toLocaleString() || 'N/A'}
                  </p>

                  <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                    <p className="text-gray-800 font-semibold">Desired Style:</p>
                    <p className="text-gray-600 text-sm">{order.desiredPortfolioStyle || 'Not provided'}</p>

                    {order.achievements && order.achievements.length > 0 && (
                      <div>
                        <p className="text-gray-800 font-semibold mt-3">Achievements:</p>
                        <ul className="list-disc list-inside text-gray-600 text-sm">
                          {order.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                        </ul>
                      </div>
                    )}

                    {order.projects && order.projects.length > 0 && (
                      <div>
                        <p className="text-gray-800 font-semibold mt-3">Projects:</p>
                        <ul className="list-disc list-inside text-gray-600 text-sm">
                          {order.projects.map((proj, i) => (
                            <li key={i}>
                              {proj.name} ({proj.time || 'N/A'})
                              {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-gemini-500 hover:underline ml-1">(Link)</a>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {order.selectedFeatures && order.selectedFeatures.length > 0 && (
                      <div>
                        <p className="text-gray-800 font-semibold mt-3">Selected Features:</p>
                        <ul className="list-disc list-inside text-gray-600 text-sm">
                          {order.selectedFeatures.map((feat, i) => <li key={i}>{feat}</li>)}
                        </ul>
                      </div>
                    )}

                    {order.portfolioSections && order.portfolioSections.length > 0 && (
                      <div>
                        <p className="text-gray-800 font-semibold mt-3">Portfolio Sections:</p>
                        <ul className="list-disc list-inside text-gray-600 text-sm">
                          {order.portfolioSections.map((sec, i) => <li key={i}>{sec}</li>)}
                        </ul>
                      </div>
                    )}

                    {order.preferredColors && order.preferredColors.length > 0 && (
                      <div>
                        <p className="text-gray-800 font-semibold mt-3">Preferred Colors:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {order.preferredColors.map((color, i) => (
                            <span
                              key={i}
                              className="w-8 h-8 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                              title={color}
                            ></span>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.otherRequirements && (
                      <div>
                        <p className="text-gray-800 font-semibold mt-3">Other Requirements:</p>
                        <p className="text-gray-600 text-sm italic">{order.otherRequirements}</p>
                      </div>
                    )}

                    {/* File Links (if available) */}
                    {(order.resume || order.profilePhoto || order.paymentScreenshot) && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-800 font-semibold mb-2">Attached Files:</p>
                        {order.resume && (
                          <p className="text-sm">Resume: <a href={order.resume} target="_blank" rel="noopener noreferrer" className="text-blue-gemini-600 hover:underline break-words">View Resume</a></p>
                        )}
                        {order.profilePhoto && (
                          <p className="text-sm">Profile Photo: <a href={order.profilePhoto} target="_blank" rel="noopener noreferrer" className="text-blue-gemini-600 hover:underline break-words">View Photo</a></p>
                        )}
                        {order.paymentScreenshot && (
                          <p className="text-sm">Payment Proof: <a href={order.paymentScreenshot} target="_blank" rel="noopener noreferrer" className="text-blue-gemini-600 hover:underline break-words">View Screenshot</a></p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Classic Vantage. All rights reserved.</p>
          <p className="mt-2 text-sm">Admin Access.</p>
        </div>
      </footer>
    </div>
  );
}