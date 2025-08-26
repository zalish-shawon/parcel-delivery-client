import React, { useState } from "react";
import { useTrackParcelQuery } from "../store/slices/api";
import Skeleton from "../components/ui/Skeleton";

const Tracking: React.FC = () => {
  const [trackId, setTrackId] = useState("");
  const [searchId, setSearchId] = useState("");
  const {
    data: parcel,
    isFetching,
    isError,
    error,
  } = useTrackParcelQuery({ trackingId: searchId }, { skip: !searchId });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchId(trackId.trim());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Track Your Parcel
      </h2>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Tracking ID"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {isFetching && <Skeleton className="h-40" />}

      {/* Error */}
      {isError && (
        <div className="text-red-500 text-center font-medium">
          {(error as any)?.data?.message || "Error fetching parcel"}
        </div>
      )}

      {/* Parcel details */}
      {parcel && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Tracking ID:{" "}
            <span className="text-blue-600">{parcel.trackingId}</span>
          </h3>
          <p className="text-gray-600">
            Current Status:{" "}
            <span className="font-medium text-green-600">{parcel.status}</span>
          </p>

          {/* History */}
          <div className="mt-5">
            <h4 className="text-lg font-semibold mb-2">Status History</h4>
            <ul className="space-y-2">
              {parcel.statusLogs?.map((s: any, i: number) => (
                <li
                  key={i}
                  className="p-3 border rounded-lg bg-gray-50 text-sm text-gray-700"
                >
                  <span className="block font-medium text-gray-900">
                    {new Date(s.timestamp).toLocaleString()}
                  </span>
                  <span className="block">
                    {s.status} {s.note && `- ${s.note}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;
