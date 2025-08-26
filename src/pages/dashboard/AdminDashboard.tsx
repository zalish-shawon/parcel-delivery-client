import React, { useState } from "react";
import {
  useBlockUserMutation,
  useGetAllParcelsAdminQuery,
  useGetAllUsersQuery,
  useUnblockUserMutation,
  useUpdateParcelStatusMutation,
} from "../../store/slices/api";
import { toast } from "react-toastify";
import Pagination from "../../components/ui/Pagination";
import Skeleton from "../../components/ui/Skeleton";
import OverviewCards from "../../components/OverviewCards";

const AdminDashboard: React.FC = () => {
  const {
    data: parcels = [],
    isLoading: parcelsLoading,
    refetch: refetchParcels,
  } = useGetAllParcelsAdminQuery();

  const {
    data: users = [],
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetAllUsersQuery();

  const [updateStatus] = useUpdateParcelStatusMutation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const [page, setPage] = useState(1);
  const pageSize = 8;
  const total = parcels.length;
  const pageData = parcels.slice((page - 1) * pageSize, page * pageSize);

  const changeStatus = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated ✅");
      refetchParcels();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Error");
    }
  };

  const toggleBlock = async (id: string, block: boolean) => {
    try {
      if (block) await blockUser({ id }).unwrap();
      else await unblockUser({ id }).unwrap();
      toast.success(block ? "User blocked 🚫" : "User unblocked ✅");
      refetchUsers();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Error");
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-10">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
        📦 Admin Dashboard
      </h2>

      {/* Overview Cards */}
      <OverviewCards parcels={parcels} />

      {/* Parcels Section */}
      <section>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
          Parcels Management
        </h3>

        {parcelsLoading ? (
          <Skeleton className="h-40" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageData.map((p: any) => (
              <div
                key={p._id}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
              >
                {/* Parcel Info */}
                <div>
                  <p className="font-semibold text-gray-900">{p.trackingId}</p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span className="font-medium text-indigo-600">
                      {p.status}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => changeStatus(p._id, "Dispatched")}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 cursor-pointer"
                  >
                    Dispatch
                  </button>
                  <button
                    onClick={() => changeStatus(p._id, "In Transit")}
                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 cursor-pointer"
                  >
                    In Transit
                  </button>
                  <button
                    onClick={() => changeStatus(p._id, "Delivered")}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                  >
                    Delivered
                  </button>
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
      </section>

      {/* Users Section */}
      <section>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
          User Management
        </h3>

        {usersLoading ? (
          <Skeleton className="h-40" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((u: any) => (
              <div
                key={u._id}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
              >
                {/* User Info */}
                <div>
                  <p className="font-semibold text-gray-900">{u.name}</p>
                  <p className="text-sm text-gray-500">
                    {u.email} — <span className="capitalize">{u.role}</span>
                  </p>
                </div>

                {/* Block/Unblock Button */}
                <button
                  onClick={() => toggleBlock(u._id, !u.isBlocked)}
                  className={`px-3 py-1 text-sm rounded-lg transition cursor-pointer ${
                    u.isBlocked
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
