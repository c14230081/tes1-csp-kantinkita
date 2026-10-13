A1

Hook tidak boleh di dalam if karena urutan pemanggilannya bisa berubah, sedangkan react mengetahui state berdasarkan urutan dari hook

function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");

  if (!sudahLogin) return null;

  return <input value={nama} onChange={(e) => setNama(e.target.value)} />;
}

A2

push() mengubah array secara langsung tanpa mengubah referensinya, sehingga react bisa melewati render ulang

const tambah = (baru) => {
  setItems((prev) => [...prev, baru]);
};

A3

- a: Berjalan setelah setiap render
- b: Berjalan saat mount
- c: Berjalan saat mount dan ketika kota berubah
- cleanup: sebelum efek diulang dan saat unmount

A4

Simpan keyword di induk bersama agar kedua komponen memakai data yang sama. FilterBar mengirim perubahan melalui callback ke induk.

A5

Controlled component adalah input yang nilainya mengikuti state React. Satu handleChange bisa menangani banyak input melalui atribut name dan computed property name untuk menentukan field yang diubah.