import { Link } from "react-router-dom";
function ListingCard({ listing }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img
          src={listing.photo}
          alt={listing.city}
          className="h-52 w-full object-cover"
        />

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow">
          {listing.type}
        </div>

        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800 shadow">
          ⭐ {listing.rating}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">
            {listing.city}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            📍 {listing.street}
          </p>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {listing.description}
        </p>

        <div className="mb-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>

            <p className="text-xl font-bold text-gray-900">
              Rs. {listing.price}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Capacity</p>

            <p className="font-semibold text-gray-800">
              {listing.numberOfVehicles} vehicles
            </p>
          </div>
        </div>

        <Link to={`/listings/${listing.id}`}
        className="block w-full rounded-xl bg-gray-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]">
        View Details
        </Link>
      </div>
    </div>
  );
}

export default ListingCard;