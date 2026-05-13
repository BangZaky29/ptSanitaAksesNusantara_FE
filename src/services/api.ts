import type { ApiResponse, ApiImage, ApiTeamMember, ApiClient, ApiBusiness, ApiApproach } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ============================
// Generic fetch helper
// ============================
async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json: ApiResponse<T> = await res.json();
  if (!json.success) {
    throw new Error(json.message || "Unknown API error");
  }
  return json.data;
}

// ============================
// Image endpoints
// ============================

/** Fetch images with optional filters */
export async function fetchImages(params?: {
  category?: string;
  type?: string;
}): Promise<ApiImage[]> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.type) searchParams.set("type", params.type);

  const query = searchParams.toString();
  return apiFetch<ApiImage[]>(`/api/images${query ? `?${query}` : ""}`);
}

/** Fetch transparent logo (GAMBAR only — icon version) */
export async function fetchLogo(): Promise<string | null> {
  try {
    const logos = await fetchImages({
      category: "logo",
      type: "transparant",
    });
    // Prefer the GAMBAR (icon) variant for navbar/footer
    const gambarLogo = logos.find((l) =>
      l.file_name.includes("LOGO GAMBAR")
    );
    return gambarLogo?.full_url || logos[0]?.full_url || null;
  } catch {
    return null;
  }
}

// ============================
// Team endpoints
// ============================

/** Fetch all team members (data already joined with image) */
export async function fetchTeamMembers(): Promise<ApiTeamMember[]> {
  return apiFetch<ApiTeamMember[]>("/api/team");
}

// ============================
// Client/Partner endpoints
// ============================

/** Fetch all clients/partners */
export async function fetchClients(): Promise<ApiClient[]> {
  return apiFetch<ApiClient[]>("/api/clients");
}

/** Fetch all core business */
export async function fetchBusiness(): Promise<ApiBusiness[]> {
  return apiFetch<ApiBusiness[]>("/api/business");
}

/** Fetch all approach steps */
export async function fetchApproach(): Promise<ApiApproach[]> {
  return apiFetch<ApiApproach[]>("/api/approach");
}
