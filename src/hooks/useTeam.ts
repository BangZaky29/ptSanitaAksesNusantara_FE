import { useState, useEffect } from "react";
import type { ApiTeamMember } from "../types/types";
import { TEAM_DATA } from "../constants/data";

/**
 * Hook to return team members.
 * Now using hardcoded data from constants/data.ts as requested.
 */
export function useTeam() {
  const [members, setMembers] = useState<ApiTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API Fetch delay
    const timer = setTimeout(() => {
      setMembers(TEAM_DATA);
      setLoading(false);
    }, 1200); // 1.2s for "premium" feel loading

    return () => clearTimeout(timer);
  }, []);

  return { members, loading, error };
}
