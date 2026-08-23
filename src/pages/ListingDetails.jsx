import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Car,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Zap,
  Camera,
  Share2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import listingService from "@/services/listingService";
import reservationService from "@/services/reservationService";
import Loading from "@/components/common/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Booking Form State
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");
  const [slots, setSlots] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const res = await listingService.getListingById(id);
        const data = res?.data || res?.listing || res;
        if (data && (data.id || data.city)) {
          setSpot(data);
        } else {
          // Fallback sample data if spot not in db
          setSpot(getSampleSpot(id));
        }
      } catch {
        setSpot(getSampleSpot(id));
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/listings/${id}` } } });
      return;
    }

    setBookingLoading(true);
    setBookingError("");
    setBookingSuccess(false);

    try {
      await reservationService.createReservation({
        listingId: id,
        date: new Date(date),
        endDate: new Date(date),
        startTime,
        endTime,
        slots: parseInt(slots, 10) || 1,
      });

      setBookingSuccess(true);
      setTimeout(() => {
        navigate("/reservations");
      }, 2000);
    } catch (err) {
      setBookingError(err.message || "Failed to complete reservation. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading parking spot details..." size="lg" />;
  }

  if (!spot) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Parking Spot Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          The parking spot you are looking for does not exist or has been removed.
        </p>
        <Link to="/listings" className="mt-6 inline-block">
          <Button>Browse Available Spots</Button>
        </Link>
      </div>
    );
  }

  const pricePerHour = parseFloat(spot.price || 15);
  const startHour = parseInt(startTime.split(":")[0], 10) || 9;
  const endHour = parseInt(endTime.split(":")[0], 10) || 12;
  const totalHours = Math.max(1, endHour - startHour);
  const totalPrice = pricePerHour * totalHours * slots;

  return (
    <div className="space-y-8 pb-16">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to all listings
        </Link>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Share2 className="size-3.5" />
          Share Spot
        </button>
      </div>

      {/* Main Grid: Details (Left) + Booking Widget (Right) */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Gallery, Overview, Amenities */}
        <div className="space-y-6 lg:col-span-2">
          {/* Main Photo Card */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <img
              src={
                spot.photo ||
                "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80"
              }
              alt={spot.street}
              className="size-full object-cover"
            />
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <ShieldCheck className="size-4 text-blue-400" />
              <span>Verified & Secured</span>
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 backdrop-blur-md dark:bg-slate-900/90 dark:text-white">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span>{spot.rating || "4.9"} (24 reviews)</span>
            </div>
          </div>

          {/* Heading info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {spot.type?.toUpperCase() || "CAR / 4-WHEELER"}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {spot.noOfVehicle || 8} Total Spaces
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
              {spot.street || "Main Commercial Plaza Parking"}
            </h1>

            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="size-4 text-blue-500" />
              <span>
                {spot.street}, {spot.city || "Kathmandu"}, {spot.country || "Nepal"}
              </span>
            </p>
          </div>

          {/* Description */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                About this Parking Spot
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {spot.description ||
                  "This premium spot offers high security with round-the-clock CCTV surveillance, covered roofing against weather elements, wide maneuvering bays, and automated gate access. Ideal for both daily work commutes and weekend shopping."}
              </p>
            </CardContent>
          </Card>

          {/* Key Features & Amenities */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Included Features & Amenities
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "24/7 Security Guard" },
                  { icon: Camera, label: "CCTV Surveillance" },
                  { icon: Zap, label: "EV Charging Available" },
                  { icon: Car, label: "Covered Bay" },
                  { icon: CheckCircle2, label: "Instant QR Check-in" },
                  { icon: Star, label: "Disability Accessible" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300"
                  >
                    <item.icon className="size-4 text-blue-500" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Sticky Booking Widget */}
        <div>
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ${pricePerHour}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> / hour</span>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                Available Now
              </span>
            </div>

            {bookingSuccess && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-400">
                <CheckCircle2 className="mb-1 inline size-4 mr-1" />
                Spot reserved successfully! Redirecting...
              </div>
            )}

            {bookingError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
                <AlertCircle className="mb-1 inline size-4 mr-1" />
                {bookingError}
              </div>
            )}

            <form onSubmit={handleBook} className="mt-5 space-y-4">
              {/* Date */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Calendar className="size-3.5" />
                  Reservation Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Clock className="size-3.5" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Clock className="size-3.5" />
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Slots Count */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Number of Parking Slots
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={slots}
                  onChange={(e) => setSlots(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Rate per hour</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${pricePerHour}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{totalHours} hr(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Slots</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{slots}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 dark:border-slate-700 dark:text-white">
                  <span>Total Estimated</span>
                  <span className="text-base text-blue-600 dark:text-blue-400">${totalPrice}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={bookingLoading || bookingSuccess}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60"
              >
                {bookingLoading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing Reservation...
                  </>
                ) : user ? (
                  "Confirm & Reserve Spot"
                ) : (
                  "Log in to Reserve"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function getSampleSpot(id) {
  return {
    id: id || "spot-default",
    street: "Durbar Marg Executive Garage",
    city: "Kathmandu",
    country: "Nepal",
    type: "car",
    description:
      "Secure underground covered parking spot with 24/7 security guard, automated QR validation, and EV charging capability. Wide parking bays suitable for all passenger vehicles.",
    price: "25",
    noOfVehicle: "12",
    rating: 4.9,
    photo:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
  };
}
