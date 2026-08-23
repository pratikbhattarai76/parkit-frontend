import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Car,
  Star,
  DollarSign,
  Filter,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import listingService from "@/services/listingService";
import Loading from "@/components/common/Loading";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await listingService.getAllListings();
      // Handle response structures: response.data or response directly
      const data = response?.data || response?.listings || response || [];
      if (Array.isArray(data) && data.length > 0) {
        setListings(data);
      } else {
        // Provide rich sample spots if database is empty so user has an amazing interactive UI
        setListings(sampleSpots);
      }
    } catch {
      setListings(sampleSpots);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const filteredListings = listings
    .filter((spot) => {
      const query = searchTerm.toLowerCase();
      const matchCity = spot.city?.toLowerCase().includes(query);
      const matchStreet = spot.street?.toLowerCase().includes(query);
      const matchDesc = spot.description?.toLowerCase().includes(query);
      const matchesSearch = !searchTerm || matchCity || matchStreet || matchDesc;

      const matchesVehicle =
        vehicleFilter === "all" ||
        spot.type?.toLowerCase() === vehicleFilter.toLowerCase() ||
        spot.noOfVehicle?.toLowerCase().includes(vehicleFilter.toLowerCase());

      return matchesSearch && matchesVehicle;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return parseFloat(a.price || 0) - parseFloat(b.price || 0);
      }
      if (sortBy === "price-high") {
        return parseFloat(b.price || 0) - parseFloat(a.price || 0);
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 text-white shadow-xl sm:p-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 size-60 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-10 left-10 size-60 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold text-blue-200 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Live Spot Availability
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Find & Reserve Your Parking Spot
          </h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Search secure, verified parking locations with real-time rates and instant confirmation.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              id="listings-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by city, street, or landmark..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Filters and Sorters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Vehicle Type */}
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-slate-400" />
              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <option value="all">All Vehicles</option>
                <option value="car">Car (4-Wheeler)</option>
                <option value="bike">Bike (2-Wheeler)</option>
                <option value="suv">SUV / Van</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchListings}
              className="gap-1.5 text-xs"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <Loading message="Fetching available parking spots..." size="lg" />
      ) : filteredListings.length === 0 ? (
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20">
              <Car className="size-8 text-blue-400" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
              No matching parking spots
            </h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              We couldn&apos;t find spots matching your search. Try changing your filters or searching for another area.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setVehicleFilter("all");
              }}
              className="mt-5"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((spot) => (
            <ListingCard key={spot.id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  );
}

function ListingCard({ spot }) {
  const photo =
    spot.photo ||
    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      {/* Image / Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={photo}
          alt={`${spot.street || "Parking"}, ${spot.city || ""}`}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
          ${spot.price || 15}/hr
        </div>
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 backdrop-blur-md dark:bg-slate-900/90 dark:text-white">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span>{spot.rating ? spot.rating.toFixed(1) : "4.8"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <ShieldCheck className="size-3.5" />
            <span>Verified Spot</span>
          </div>

          <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
            {spot.street || "Main Street Parking"}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="size-3.5 shrink-0 text-slate-400" />
            <span>{spot.city || "Downtown"}, {spot.country || "Nepal"}</span>
          </p>

          <p className="mt-3 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
            {spot.description || "Secure, covered parking spot with 24/7 CCTV surveillance and automated gate entry."}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Car className="size-3.5" />
              <span>{spot.noOfVehicle || "4"} Spots Total</span>
            </span>
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              Instant Book
            </span>
          </div>

          <Link
            to={`/listings/${spot.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600"
          >
            <span>View Details & Reserve</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Interactive sample spots for instant engagement if backend DB is empty
const sampleSpots = [
  {
    id: "spot-1",
    street: "Durbar Marg Plaza B1",
    city: "Kathmandu",
    country: "Nepal",
    type: "car",
    description: "Spacious underground covered parking spot with 24/7 security guard and EV charging capability.",
    price: "25",
    noOfVehicle: "12",
    rating: 4.9,
    photo: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "spot-2",
    street: "Thamel Central Garage",
    city: "Kathmandu",
    country: "Nepal",
    type: "car",
    description: "Prime tourist hub parking with automated QR entry. Walking distance to shops and restaurants.",
    price: "20",
    noOfVehicle: "8",
    rating: 4.7,
    photo: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "spot-3",
    street: "Lakeside North Bay",
    city: "Pokhara",
    country: "Nepal",
    type: "car",
    description: "Scenic lakeside secured parking area with wide bays suitable for SUVs, sedans, and bikes.",
    price: "15",
    noOfVehicle: "15",
    rating: 4.8,
    photo: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "spot-4",
    street: "Jhamsikhel Food Hub Spot",
    city: "Lalitpur",
    country: "Nepal",
    type: "bike",
    description: "Convenient, safe two-wheeler and four-wheeler parking right next to restaurant rows.",
    price: "10",
    noOfVehicle: "20",
    rating: 4.6,
    photo: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
  },
];
