import { useState, useEffect } from "react";
import type { ApiTeamMember } from "../types/types";
import { TEAM_DATA } from "../constants/data";

/**
 * Hook to return team members.
 * Now using hardcoded data from constants/data.ts as requested.
 */
export function useTeam() {
  const [members] = useState<ApiTeamMember[]>(TEAM_DATA);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return { members, loading, error };
}
