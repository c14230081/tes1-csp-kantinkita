import MenuCard from "./MenuCard";

export default function MenuList({ menu, keyword, kategoriAktif, onTambah }) {
  if (menu.length === 0) {
    return (
      <p role="status">
        Tidak ada menu untuk kata kunci “{keyword.trim()}”
        {kategoriAktif === "semua" ? " di semua kategori." : ` pada kategori ${kategoriAktif}.`}
      </p>
    );
  }
  return (
    <div>
      {menu.map((item) => (
        <MenuCard key={item.id} menu={item} onTambah={onTambah} />
      ))}
    </div>
  );
}