/**
 * Memformat angka menjadi string dengan format mata uang lokal (misal: 3500000 → "3.500.000")
 * Hanya untuk keperluan tampilan. Nilai asli tetap berupa number/string mentah.
 *
 * @param value - Angka yang akan diformat (bisa number atau string)
 * @param locale - Lokal untuk format (default: 'id-ID' untuk format Indonesia)
 * @param currency - Kode mata uang (opsional, default: tidak ditampilkan)
 * @returns string yang sudah diformat tanpa simbol mata uang
 */
export const formatCurrencyDisplay = (
  value: number | string | null | undefined,
  locale: string = "id-ID",
  currency?: string
): string => {
  // Handle nilai null/undefined/empty
  if (value === null || value === undefined || value === "") {
    return "";
  }

  // Pastikan value adalah number
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Jika parsing gagal, kembalikan string kosong
  if (isNaN(numValue)) {
    return "";
  }

  // Gunakan Intl.NumberFormat untuk format lokal
  const formatter = new Intl.NumberFormat(locale, {
    style: currency ? "currency" : "decimal",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let formatted = formatter.format(numValue);

  // Jika tidak ingin simbol mata uang, hapus simbolnya (misal: "Rp" atau "IDR")
  if (!currency) {
    // Hapus simbol non-digit/non-koma/non-titik (misal: "Rp", "IDR", "$", dll)
    // Tapi pertahankan angka, koma, titik, dan spasi jika ada
    formatted = formatted.replace(/[^\d.,\s]/g, "").trim();
  }

  return formatted;
};
