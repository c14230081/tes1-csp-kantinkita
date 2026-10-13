import { useState } from "react";
import styles from "../App.module.css";

const NILAI_AWAL = { nama: "", kategori: "", harga: "", stok: "" };

export default function FormTambahMenu({ kategori, onTambahMenu }) {
  const [form, setForm] = useState(NILAI_AWAL);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validasi() {
    const errorBaru = {};
    const harga = Number(form.harga);
    const stok = Number(form.stok);
    if (form.nama.trim().length < 3) {
      errorBaru.nama = "Nama minimal 3 karakter.";
    }
    if (!kategori.includes(form.kategori)) {
      errorBaru.kategori = "Kategori wajib dipilih.";
    }
    if (!form.harga.trim() || !Number.isFinite(harga) || harga <= 0) {
      errorBaru.harga = "Harga harus berupa angka lebih dari 0.";
    }
    if (!form.stok.trim() || !Number.isInteger(stok) || stok < 0) {
      errorBaru.stok = "Stok harus berupa bilangan bulat 0 atau lebih.";
    }
    return errorBaru;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errorBaru = validasi();
    setErrors(errorBaru);

    if (Object.keys(errorBaru).length > 0) {
      return;
    }

    const menuBaru = {
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok),
    };

    onTambahMenu(menuBaru);
    setForm(NILAI_AWAL);
  }

  return (
    <section className={styles.panel} aria-labelledby="judul-form">
      <h2 id="judul-form">Tambah Menu</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nama-menu">Nama menu</label>
          <input
            id="nama-menu"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            aria-invalid={Boolean(errors.nama)}
            aria-describedby={errors.nama ? "error-nama" : undefined}
          />
          {errors.nama && (
            <small id="error-nama" className={styles.error} role="alert">
              {errors.nama}
            </small>
          )}
        </div>
        <div>
          <label htmlFor="kategori-menu">Kategori</label>
          <select
            id="kategori-menu"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            aria-invalid={Boolean(errors.kategori)}
            aria-describedby={errors.kategori ? "error-kategori" : undefined}
          >
            <option value="">Pilih kategori</option>
            {kategori.map((namaKategori) => (
              <option key={namaKategori} value={namaKategori}>
                {namaKategori}
              </option>
            ))}
          </select>
          {errors.kategori && (
            <small id="error-kategori" className={styles.error} role="alert">
              {errors.kategori}
            </small>
          )}
        </div>
        <div>
          <label htmlFor="harga-menu">Harga (Rp)</label>
          <input
            id="harga-menu"
            name="harga"
            type="number"
            min="0"
            step="any"
            value={form.harga}
            onChange={handleChange}
            aria-invalid={Boolean(errors.harga)}
            aria-describedby={errors.harga ? "error-harga" : undefined}
          />
          {errors.harga && (
            <small id="error-harga" className={styles.error} role="alert">
              {errors.harga}
            </small>
          )}
        </div>
        <div>
          <label htmlFor="stok-menu">Stok</label>
          <input
            id="stok-menu"
            name="stok"
            type="number"
            min="0"
            step="1"
            value={form.stok}
            onChange={handleChange}
            aria-invalid={Boolean(errors.stok)}
            aria-describedby={errors.stok ? "error-stok" : undefined}
          />
          {errors.stok && (
            <small id="error-stok" className={styles.error} role="alert">
              {errors.stok}
            </small>
          )}
        </div>
        <button type="submit">Simpan menu</button>
      </form>
    </section>
  );
}