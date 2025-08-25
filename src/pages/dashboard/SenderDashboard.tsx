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
      toast.success("Parcel created");
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
      toast.success("Parcel cancelled");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Cancel error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Sender Dashboard</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Create Parcel</h3>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-2"
          onSubmit={handleCreate}
        >
          <input
            className="input"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
          <input
            className="input"
            type="number"
            step="0.1"
            min={0.1}
            value={String(weight)}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <input
            className="input"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="md:col-span-3">
            <button className="btn" disabled={creating}>
              {creating ? "Creating..." : "Create Parcel"}
            </button>
          </div>
        </form>
      </div>

      <div>
        <h3 className="font-semibold mb-2">My Parcels</h3>
        {isLoading ? (
          <Skeleton className="h-40" />
        ) : (
          <div className="space-y-2">
            {pageData.map((p: any) => (
              <div
                key={p._id}
                className="p-3 bg-white rounded shadow flex justify-between"
              >
                <div>
                  <div className="font-semibold">{p.trackingId}</div>
                  <div className="text-sm">Status: {p.status}</div>
                </div>
                <div className="flex items-center gap-2">
                  {p.status === "Requested" && (
                    <button
                      onClick={() => handleCancel(p._id)}
                      className="btn btn-danger"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
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
