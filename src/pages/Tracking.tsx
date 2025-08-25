import React, { useState } from 'react';
import { useTrackParcelQuery } from '../store/slices/api';
import Skeleton from '../components/ui/Skeleton';


const Tracking: React.FC = () => {
const [trackId, setTrackId] = useState('');
const [searchId, setSearchId] = useState('');
const { data: parcel, isFetching, isError, error } = useTrackParcelQuery(
{ trackingId: searchId },
{ skip: !searchId }
);


const handleSearch = (e: React.FormEvent) => {
e.preventDefault();
setSearchId(trackId.trim());
};


return (
<div>
<h2 className="text-2xl mb-4">Track Parcel</h2>
<form onSubmit={handleSearch} className="flex gap-2 mb-4">
<input className="input" placeholder="Tracking ID" value={trackId} onChange={e => setTrackId(e.target.value)} />
<button className="btn">Search</button>
</form>


{isFetching && <Skeleton className="h-40" />}


{isError && <div className="text-red-500">{(error as any)?.data?.message || 'Error fetching parcel'}</div>}


{parcel && (
<div className="bg-white p-4 rounded shadow">
<h3 className="font-semibold">{parcel.trackingId}</h3>
<p>Status: {parcel.status}</p>
<div className="mt-3">
<h4 className="font-medium">Status History</h4>
<ul className="mt-2">
{parcel.statusLogs?.map((s: any, i: number) => (
<li key={i} className="text-sm">{new Date(s.timestamp).toLocaleString()} - {s.status} - {s.note || ''}</li>
))}
</ul>
</div>
</div>
)}
</div>
);
};


export default Tracking;