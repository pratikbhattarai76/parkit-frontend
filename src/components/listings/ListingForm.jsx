import { useState } from "react";
import {
  MapPin,
  Car,
  DollarSign,
  FileText,
  Navigation,
  Building2,
  Image,
  Upload,
  QrCode,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function ListingForm({
  initialData = {},
  onSubmit,
  submitText = "Create Parking",
}) {
  const [formData, setFormData] = useState({
    city: initialData.city || "",
    street: initialData.street || "",
    type: initialData.type || "",
    description: initialData.description || "",
    rating: initialData.rating || "",
    price: initialData.price || "",
    noOfVehicle: initialData.noOfVehicle || "",
    lat: initialData.lat || "",
    long: initialData.long || "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    initialData.photo || null
  );

  const [paymentQr, setPaymentQr] = useState(null);
  const [qrPreview, setQrPreview] = useState(
    initialData.paymentQr || null
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function handleQrChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setPaymentQr(file);
    setQrPreview(URL.createObjectURL(file));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(formData, photo, paymentQr);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <MapPin className="size-5" />
            </div>

            <div>
              <CardTitle>Location Information</CardTitle>
              <CardDescription>
                Enter the parking location.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <FormField label="City">
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Kathmandu"
              className="h-10"
              required
            />
          </FormField>

          <FormField label="Street">
            <Input
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="e.g. Thamel"
              className="h-10"
              required
            />
          </FormField>
        </CardContent>
      </Card>

      {/* Parking details */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
              <Car className="size-5" />
            </div>

            <div>
              <CardTitle>Parking Details</CardTitle>
              <CardDescription>
                Add the main parking information.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FormField label="Parking Type">
              <Input
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Parking"
                className="h-10"
                required
              />
            </FormField>

            <FormField label="Rating">
              <div className="relative">
                <Star className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="0 - 5"
                  className="h-10 pl-9"
                  required
                />
              </div>
            </FormField>

            <FormField label="Price">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="h-10 pl-9"
                  required
                />
              </div>
            </FormField>

            <FormField label="Vehicle Capacity">
              <div className="relative">
                <Car className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  name="noOfVehicle"
                  type="number"
                  min="1"
                  value={formData.noOfVehicle}
                  onChange={handleChange}
                  placeholder="Vehicles"
                  className="h-10 pl-9"
                  required
                />
              </div>
            </FormField>
          </div>

          <FormField label="Description">
            <div className="relative">
              <FileText className="absolute left-3 top-3 size-4 text-muted-foreground" />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the parking space..."
                className="min-h-32 w-full resize-none rounded-xl border border-input bg-transparent py-3 pl-10 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                required
              />
            </div>
          </FormField>
        </CardContent>
      </Card>

      {/* Coordinates */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400">
              <Navigation className="size-5" />
            </div>

            <div>
              <CardTitle>Map Location</CardTitle>
              <CardDescription>
                Add latitude and longitude.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <FormField label="Latitude">
            <Input
              name="lat"
              type="number"
              step="any"
              value={formData.lat}
              onChange={handleChange}
              placeholder="27.7172"
              className="h-10"
              required
            />
          </FormField>

          <FormField label="Longitude">
            <Input
              name="long"
              type="number"
              step="any"
              value={formData.long}
              onChange={handleChange}
              placeholder="85.3240"
              className="h-10"
              required
            />
          </FormField>
        </CardContent>
      </Card>

      {/* Parking photo */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              <Image className="size-5" />
            </div>

            <div>
              <CardTitle>Parking Photo</CardTitle>
              <CardDescription>
                  Add a clear photo so drivers can easily recognize the parking space.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:border-blue-400 dark:border-slate-700">
            {photoPreview ? (
              <>
                <img
                  src={photoPreview}
                  alt="Parking preview"
                  className="h-64 w-full max-w-2xl rounded-xl object-cover"
                />

                <p className="mt-4 text-sm font-semibold text-blue-600">
                  Click to change photo
                </p>
              </>
            ) : (
              <>
                <Upload className="mb-3 size-7 text-blue-600" />

                <p className="font-semibold">
                  Upload parking photo
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handlePhotoChange}
              className="hidden"
              required={!initialData.photo}
            />
          </label>
        </CardContent>
      </Card>

      {/* Payment QR */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
              <QrCode className="size-5" />
            </div>

            <div>
              <CardTitle>Payment QR</CardTitle>
              <CardDescription>
                Upload the QR code drivers can use to complete their payment.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:border-emerald-400 dark:border-slate-700">
            {qrPreview ? (
              <>
                <img
                  src={qrPreview}
                  alt="Payment QR preview"
                  className="size-52 rounded-xl object-contain"
                />

                <p className="mt-4 text-sm font-semibold text-emerald-600">
                  Click to change QR
                </p>
              </>
            ) : (
              <>
                <QrCode className="mb-3 size-7 text-emerald-600" />

                <p className="font-semibold">
                  Upload payment QR
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleQrChange}
              className="hidden"
              required={!initialData.paymentQr}
            />
          </label>
        </CardContent>
      </Card>

      {/* Submit */}
        <div className="flex justify-end pt-2">
        <Button type="submit" size="lg"
            className="group min-w-44 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95">
            <CirclePlus className="size-5 transition-transform duration-200 group-hover:rotate-90" />
            {submitText}
        </Button>
        </div>
    </form>
  );
}

function FormField({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>

      {children}
    </div>
  );
}

export default ListingForm;