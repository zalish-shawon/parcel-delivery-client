import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../store/slices/api';
import { z } from 'zod';


const registerSchema = z.object({
name: z.string().min(1),
email: z.string().email(),
password: z.string().min(6),
role: z.enum(['sender','receiver'])
});


const Register: React.FC = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState<'sender'|'receiver'>('sender');
const navigate = useNavigate();
const [register, { isLoading }] = useRegisterMutation();


const submit = async (e: React.FormEvent) => {
e.preventDefault();
try {
const parsed = registerSchema.parse({ name, email, password, role });
await register(parsed).unwrap();
toast.success('Registered, please login');
navigate('/login');
} catch (err: any) {
toast.error(err?.data?.message || err.message || 'Registration error');
}
};


return (
<div className="max-w-md mx-auto">
<h2 className="text-2xl font-semibold mb-4">Register</h2>
<form onSubmit={submit} className="flex flex-col gap-2">
<input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
<input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
<input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
<div className="flex gap-2 items-center">
<label className="text-sm">Role:</label>
<select value={role} onChange={e => setRole(e.target.value as 'sender'|'receiver')} className="input">
<option value="sender">Sender</option>
<option value="receiver">Receiver</option>
</select>
</div>
<button className="btn mt-2" disabled={isLoading}>{isLoading ? 'Creating...' : 'Register'}</button>
</form>
</div>
);
};
export default Register;