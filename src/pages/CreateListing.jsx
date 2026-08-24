import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import ListingForm from "@/components/listings/ListingForm";
import listingService from "@/services/listingService";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function CreateListing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(formData, photo, paymentQr) {
    setSubmitting(true);
    setError("");

    try {
      if (!photo) {
        throw new Error("Parking photo is required.");
      }

      if (!paymentQr) {
        throw new Error("Payment QR is required.");
      }

      const ownerId = user?.id || user?._id;

      if (!ownerId) {
        throw new Error("Unable to determine logged-in user ID.");
      }

      const data = new FormData();

      data.append("city", formData.city);
      data.append("street", formData.street);
      data.append("type", formData.type);
      data.append("description", formData.description);

      data.append("rating", String(Number(formData.rating)));
      data.append("price", String(Number(formData.price)));
      data.append(
        "noOfVehicle",
        String(Number(formData.noOfVehicle))
      );

      data.append("ownerId", ownerId);

      data.append("lat", formData.lat);
      data.append("long", formData.long);

      data.append("photo", photo);
      data.append("paymentQr", paymentQr);

      const response =
        await listingService.createListing(data);

      console.log("Listing created:", response);

      navigate("/admin/listings");
    } catch (error) {
      console.error("Create listing error:", error);
      console.error("Status:", error.status);
      console.error("Data:", error.data);

      setError(
        error?.data?.message ||
        error?.message ||
        "Failed to create listing."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
  <div className="mx-auto max-w-4xl space-y-6">

    {/* Back */}
    <Button
      type="button"
      variant="ghost"
      onClick={() => navigate("/admin/listings")}
      className="group -ml-2 gap-2 text-muted-foreground hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
      Back to Listings
    </Button>

    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Create Parking
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Add a new parking space to Parkit.
      </p>
    </div>

    {error && (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    )}

    <ListingForm
      onSubmit={handleCreate}
      submitText={submitting ? "Creating..." : "Create Parking"}
    />
  </div>
);
}

export default CreateListing;