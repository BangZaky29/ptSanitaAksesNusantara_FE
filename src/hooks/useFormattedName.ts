/**
 * Hook to clean and format product/image names.
 * Centralizes the logic requested in Phase 2.
 */
export function useFormattedName() {
  const formatName = (fileName: string | undefined) => {
    if (!fileName) return "";
    
    return fileName
      .replace(/\.[^/.]+$/, "") // Remove last extension
      .replace(/\.JPG$/, "")    // Specific fix for .JPG.jpeg case
      .replace(/\(NON TRANSPARENT\)\s*/i, "")
      .replace(/\(TRANSPARENT\)\s*/i, "")
      .replace(/_/g, " ")       // Replace underscores
      .replace(/-/g, " ")       // Replace hyphens
      .trim();
  };

  return { formatName };
}
