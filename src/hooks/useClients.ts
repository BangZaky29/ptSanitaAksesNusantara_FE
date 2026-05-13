import { useState, useEffect } from "react";
import type { ApiClient } from "../types/types";
import { fetchClients } from "../services/api";

// Global cache to prevent re-fetching and loading flickers
let cachedClients: ApiClient[] | null = null;

/**
 * Hook to fetch clients/partners from the backend.
 * Returns { clients, loading, error }.
 */
export function useClients() {
  const [clients, setClients] = useState<ApiClient[]>(cachedClients || []);
  const [loading, setLoading] = useState(!cachedClients);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedClients) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchClients()
      .then((data) => {
        if (!cancelled) {
          cachedClients = data;
          setClients(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to fetch clients:", err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { clients, loading, error };
}
