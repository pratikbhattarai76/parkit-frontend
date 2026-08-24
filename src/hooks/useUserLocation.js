import { useCallback, useState } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const message = "Geolocation is not supported by your browser.";

        setError(message);
        reject(new Error(message));
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setLocation(currentLocation);
          setIsLoading(false);

          resolve(currentLocation);
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
              message =
                "The location request timed out. Please try again.";
              break;

            default:
              break;
          }

          setError(message);
          setIsLoading(false);

          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    });
  }, []);

  return {
    location,
    isLoading,
    error,
    requestLocation,
  };
}