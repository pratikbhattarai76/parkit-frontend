import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ListingReviews from "@/components/reviews/ListingReviews";
import {
  MapPin,
  Clock,
  Video,
  ShieldCheck,
  Heart,
  Share2,
} from "lucide-react";

/**
 * ListingDetails Page (Parking Spot Details)
 * Integrates Intern 6 Listing Reviews module matching the reference screenshot.
 */
export default function ListingDetails() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const listingTitle = "Central City Mall Parking";
  const listingLocation = "New Road, Kathmandu, Nepal";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-5">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-slate-800 dark:hover:text-slate-200">
          Home
        </Link>
        <span>/</span>
        <Link to="/listings" className="hover:text-slate-800 dark:hover:text-slate-200">
          Listings
        </Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
          {listingTitle}
        </span>
      </nav>

      {/* Header: Title + Location + Actions */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {listingTitle}
          </h1>
          <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>{listingLocation}</span>
          </p>
        </div>

        {/* Favorite & Share Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            className="cursor-pointer rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            aria-label="Save to favorites"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite
                  ? "fill-rose-500 text-rose-500"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: listingTitle, url: window.location.href });
              } else {
                navigator.clipboard?.writeText(window.location.href);
                alert("Listing link copied to clipboard!");
              }
            }}
            className="cursor-pointer rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left = Details & Photos, Right = Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Photos & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Photo & 4 Thumbnails */}
          <div className="space-y-2">
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1000&auto=format&fit=crop&q=80"
                alt="Central City Mall Parking Garage"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 rounded-md bg-blue-600 text-white px-2.5 py-1 text-xs font-semibold shadow-xs">
                Available
              </span>
            </div>

            {/* 4 Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              <div className="h-16 sm:h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=300&auto=format&fit=crop&q=80"
                  alt="Angle 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-16 sm:h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=300&auto=format&fit=crop&q=80"
                  alt="Angle 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-16 sm:h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=300&auto=format&fit=crop&q=80"
                  alt="Angle 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-16 sm:h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80"
                  alt="Angle 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* About this parking */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              About this parking
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Secure and convenient parking space near Central City Mall. 24/7 access with CCTV surveillance and ample space for cars and bikes.
            </p>

            {/* Features Row */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>24/7 Access</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <Video className="h-4 w-4 text-blue-600" />
                <span>CCTV Surveillance</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>Secured Area</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>Near Main Road</span>
              </div>
            </div>
          </div>

          {/* Parking Details Table */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Parking Details
            </h2>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div className="py-2.5 flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Type</span>
                <span className="font-semibold text-slate-900 dark:text-white">Indoor</span>
              </div>
              <div className="py-2.5 flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Vehicle Type</span>
                <span className="font-semibold text-slate-900 dark:text-white">Car, Bike</span>
              </div>
              <div className="py-2.5 flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Price per Hour</span>
                <span className="font-semibold text-slate-900 dark:text-white">Rs. 50</span>
              </div>
              <div className="py-2.5 flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Price per Day</span>
                <span className="font-semibold text-slate-900 dark:text-white">Rs. 300</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reviews Module (5 cols) */}
        <div className="lg:col-span-5">
          <ListingReviews listingId={id || "64e0a7f1a1c9b2001e3b0001"} />
        </div>
      </div>
    </div>
  );
}

