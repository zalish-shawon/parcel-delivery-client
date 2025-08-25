import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Tracking from './pages/Tracking';
import SenderDashboard from './pages/dashboard/SenderDashboard';
import ReceiverDashboard from './pages/dashboard/ReceiverDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';


const App: React.FC = () => {
return (
<Layout>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/tracking" element={<Tracking />} />


<Route
path="/dashboard/sender"
element={<ProtectedRoute role="sender"><SenderDashboard /></ProtectedRoute>}
/>
<Route
path="/dashboard/receiver"
element={<ProtectedRoute role="receiver"><ReceiverDashboard /></ProtectedRoute>}
/>
<Route
path="/dashboard/admin"
element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
/>


<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
<ToastContainer position="top-right" />
</Layout>
);
};


export default App;