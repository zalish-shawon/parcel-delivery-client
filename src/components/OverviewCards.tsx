import React, { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#4ade80", "#60a5fa", "#f97316", "#f87171"];

const OverviewCards: React.FC<{ parcels: any[] }> = ({ parcels }) => {
  const totals = useMemo(() => {
    const total = parcels.length;
    const delivered = parcels.filter((p) => p.status === "Delivered").length;
    const inTransit = parcels.filter(
      (p) => p.status === "In Transit" || p.status === "Dispatched"
    ).length;
    const cancelled = parcels.filter((p) => p.status === "Cancelled").length;
    return { total, delivered, inTransit, cancelled };
  }, [parcels]);

  const pieData = [
    { name: "Delivered", value: totals.delivered },
    { name: "In Transit", value: totals.inTransit },
    { name: "Cancelled", value: totals.cancelled },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Total Parcels</div>
        <div className="text-2xl font-bold">{totals.total}</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Delivered</div>
        <div className="text-2xl font-bold">{totals.delivered}</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">In Transit</div>
        <div className="text-2xl font-bold">{totals.inTransit}</div>
      </div>
      <div className="bg-white p-4 rounded shadow flex items-center">
        <PieChart width={120} height={80}>
          <Pie
            data={pieData}
            dataKey="value"
            innerRadius={20}
            outerRadius={40}
            paddingAngle={2}
          >
            {pieData.map((entry, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default OverviewCards;
