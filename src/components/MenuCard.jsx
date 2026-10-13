import Badge from "./Badge";
import { formatRupiah } from "../utils/formatRupiah";
import styles from "../App.module.css";

export default function MenuCard({ menu, onTambah }) {
  const habis = menu.stok === 0;
  return (
    <article className={`${styles.menuCard} ${habis ? styles.menuHabis : ""}`}>
      <h3>{menu.nama}</h3>
      <span>{menu.kategori}</span>
      <p>{formatRupiah(menu.harga)}</p>
      <div>
        <Badge habis={habis}>{habis ? "Habis" : `Stok: ${menu.stok}`}</Badge>
        <button
          type="button"
          disabled={habis}
          onClick={() => onTambah(menu)}
        >
          Tambah
        </button>
      </div>
    </article>
  );
}