import { formatRupiah } from "../utils/formatRupiah";
import styles from "../App.module.css";

export default function Keranjang({ items, jumlahItem, totalHarga, onUbahQty, onHapus, errorPenyimpanan }) {
  return (
    <section className={styles.panel} aria-labelledby="judul-keranjang">
      <h2 id="judul-keranjang">Keranjang Pesanan</h2>
      {errorPenyimpanan && <p className={styles.error} role="alert">{errorPenyimpanan}</p>}
      {items.length === 0 ? (
        <p>Keranjang masih kosong. Pilih menu lalu tekan Tambah.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <h3>{item.nama}</h3>
              <p>{formatRupiah(item.harga)} × {item.qty} = {formatRupiah(item.harga * item.qty)}</p>
              <div>
                <div>
                  <button
                    type="button"
                    aria-label={`Kurangi ${item.nama}`}
                    onClick={() => onUbahQty(item.id, -1)}
                  >
                    −
                  </button>
                  <span aria-label={`Jumlah ${item.nama}`}>{item.qty}</span>
                  <button
                    type="button"
                    aria-label={`Tambah jumlah ${item.nama}`}
                    onClick={() => onUbahQty(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={`Hapus ${item.nama}`}
                  onClick={() => onHapus(item.id)}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div>
        <p>Jumlah item: {jumlahItem}</p>
        <p>Total harga: {formatRupiah(totalHarga)}</p>
      </div>
    </section>
  );
}