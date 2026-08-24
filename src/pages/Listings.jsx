import mockListings from "../data/mockListings";
import ListingGrid from "../components/listings/ListingGrid";

function Listings() {
  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Parking Listings
          </h1>

          <p className="mt-2 text-gray-500">
            Find a convenient parking space near you.
          </p>
        </div>

        <ListingGrid listings={mockListings} />
      </div>
    </div>
  );
}

export default Listings;