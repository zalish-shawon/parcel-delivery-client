import React from 'react';
import { Link } from 'react-router-dom';


const Home: React.FC = () => (
<div className="py-8">
<h1 className="text-3xl font-bold mb-4">Parcel Delivery Service</h1>
<p className="mb-6">Fast, reliable parcel delivery for businesses and individuals.</p>
<div className="flex gap-3">
<Link to="/register" className="btn">Get Started</Link>
<Link to="/tracking" className="btn btn-secondary">Track Parcel</Link>
</div>
</div>
);


export default Home;