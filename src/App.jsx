import { useEffect, useState } from "react";
import { semuaMenu } from "./data/menu";
import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import TimerSesi from "./components/TimerSesi";
import FormTambahMenu from "./components/FormTambahMenu";
import styles from "./App.module.css";

const KUNCI_KERANJANG = "kantinkita-keranjang";

function bacaKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI_KERANJANG) || "[]");
    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter((item) => {
      if (!item) return false;

      const idValid = Number.isInteger(item.id);
      const namaValid = typeof item.nama === "string";
      const hargaValid = Number.isFinite(item.harga) && item.harga > 0;
      const qtyValid = Number.isInteger(item.qty) && item.qty > 0;

      return idValid && namaValid && hargaValid && qtyValid;
    });
  } catch {
    return [];
  }
}

export default function App() {
  const [daftarMenu, setDaftarMenu] = useState(semuaMenu);
  const [keyword, setKeyword] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("semua");
  const [keranjang, setKeranjang] = useState(bacaKeranjang);
  const [timerTerlihat, setTimerTerlihat] = useState(true);
  const [errorPenyimpanan, setErrorPenyimpanan] = useState("");

  const kategori = [...new Set(daftarMenu.map((menu) => menu.kategori))];
  const kataKunci = keyword.trim().toLowerCase();
  const hasilMenu = daftarMenu.filter((menu) => {
    const cocokNama = menu.nama.toLowerCase().includes(kataKunci);
    const cocokKategori = kategoriAktif === "semua" || menu.kategori === kategoriAktif;

    return cocokNama && cocokKategori;
  });
  const jumlahItem = keranjang.reduce((jumlah, item) => jumlah + item.qty, 0);
  const totalHarga = keranjang.reduce((total, item) => total + item.harga * item.qty, 0);

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(keranjang));
      setErrorPenyimpanan("");
    } catch {
      setErrorPenyimpanan("Keranjang belum tersimpan. Penyimpanan browser tidak tersedia.");
    }
  }, [keranjang]);

  useEffect(() => {
    if (jumlahItem > 0) {
      document.title = `(${jumlahItem}) KantinKita`;
    } else {
      document.title = "KantinKita";
    }
  }, [jumlahItem]);

  function tambahKeKeranjang(menu) {
    if (menu.stok === 0) {
      return;
    }

    setKeranjang((prev) => {
      const sudahAda = prev.some((item) => item.id === menu.id);

      if (sudahAda) {
        return prev.map((item) => {
          if (item.id === menu.id) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
      }

      return [...prev, { ...menu, qty: 1 }];
    });
  }

  function ubahQty(id, perubahan) {
    setKeranjang((prev) => {
      const keranjangBaru = prev.map((item) => {
        if (item.id === id) {
          return { ...item, qty: item.qty + perubahan };
        }
        return item;
      });

      return keranjangBaru.filter((item) => item.qty > 0);
    });
  }

  function hapusItem(id) {
    setKeranjang((prev) => prev.filter((item) => item.id !== id));
  }

  function tambahMenu(menuBaru) {
    // ID juga memperhitungkan menu tambahan yang masih tersimpan di keranjang.
    const idMenu = daftarMenu.map((menu) => menu.id);
    const idKeranjang = keranjang.map((item) => item.id);
    const idBaru = Math.max(0, ...idMenu, ...idKeranjang) + 1;

    setDaftarMenu((prev) => [...prev, { ...menuBaru, id: idBaru }]);
  }

  return (
    <main className={styles.app}>
      <header>
        <h1>KantinKita</h1>
        {timerTerlihat && <TimerSesi />}
        <button type="button" onClick={() => setTimerTerlihat((terlihat) => !terlihat)}>
          {timerTerlihat ? "Sembunyikan timer" : "Tampilkan timer"}
        </button>
      </header>
      <FilterBar
        keyword={keyword}
        kategori={kategori}
        kategoriAktif={kategoriAktif}
        onKeywordChange={setKeyword}
        onKategoriChange={setKategoriAktif}
      />
      <div className={styles.layout}>
        <section className={styles.menu} aria-labelledby="judul-menu">
          <h2 id="judul-menu">Daftar Menu</h2>
          <MenuList
            menu={hasilMenu}
            keyword={keyword}
            kategoriAktif={kategoriAktif}
            onTambah={tambahKeKeranjang}
          />
        </section>
        <aside className={styles.pesanan}>
          <Keranjang
            items={keranjang}
            jumlahItem={jumlahItem}
            totalHarga={totalHarga}
            onUbahQty={ubahQty}
            onHapus={hapusItem}
            errorPenyimpanan={errorPenyimpanan}
          />
        </aside>
      </div>
      <FormTambahMenu kategori={kategori} onTambahMenu={tambahMenu} />
    </main>
  );
}
