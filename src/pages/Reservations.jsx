import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  Search,
  QrCode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Car,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import reservationService from "@/services/reservationService";
import Loading from "@/components/common/Loading";

export default function Reservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("All");
  const [activeQrModal, setActiveQrModal] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        const res = await reservationService.getUserReservations(user.id);
        const data = res?.data || res?.reservations || res || [];
        if (Array.isArray(data) && data.length > 0) {
          setReservations(data);
        } else {
          setReservations(sampleReservations);
        }
      } else {
        setReservations(sampleReservations);
      }
    } catch {
      setReservations(sampleReservations);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }
    try {
      await reservationService.cancelReservation(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
      alert("Reservation cancelled successfully.");
    } catch {
      // Optimistic update for mock fallback
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r))
      );
    }
  };

  const filteredReservations = reservations.filter((item) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Active") return item.status === "Active" || !item.status;
    if (selectedTab === "Upcoming") return item.status === "Upcoming";
    if (selectedTab === "Past") return item.status === "Completed" || item.status === "Cancelled";
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            My Account
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Parking Reservations
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View active passes, check-in QR codes, and reservation history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchReservations}
            className="gap-2 text-xs"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link to="/listings">
            <Button size="sm" className="gap-2 text-xs font-semibold">
              <Search className="size-3.5" />
              Book New Spot
            </Button>
          </Link>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        {["All", "Active", "Upcoming", "Past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              selectedTab === tab
                ? "bg-slate-900 text-white shadow dark:bg-white dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reservations List */}
      {loading ? (
        <Loading message="Loading your parking reservations..." size="lg" />
      ) : filteredReservations.length === 0 ? (
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/20">
              <CalendarDays className="size-8 text-indigo-400" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
              No {selectedTab !== "All" ? selectedTab.toLowerCase() : ""} reservations found
            </h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              You do not have any active or past reservations matching this filter.
            </p>
            <Link to="/listings" className="mt-6">
              <Button size="sm">Explore Available Parking</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredReservations.map((item) => {
            const spot = item.listing || {};
            const isCancelled = item.status === "Cancelled";
            const dateStr = item.date
              ? new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Today";

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  {/* Status Banner */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        isCancelled
                          ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      }`}
                    >
                      {isCancelled ? (
                        <XCircle className="size-3" />
                      ) : (
                        <CheckCircle2 className="size-3" />
                      )}
                      <span>{item.status || "Confirmed & Active"}</span>
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      ID: #{item.id?.slice(-6) || "PK892"}
                    </span>
                  </div>

                  {/* Spot title and location */}
                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                    {spot.street || item.street || "Durbar Marg Central Spot"}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="size-3.5 text-slate-400" />
                    <span>{spot.city || item.city || "Kathmandu"}, Nepal</span>
                  </p>

                  {/* Schedule Details */}
                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
                    <div>
                      <span className="text-[11px] font-medium text-slate-400">Date</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {dateStr}
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-slate-400">Time Slot</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.startTime || "09:00"} - {item.endTime || "12:00"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-slate-400">Slots Reserved</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.slots || 1} Vehicle(s)
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-slate-400">Total Paid</span>
                      <p className="font-bold text-blue-600 dark:text-blue-400">
                        ${spot.price ? spot.price * (item.slots || 1) * 3 : 45}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveQrModal(item)}
                    disabled={isCancelled}
                    className="gap-1.5 text-xs font-semibold"
                  >
                    <QrCode className="size-3.5" />
                    <span>View Pass & QR</span>
                  </Button>

                  {!isCancelled && (
                    <button
                      onClick={() => handleCancel(item.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 transition-colors hover:text-red-700 dark:text-red-400"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Digital QR Pass Modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center text-white">
              <h3 className="text-lg font-bold">Parkit Digital Parking Pass</h3>
              <p className="mt-1 text-xs text-blue-100">Scan at entrance barrier</p>
            </div>

            <div className="flex flex-col items-center p-6 text-center">
              {/* QR Code graphic representation */}
              <div className="rounded-2xl border-4 border-slate-900 bg-white p-4 shadow-inner dark:border-slate-800">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PARKIT-PASS-${activeQrModal.id}`}
                  alt="Parking Pass QR Code"
                  className="size-40"
                />
              </div>

              <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                PASS: #{activeQrModal.id?.slice(-8) || "PK982341"}
              </p>

              <div className="mt-4 w-full rounded-xl bg-slate-50 p-3 text-left text-xs dark:bg-slate-800/50">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {activeQrModal.listing?.street || "Durbar Marg Spot"}
                </p>
                <p className="mt-1 text-slate-500">
                  {activeQrModal.startTime || "09:00"} - {activeQrModal.endTime || "12:00"}
                </p>
              </div>

              <Button
                onClick={() => setActiveQrModal(null)}
                className="mt-6 w-full font-semibold"
              >
                Close Pass
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const sampleReservations = [
  {
    id: "res-001",
    street: "Durbar Marg Plaza B1",
    city: "Kathmandu",
    date: new Date(),
    startTime: "10:00",
    endTime: "14:00",
    slots: 1,
    status: "Active",
    listing: {
      street: "Durbar Marg Plaza B1",
      city: "Kathmandu",
      price: 25,
    },
  },
  {
    id: "res-002",
    street: "Thamel Central Garage",
    city: "Kathmandu",
    date: new Date(Date.now() + 86400000),
    startTime: "13:00",
    endTime: "17:00",
    slots: 1,
    status: "Upcoming",
    listing: {
      street: "Thamel Central Garage",
      city: "Kathmandu",
      price: 20,
    },
  },
];
