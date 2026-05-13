import type { ApiTeamMember } from "../types/types";

// Environment variables for dynamic configuration
const OFFICE_WHATSAPP = import.meta.env.VITE_OFFICE_WHATSAPP || "08137509570";
const PHONE_SANDI = import.meta.env.VITE_PHONE_SANDI || "0851-6350-4614";
const PHONE_FRADIYA = import.meta.env.VITE_PHONE_FRADIYA || "0857-7836-0514";
const PHONE_YUANITA = import.meta.env.VITE_PHONE_YUANITA || "0896-7009-1880";
const PHONE_DARUS = import.meta.env.VITE_PHONE_DARUS || "-";

export const COMPANY_INFO = {
  name: "PT. Sanita Akses Nusantara",
  address: "Perumahan Pabuaran Indah, Jl. Anggur 4 Blok J4 No. 3, Kel. Pabuaran Mekar, Kec. Cibinong, Kab. Bogor. 16916",
  whatsapp: OFFICE_WHATSAPP,
  whatsappLink: `https://wa.me/${OFFICE_WHATSAPP.replace(/[^0-9]/g, "").replace(/^0/, "62")}?text=${encodeURIComponent("Halo PT Sanita Akses Nusantara, saya ingin bertanya lebih lanjut mengenai layanan Anda.")}`,
  emails: {
    sales: "sales@sanitaaksesnusantara.com",
    cs: "cs@sanitaaksesnusantara.com",
    director: "sandiIrawan@sanitaaksesnusantara.com",
  }
};

export const STATS = [
  { label: "Proyek Selesai", value: "100+" },
  { label: "Partner Bisnis", value: "50+" },
  { label: "Sertifikasi", value: "HACCP" },
];

export const TEAM_DATA: ApiTeamMember[] = [
  {
    id_team: 1,
    member_id: "sandi-irawan",
    name: "Sandi Irawan",
    shortName: "Sandi",
    role: "Direktur",
    quote: "Berkomitmen untuk memimpin PT. Sanita Akses Nusantara menjadi solusi terbaik di industri.",
    bio: "Seorang pemimpin visioner dengan pengalaman luas dalam manajemen operasional dan strategi bisnis.",
    theme: "gold",
    image: "/people/(TRANSPARENT) Sandi_Irawan-DIREKTUR.webp",
    image_type: "transparant",
    phone: PHONE_SANDI,
    email: "sandiIrawan@sanitaaksesnusantara.com",
    website: "www.sanitaaksesnusantara.com",
    address: "Perumahan Pabuaran Indah, Jl. Anggur 4 Blok J4 No. 3, Kel. Pabuaran Mekar, Kec. Cibinong, Kab. Bogor. 16916"
  },
  {
    id_team: 2,
    member_id: "fradiya-daffa",
    name: "Fradiya Daffa Pangestu",
    shortName: "Fradiya Daffa P.",
    role: "Komisaris",
    quote: "Menjaga visi jangka panjang perusahaan dengan integritas dan inovasi berkelanjutan.",
    bio: "Berkomitmen untuk mengarahkan PT. Sanita Akses Nusantara menjadi pemimpin pasar dalam penyediaan logistik dan peralatan industrial dengan standar kualitas tak tertandingi.",
    theme: "gold",
    image: "/people/(TRANSPARENT) Fradiya_Daffa_Pangestu-KOMISARIS.webp",
    image_type: "transparant",
    phone: PHONE_FRADIYA,
    email: "cs@sanitaaksesnusantara.com",
    website: "www.sanitaaksesnusantara.com",
    address: "Perumahan Pabuaran Indah, Jl. Anggur 4 Blok J4 No. 3, Kel. Pabuaran Mekar, Kec. Cibinong, Kab. Bogor. 16916"
  },
  {
    id_team: 3,
    member_id: "wahyuning-yuanita",
    name: "Wahyuning Yuanita S.",
    shortName: "Yuanita",
    role: "General Manager",
    quote: "Efisiensi dan kualitas adalah prioritas utama kami dalam melayani setiap klien.",
    bio: "Mengelola seluruh aspek operasional perusahaan untuk memastikan layanan prima dan kepuasan pelanggan.",
    theme: "gold",
    image: "/people/(TRANSPARENT) Wahyuning_Yuanita_S-GENERAL-MANAGER.webp",
    image_type: "transparant",
    phone: PHONE_YUANITA,
    email: "cs@sanitaaksesnusantara.com",
    website: "www.sanitaaksesnusantara.com",
    address: "Perumahan Pabuaran Indah, Jl. Anggur 4 Blok J4 No. 3, Kel. Pabuaran Mekar, Kec. Cibinong, Kab. Bogor. 16916"
  },
  {
    id_team: 4,
    member_id: "darus-salam",
    name: "Darus Salam",
    shortName: "Darus",
    role: "Kepala Produksi",
    quote: "Presisi dalam setiap detail produk untuk standar kualitas tertinggi.",
    bio: "Bertanggung jawab atas kelancaran proses produksi dan kontrol kualitas di lapangan.",
    theme: "gold",
    image: "/people/(TRANSPARENT) Darus_Salam-KEPALA-PRODUKSI.webp",
    image_type: "transparant",
    phone: PHONE_DARUS,
    email: "sales@sanitaaksesnusantara.com",
    website: "www.sanitaaksesnusantara.com",
    address: "Perumahan Pabuaran Indah, Jl. Anggur 4 Blok J4 No. 3, Kel. Pabuaran Mekar, Kec. Cibinong, Kab. Bogor. 16916"
  }
];

// NOTE: Data PARTNER_LOGOS, CORE_BUSINESS, dan APPROACH_STEPS sekarang diambil dari database via API.
// Silakan cek hooks: useClients, useBusiness, dan useApproach.

// NOTE: CATALOGUE_ITEMS sekarang diambil dari database (category: catalog).
// Lihat hook: useCatalog.
