import { useState, useEffect } from "react";
import { fetchLogo } from "../services/api";

/**
 * Hook to fetch the transparent company logo URL from the backend.
 * Returns { logoUrl, loading, error }.
 */
export function useLogo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchLogo()
      .then((url) => {
        if (!cancelled) {
          setLogoUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to fetch logo:", err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { logoUrl, loading, error };
}
