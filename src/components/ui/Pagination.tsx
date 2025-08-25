import React from 'react';


const Pagination: React.FC<{ current:number; total:number; pageSize:number; onChange: (p:number)=>void }> = ({ current, total, pageSize, onChange }) => {
const totalPages = Math.max(1, Math.ceil(total / pageSize));
const pages = Array.from({length: totalPages}, (_,i)=>i+1);
return (
<div className="flex gap-2 items-center">
<button className="btn" onClick={()=>onChange(Math.max(1,current-1))} disabled={current===1}>Prev</button>
{pages.map(p=> (
<button key={p} onClick={()=>onChange(p)} className={`px-3 py-1 rounded ${p===current? 'bg-blue-600 text-white':'bg-white'}`}>{p}</button>
))}
<button className="btn" onClick={()=>onChange(Math.min(totalPages,current+1))} disabled={current===totalPages}>Next</button>
</div>
);
}
export default Pagination;