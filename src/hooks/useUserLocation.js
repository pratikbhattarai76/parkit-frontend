import { useCallback, useState } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (locationError) => {
        let message = "Unable to retrieve your location.";

        switch (locationError.code) {
          case locationError.PERMISSION_DENIED:
            message =
              "Location permission was denied. Please allow location access to get recommendations.";
            break;

          case locationError.POSITION_UNAVAILABLE:
            message = "Your current location could not be determined.";
            break;

          case locationError.TIMEOUT:
            message = "The location request timed out. Please try again.";
            break;

          default:
            break;
        }

        setError(message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  return {
    location,
    isLoading,
    error,
    requestLocation,
  };
}