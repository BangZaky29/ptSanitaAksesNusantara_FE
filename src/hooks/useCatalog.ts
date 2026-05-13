import { useState, useEffect } from "react";
import type { ApiImage } from "../types/types";
import { fetchImages } from "../services/api";

// Global cache to prevent re-fetching and loading flickers
let cachedCatalog: ApiImage[] | null = null;

/**
 * Hook to fetch catalog images from the backend.
 * Returns { catalog, loading, error }.
 */
export function useCatalog() {
  const [catalog, setCatalog] = useState<ApiImage[]>(cachedCatalog || []);
  const [loading, setLoading] = useState(!cachedCatalog);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedCatalog) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchImages({ category: "catalog" })
      .then((data) => {
        if (!cancelled) {
          cachedCatalog = data;
          setCatalog(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to fetch catalog:", err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { catalog, loading, error };
}
