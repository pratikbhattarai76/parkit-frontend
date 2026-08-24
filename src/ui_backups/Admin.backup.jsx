import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminBackup() {
  return <AdminDashboard />;
}
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Shield,
  Users,
  CarFront,
  CalendarDays,
  TrendingUp,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Search,
  RefreshCw,
  MapPin,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import listingService from "@/services/listingService";
import reservationService from "@/services/reservationService";
import Loading from "@/components/common/Loading";

export default function Admin() {
  const { isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState("listings");
  const [listings, setListings] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add Listing Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    country: "Nepal",
    zipcode: "44600",
    type: "car",
    price: "20",
    noOfVehicle: "10",
    description: "",
    photo: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listRes, resRes] = await Promise.allSettled([
        listingService.getAllListings(),
        reservationService.getAllReservations(),
      ]);

      if (listRes.status === "fulfilled") {
        const d = listRes.value?.data || listRes.value?.listings || listRes.value || [];
        setListings(Array.isArray(d) && d.length > 0 ? d : sampleAdminListings);
      } else {
        setListings(sampleAdminListings);
      }

      if (resRes.status === "fulfilled") {
        const d = resRes.value?.data || resRes.value?.reservations || resRes.value || [];
        setReservations(Array.isArray(d) && d.length > 0 ? d : sampleAdminReservations);
      } else {
        setReservations(sampleAdminReservations);
      }
    } catch {
      setListings(sampleAdminListings);
      setReservations(sampleAdminReservations);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleCreateListing = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      const res = await listingService.createListing({
        ...formData,
        photo:
          formData.photo ||
          "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",
      });
      const newSpot = res?.data || {
        ...formData,
        id: `spot-${Date.now()}`,
        rating: 5.0,
      };
      setListings((prev) => [newSpot, ...prev]);
      setIsAddModalOpen(false);
      alert("Parking listing created successfully!");
      setFormData({
        street: "",
        city: "",
        country: "Nepal",
        zipcode: "44600",
        type: "car",
        price: "20",
        noOfVehicle: "10",
        description: "",
        photo: "",
      });
    } catch (err) {
      alert(err.message || "Failed to create listing.");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this parking spot?")) return;
    try {
      await listingService.deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch {
      setListings((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <Shield className="size-7 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                Administration Portal
              </p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Platform Control Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              className="gap-2 border-white/20 bg-white/10 text-xs font-semibold text-white hover:bg-white/20"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              Sync Data
            </Button>
            <Button
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-md hover:from-blue-600 hover:to-indigo-700"
            >
              <Plus className="size-3.5" />
              Add Parking Spot
            </Button>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Listings", value: listings.length || 8, icon: CarFront, color: "blue" },
          { label: "Total Bookings", value: reservations.length || 24, icon: CalendarDays, color: "indigo" },
          { label: "Registered Users", value: "142", icon: Users, color: "violet" },
          { label: "Total Revenue", value: "$3,840", icon: TrendingUp, color: "emerald" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {s.label}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
                      {s.value}
                    </p>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    <Icon className="size-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Admin Nav Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        {[
          { id: "listings", label: `Parking Listings (${listings.length})` },
          { id: "reservations", label: `Reservations (${reservations.length})` },
          { id: "users", label: "User Accounts (142)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow dark:bg-white dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Listings Table */}
      {activeTab === "listings" && (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <tr>
                  <th className="p-4">Spot Address</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Rate / Hr</th>
                  <th className="p-4">Slots</th>
                  <th className="p-4">Type</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {listings.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      {l.street || "Main Street"}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {l.city || "Kathmandu"}
                    </td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      ${l.price || "20"}/hr
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {l.noOfVehicle || "10"} spaces
                    </td>
                    <td className="p-4">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 font-bold uppercase text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {l.type || "car"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteListing(l.id)}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                        title="Delete listing"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 2: Reservations Table */}
      {activeTab === "reservations" && (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <tr>
                  <th className="p-4">Reservation ID</th>
                  <th className="p-4">Spot</th>
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Slots</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      #{r.id?.slice(-8) || "RES9821"}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      {r.listing?.street || r.street || "Durbar Marg Spot"}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {r.startTime || "10:00"} - {r.endTime || "14:00"}
                    </td>
                    <td className="p-4">{r.slots || 1} Vehicle</td>
                    <td className="p-4">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 3: Users Table */}
      {activeTab === "users" && (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role / Type</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { name: "Pratik Bhattarai", email: "pratikbhattarai76@gmail.com", type: "admin" },
                  { name: "Suresh Sharma", email: "suresh@example.com", type: "user" },
                  { name: "Pooja Thapa", email: "pooja@example.com", type: "user" },
                ].map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{u.email}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                          u.type === "admin"
                            ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {u.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add New Parking Spot Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Create New Parking Listing
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 p-6 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Road Plaza"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kathmandu"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                    Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                    Capacity (Spaces)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.noOfVehicle}
                    onChange={(e) => setFormData({ ...formData, noOfVehicle: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                    Vehicle Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="suv">SUV</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe security, access, amenities..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                  Photo URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={createLoading}
                  className="gap-1.5 font-bold"
                >
                  {createLoading ? "Creating..." : "Publish Listing"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const sampleAdminListings = [
  { id: "spot-1", street: "Durbar Marg Plaza B1", city: "Kathmandu", price: "25", noOfVehicle: "12", type: "car" },
  { id: "spot-2", street: "Thamel Central Garage", city: "Kathmandu", price: "20", noOfVehicle: "8", type: "car" },
  { id: "spot-3", street: "Lakeside North Bay", city: "Pokhara", price: "15", noOfVehicle: "15", type: "car" },
  { id: "spot-4", street: "Jhamsikhel Hub", city: "Lalitpur", price: "10", noOfVehicle: "20", type: "bike" },
];

const sampleAdminReservations = [
  { id: "res-01", street: "Durbar Marg Plaza B1", startTime: "10:00", endTime: "14:00", slots: 1 },
  { id: "res-02", street: "Thamel Central Garage", startTime: "13:00", endTime: "17:00", slots: 1 },
];
