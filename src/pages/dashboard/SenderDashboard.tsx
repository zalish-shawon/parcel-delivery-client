import React, { useState, useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import {
  useGetMyParcelsQuery,
  useCreateParcelMutation,
  useCancelParcelMutation,
} from "../../store/slices/api";
import { toast } from "react-toastify";
import Skeleton from "../../components/ui/Skeleton";
import Pagination from "../../components/ui/Pagination";
import { z } from "zod";

const parcelSchema = z.object({
  receiverId: z.string().min(1),
  weight: z.number().positive(),
  address: z.string().min(3),
});

const SenderDashboard: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const { data: parcels = [], isLoading, refetch } = useGetMyParcelsQuery();
  const [createParcel, { isLoading: creating }] = useCreateParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();

  const [receiverId, setReceiverId] = useState("");
  const [weight, setWeight] = useState<number>(1);
  const [address, setAddress] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => parcels, [parcels]);
  const total = filtered.length;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = parcelSchema.parse({ receiverId, weight, address });
      await createParcel(parsed).unwrap();
      toast.success("✅ Parcel created");
      setReceiverId("");
      setWeight(1);
      setAddress("");
      refetch();
    } catch (err: any) {
      const msg = err?.data?.message || (err?.message ?? "Create error");
      toast.error(msg);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel({ id }).unwrap();
      toast.success("❌ Parcel cancelled");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Cancel error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📦 Sender Dashboard
      </h2>

      {/* Create Parcel Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          ➕ Create Parcel
        </h3>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={handleCreate}
        >
          <input
            className="input border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
          <input
            className="input border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            type="number"
            step="0.1"
            min={0.1}
            value={String(weight)}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <input
            className="input border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="md:col-span-3 flex justify-end">
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={creating}
            >
              {creating ? "Creating..." : "Create Parcel"}
            </button>
          </div>
        </form>
      </div>

      {/* My Parcels Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          📑 My Parcels
        </h3>
        {isLoading ? (
          <Skeleton className="h-40" />
        ) : parcels.length === 0 ? (
          <div className="text-center text-gray-500 bg-gray-50 p-6 rounded-xl shadow">
            No parcels found 🚫
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pageData.map((p: any) => (
              <div
                key={p._id}
                className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition flex justify-between items-center border border-gray-100"
              >
                <div>
                  <div className="font-semibold text-gray-800">
                    {p.trackingId}
                  </div>
                  <div className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        p.status === "Requested"
                          ? "text-yellow-600"
                          : p.status === "Delivered"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.status === "Requested" && (
                    <button
                      onClick={() => handleCancel(p._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            current={page}
            total={total}
            pageSize={pageSize}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};
export default SenderDashboard;
