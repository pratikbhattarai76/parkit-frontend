import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function AdminListings() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Listings
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create, edit and manage parking listings.
          </p>
        </div>

        <Link to="/admin/listings/create">
          <Button size="lg">
            <Plus />
            Create Parking
          </Button>
        </Link>
        <Link to="/admin/listings/:id/edit">
          <Button size="lg">
            <Plus />
           Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AdminListings;