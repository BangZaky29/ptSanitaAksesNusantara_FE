import { useState, useEffect } from "react";
import type { ApiBusiness } from "../types/types";
import { fetchBusiness } from "../services/api";

// Global cache to prevent re-fetching and loading flickers
let cachedBusiness: ApiBusiness[] | null = null;

/**
 * Hook to fetch core business from the backend.
 */
export function useBusiness() {
  const [business, setBusiness] = useState<ApiBusiness[]>(cachedBusiness || []);
  const [loading, setLoading] = useState(!cachedBusiness);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedBusiness) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchBusiness()
      .then((data) => {
        if (!cancelled) {
          cachedBusiness = data;
          setBusiness(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { business, loading, error };
}
