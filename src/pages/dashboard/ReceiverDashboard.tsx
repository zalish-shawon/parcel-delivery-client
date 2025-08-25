import React, { useState, useMemo } from "react";
import {
  useGetIncomingParcelsQuery,
  useUpdateParcelStatusMutation,
} from "../../store/slices/api";
import { toast } from "react-toastify";
import Pagination from "../../components/ui/Pagination";
import Skeleton from "../../components/ui/Skeleton";

const ReceiverDashboard: React.FC = () => {
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useGetIncomingParcelsQuery();
  const [updateStatus] = useUpdateParcelStatusMutation();

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const total = parcels.length;
  const pageData = parcels.slice((page - 1) * pageSize, page * pageSize);

  const confirmDelivery = async (id: string) => {
    try {
      await updateStatus({
        id,
        status: "Delivered",
        note: "Confirmed by receiver",
      }).unwrap();
      toast.success("Marked delivered");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Receiver Dashboard</h2>
      {isLoading ? (
        <Skeleton className="h-40" />
      ) : (
        <div>
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
                <div>
                  {p.status !== "Delivered" && (
                    <button
                      onClick={() => confirmDelivery(p._id)}
                      className="btn btn-primary"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Pagination
              current={page}
              total={total}
              pageSize={pageSize}
              onChange={setPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ReceiverDashboard;
