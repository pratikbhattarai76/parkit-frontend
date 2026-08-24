import { Link } from "react-router-dom";
import {
  CirclePlus,
  Car,
  MapPin,
  Pencil,
  Trash2,
  ParkingCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function AdminListings() {
  // Temporary until connected to listingService
  const listings = [];

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <ParkingCircle className="size-3.5" />
            Parking Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Manage Listings
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create, edit and manage parking spaces available on Parkit.
          </p>
        </div>

        <Link to="/admin/listings/create">
          <Button size="lg">
            <CirclePlus className="size-5" />
            Create Parking
          </Button>
        </Link>
      </div>

      {/* Listings */}
      {listings.length > 0 ? (
        <div className="space-y-4">
          {listings.map((listing) => (
            <Card
              key={listing._id || listing.id}
              className="overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">

                  {/* Parking Image */}
                  <div className="flex h-52 w-full shrink-0 items-center justify-center overflow-hidden bg-slate-100 sm:h-auto sm:w-52 dark:bg-slate-800">
                    {listing.photo ? (
                      <img
                        src={listing.photo}
                        alt={`${listing.city} parking`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Car className="size-10 text-slate-400" />
                    )}
                  </div>

                  {/* Listing Information */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-5">

                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                            {listing.city} Parking
                          </h2>

                          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="size-4" />

                            <span>
                              {listing.street}, {listing.city}
                            </span>
                          </div>
                        </div>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                          {listing.type}
                        </span>
                      </div>

                      {listing.description && (
                        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {listing.description}
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap gap-8">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Price
                          </p>

                          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                            Rs. {listing.price}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Capacity
                          </p>

                          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                            {listing.noOfVehicle} vehicles
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Rating
                          </p>

                          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                            {listing.rating || "0"} / 5
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                      <Link
                        to={`/admin/listings/${
                          listing._id || listing.id
                        }/edit`}
                      >
                        <Button variant="outline">
                          <Pencil className="size-4" />
                          Edit
                        </Button>
                      </Link>

                      <Button variant="destructive">
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (

        /* No Listings */
        <Card className="border-dashed">
          <CardHeader className="items-center py-14 text-center">
            <CardTitle className="text-xl">
              No parking listings yet
            </CardTitle>

            <CardDescription>
              Create your first parking listing to get started.
            </CardDescription>

            <Link to="/admin/listings/create" className="mt-4">
              <Button>
                <CirclePlus className="size-5" />
                Create First Parking
              </Button>
            </Link>

          </CardHeader>
        </Card>
      )}
    </div>
  );
}

export default AdminListings;