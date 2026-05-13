// ============================
// Response types dari Backend API
// ============================

/** Struktur gambar dari tabel `images` */
export interface ApiImage {
  id_image: number;
  file_name: string;
  category: string;
  path: string;
  type: "transparant" | "non-transparant";
  full_url: string;
  created_at: string;
}

/** Struktur team member dari endpoint `/api/team` (sudah di-join dengan images) */
export interface ApiTeamMember {
  id_team: number;
  member_id: string;
  name: string;
  shortName: string;
  role: string;
  quote: string;
  bio: string;
  theme: "navy" | "gold";
  image: string; // full_url dari BE
  image_type: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

/** Struktur client/partner dari tabel `clients` */
export interface ApiClient {
  id_client: number;
  name: string;
  created_at: string;
}

/** Generic API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/** Struktur core business */
export interface ApiBusiness {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
}

/** Struktur approach steps */
export interface ApiApproach {
  step: number;
  title: string;
  description: string;
}
