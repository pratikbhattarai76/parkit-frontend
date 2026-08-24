import { useParams } from "react-router-dom";
import mockListings from "../data/mockListings";

function ListingDetails() {
  const { id } = useParams();

  const listing = mockListings.find(
    (item) => item.id === Number(id)
  );

  if (!listing) {
    return <div>Listing not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow">
        <img
          src={listing.photo}
          alt={listing.city}
          className="h-96 w-full object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {listing.city}
          </h1>

          <p className="mt-2 text-gray-500">
            📍 {listing.street}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-semibold">{listing.type}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold">Rs. {listing.price}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="font-semibold">⭐ {listing.rating}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">Capacity</p>
            <p className="font-semibold">
              {listing.numberOfVehicles} vehicles
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">Description</p>
            <p className="mt-2 leading-7 text-gray-700">
              {listing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;