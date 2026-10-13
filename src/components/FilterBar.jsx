import { useRef } from "react";
import styles from "../App.module.css";

export default function FilterBar({ keyword, kategori, kategoriAktif, onKeywordChange, onKategoriChange }) {
  const inputRef = useRef(null);

  function bersihkanPencarian() {
    onKeywordChange("");
    inputRef.current.focus();
  }

  return (
    <div>
      <label htmlFor="pencarian">Cari nama menu</label>
      <div>
        <input
          id="pencarian"
          type="search"
          ref={inputRef}
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="Contoh: nasi goreng"
        />
        <button type="button" onClick={bersihkanPencarian}>Bersihkan</button>
      </div>
      <div role="group" aria-label="Filter kategori">
        <button
          type="button"
          className={kategoriAktif === "semua" ? styles.aktif : ""}
          aria-pressed={kategoriAktif === "semua"}
          onClick={() => onKategoriChange("semua")}
        >
          Semua
        </button>
        {kategori.map((namaKategori) => (
          <button
            key={namaKategori}
            type="button"
            className={kategoriAktif === namaKategori ? styles.aktif : ""}
            aria-pressed={kategoriAktif === namaKategori}
            onClick={() => onKategoriChange(namaKategori)}
          >
            {namaKategori}
          </button>
        ))}
      </div>
    </div>
  );
}