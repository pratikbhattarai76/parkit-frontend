import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function Listings() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Parking Listings
          </h1>

          <p className="mt-2 text-muted-foreground">
            Find and manage available parking spaces.
          </p>
        </div>

        <Link to="/listings/create">
          <Button size="lg">
            <Plus />
            Create Parking
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Listings;