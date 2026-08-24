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

      const data = Array.isArray(response)
        ? response
        : response?.recommendations || response?.data || [];

      setRecommendations(data);
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

    const currentLocation = await requestLocation();

    if (currentLocation) {
      await fetchRecommendations(currentLocation);
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

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
          <Loading message="Finding parking spots near you..." />
        </CardContent>
      </Card>
    );
  }

  if (locationError) {
    return (
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    );
  }

  if (recommendationError) {
    return (
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    );
  }

  if (!location) {
    return (
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    );
  }

  return <ListingGrid listings={recommendations} />;
}