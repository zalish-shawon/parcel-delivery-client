import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Contact: React.FC = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');


const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
toast.success('Message submitted (simulated).');
setName(''); setEmail(''); setMessage('');
};


return (
<div>
<h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
<form onSubmit={handleSubmit} className="max-w-md">
<input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
<input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
<textarea className="input" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
<button type="submit" className="btn mt-2">Send</button>
</form>
</div>
);
};
export default Contact;