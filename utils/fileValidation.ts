// utils/fileValidation.ts
const ALLOWED_TYPES: Record<string, string[]> = {
  image: ["jpeg", "jpg", "png"],
  document: ["pdf", "png"],
  pdf: ["pdf"],
  png: ["png"],
};

export const isValidFileType = (
  fileName: string,
  allowedExtensions: string[]
): boolean => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return !!extension && allowedExtensions.includes(extension);
};

// Helper: Dapatkan MIME type berdasarkan ekstensi (opsional)
export const getMimeType = (fileName: string): string => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
      return "image/jpg";
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
};

export default ALLOWED_TYPES;
