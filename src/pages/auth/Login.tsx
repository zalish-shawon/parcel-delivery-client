import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../store/slices/api';


const Login: React.FC = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useAppDispatch();
const navigate = useNavigate();
const [login, { isLoading }] = useLoginMutation();


const submit = async (e: React.FormEvent) => {
e.preventDefault();
try {
const data = await login({ email, password }).unwrap();
dispatch(setCredentials({ token: data.token, user: data.user }));
toast.success('Login successful');
if (data.user.role === 'sender') navigate('/dashboard/sender');
else if (data.user.role === 'receiver') navigate('/dashboard/receiver');
else if (data.user.role === 'admin') navigate('/dashboard/admin');
} catch (err: any) {
toast.error(err.data?.message || err.message || 'Login error');
}
};


return (
<div className="max-w-md mx-auto">
<h2 className="text-2xl font-semibold mb-4">Login</h2>
<form onSubmit={submit} className="flex flex-col gap-2">
<input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
<input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
<button className="btn mt-2" disabled={isLoading}>{isLoading ? 'Logging...' : 'Login'}</button>
</form>
</div>
);
};
export default Login;