import React, { useState } from "react";
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
      toast.success("Marked as delivered");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📦 Receiver Dashboard
      </h2>

      {isLoading ? (
        <Skeleton className="h-40" />
      ) : parcels.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">
          No parcels yet 🚚
        </div>
      ) : (
        <div className="space-y-4">
          {pageData.map((p: any) => (
            <div
              key={p._id}
              className="p-4 bg-white rounded-lg shadow flex justify-between items-center hover:shadow-md transition-shadow"
            >
              {/* Parcel Info */}
              <div>
                <div className="font-semibold text-lg text-gray-800">
                  {p.trackingId}
                </div>
                <div
                  className={`text-sm mt-1 ${
                    p.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {p.status}
                </div>
              </div>

              {/* Action */}
              <div>
                {p.status !== "Delivered" ? (
                  <button
                    onClick={() => confirmDelivery(p._id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                  >
                    ✅ Confirm Delivery
                  </button>
                ) : (
                  <span className="text-green-600 font-medium">
                    ✔ Delivered
                  </span>
                )}
              </div>
            </div>
          ))}

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
      )}
    </div>
  );
};

export default ReceiverDashboard;
