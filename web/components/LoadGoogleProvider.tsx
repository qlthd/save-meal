"use client";

import { LoadScript, Libraries } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";

const GOOGLE_LIBRARIES: Libraries = ["places", "marker"];

const LoadGoogleProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setError("Google Maps API key is missing.");
    }
  }, []);

  const onLoad = () => setIsLoaded(true);
  const onError = () => setError("Failed to load Google Maps");

  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_LIBRARIES}
      onLoad={onLoad}
      onError={onError}
    >
      {isLoaded ? children : <p>Loading Google Maps...</p>}
      {error && <p>{error}</p>}
    </LoadScript>
  ) : (
    <p>{error}</p>
  );
};

export default LoadGoogleProvider;
