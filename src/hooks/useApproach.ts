import { useState, useEffect } from "react";
import type { ApiApproach } from "../types/types";
import { fetchApproach } from "../services/api";

// Global cache to prevent re-fetching and loading flickers
let cachedApproach: ApiApproach[] | null = null;

/**
 * Hook to fetch approach steps from the backend.
 */
export function useApproach() {
  const [steps, setSteps] = useState<ApiApproach[]>(cachedApproach || []);
  const [loading, setLoading] = useState(!cachedApproach);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedApproach) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchApproach()
      .then((data) => {
        if (!cancelled) {
          cachedApproach = data;
          setSteps(data);
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

  return { steps, loading, error };
}
