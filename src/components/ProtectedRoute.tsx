import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';


const ProtectedRoute: React.FC<{ children: JSX.Element; role?: string }> = ({ children, role }) => {
const user = useAppSelector(s => s.auth.user);
if (!user) return <Navigate to="/login" replace />;
if (role && user.role !== role) return <Navigate to="/" replace />;
return children;
};


export default ProtectedRoute;