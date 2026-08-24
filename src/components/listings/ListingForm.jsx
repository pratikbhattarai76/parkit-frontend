import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ListingForm({
  initialData = {},
  onSubmit,
  submitText = "Create Parking",
}) {
  const [formData, setFormData] = useState({
    city: initialData.city || "",
    street: initialData.street || "",
    country: initialData.country || "",
    zipcode: initialData.zipcode || "",
    type: initialData.type || "",
    description: initialData.description || "",
    price: initialData.price || "",
    noOfVehicle: initialData.noOfVehicle || "",
    lat: initialData.lat || "",
    long: initialData.long || "",
    paymentQr: initialData.paymentQr || "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-card p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />

        <Input
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
        />

        <Input
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
        />

        <Input
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          placeholder="Zip Code"
        />

        <Input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Parking Type"
        />

        <Input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <Input
          name="noOfVehicle"
          type="number"
          value={formData.noOfVehicle}
          onChange={handleChange}
          placeholder="Number of Vehicles"
        />

        <Input
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          placeholder="Latitude"
        />

        <Input
          name="long"
          value={formData.long}
          onChange={handleChange}
          placeholder="Longitude"
        />

        <Input
          name="paymentQr"
          value={formData.paymentQr}
          onChange={handleChange}
          placeholder="Payment QR"
        />
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="min-h-32 w-full rounded-lg border border-input bg-transparent p-3 text-sm outline-none focus-visible:ring-2"
      />

      <Button type="submit" size="lg">
        {submitText}
      </Button>
    </form>
  );
}

export default ListingForm;