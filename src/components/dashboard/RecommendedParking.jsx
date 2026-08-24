import { useState } from "react";
import { MapPin, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import ListingGrid from "@/components/listings/ListingGrid";
import useUserLocation from "@/hooks/useUserLocation";
import recommendationService from "@/services/recommendationService";

export default function RecommendedParking() {
  const {
    location,
    isLoading: isLocationLoading,
    error: locationError,
    requestLocation,
  } = useUserLocation();

  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [recommendationError, setRecommendationError] = useState(null);

  const fetchRecommendations = async (currentLocation) => {
    if (!currentLocation) {
      return;
    }

    setIsLoadingRecommendations(true);
    setRecommendationError(null);

    try {
      const response = await recommendationService.getRecommendations({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      });

      console.log("Recommendation response:", response);

      const data = Array.isArray(response)
        ? response
        : response?.recommendations || response?.data || [];

      const validRecommendations = data.filter(
        (listing) => listing && listing.id
      );

      setRecommendations(validRecommendations);
    } catch (error) {
      setRecommendationError(
        error.message || "Unable to load parking recommendations."
      );
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleGetRecommendations = async () => {
    setRecommendationError(null);

    try {
      const currentLocation = await requestLocation();

      if (currentLocation) {
        await fetchRecommendations(currentLocation);
      }
    } catch {
      // Location errors are already handled by useUserLocation.
    }
  };

  const handleRetryRecommendations = async () => {
    if (location) {
      await fetchRecommendations(location);
      return;
    }

    await handleGetRecommendations();
  };

  const isLoading = isLocationLoading || isLoadingRecommendations;

  const renderContent = () => {
    if (isLoading) {
      return <Loading message="Finding parking spots near you..." />;
    }

    if (locationError) {
      return (
        <div className="py-2">
          <ErrorMessage
            title="Location unavailable"
            message={locationError}
          />

          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={handleGetRecommendations}
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </div>
      );
    }

    if (recommendationError) {
      return (
        <div className="py-2">
          <ErrorMessage
            title="Recommendations unavailable"
            message={recommendationError}
          />

          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={handleRetryRecommendations}
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </div>
      );
    }

    if (!location) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
            <MapPin className="size-6 text-blue-500" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-900 dark:text-white">
            Find parking near you
          </p>

          <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">
            Allow location access to discover parking spots recommended
            based on your current location.
          </p>

          <Button
            type="button"
            className="mt-5"
            onClick={handleGetRecommendations}
          >
            <MapPin className="mr-2 size-4" />
            Use My Location
          </Button>
        </div>
      );
    }

    if (recommendations.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
            <MapPin className="size-6 text-blue-400" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
            No recommendations found
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            We couldn't find suitable parking spots near your current
            location.
          </p>
        </div>
      );
    }

    return <ListingGrid listings={recommendations} />;
  };

  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <MapPin className="size-4 text-blue-500" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Recommended Near You
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Parking spots recommended based on your location.
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">{renderContent()}</CardContent>
    </Card>
  );
}