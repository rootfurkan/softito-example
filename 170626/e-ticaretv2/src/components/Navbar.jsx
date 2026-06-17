export default function Navbar({ categories, selectedCategory, setSelectedCategory, setView }) {
  return (
    <nav className="nav-categories">
      <div className="nav-container">
        {categories.map((cat) => (//gelen kategorileri maplayıp tek elemana ata
          <span
            key={cat} //kategori adı verildi keye
            className={`nav-link ${selectedCategory === cat ? 'nav-link-active' : ''}`}
            //seçilen kategori hangi kategoriyle link-active classı verir
            onClick={() => {
              setSelectedCategory(cat) //tıkladıgında kategori adını seçili kategori adına ver
              setView('home') //anasayfaya geri gönderir
            }}
          >
            {cat} {/* hangi kategori seçiliyse onun ismi */}
          </span> 
        ))}
      </div>
    </nav>
  )
}
