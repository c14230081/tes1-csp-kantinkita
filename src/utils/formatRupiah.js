export function formatRupiah(nilai) {
  return nilai.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 2 });
}