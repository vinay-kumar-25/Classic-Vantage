// src/App.js (Example using react-router-dom)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import AdminDashboard from './components/AdminDashboard'; // Import the dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div><ClientForm /></div>} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* New route for admin */}
        {/* Other routes if any */}
      </Routes>
    </Router>
  );
} 

export default App;