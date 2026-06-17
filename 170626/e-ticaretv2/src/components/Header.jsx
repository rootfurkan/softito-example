export default function Header({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  setSelectedCategory,
  setSearchQuery,
  setView,
  cartCount, //sepetteki toplam ürün sayısı
  onCartOpen //sepet modalını açan fonksiyon
}) {
  const handleLogoClick = () => {
    setView("home");
    setSelectedCategory("Tümü");
    setSearchQuery(""); //daha önce arama yapıldıysa inputu boşalt
    setSearchInput("");
  };
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={handleLogoClick}>
            n11<span className="logo-accent">Clone</span>
          </div>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            
            <input
              type="text"
              placeholder="Ürün,Kategori veya Marka Ara..."
              className="search-input"
              onChange={(e)=>setSearchInput(e.target.value)}
              value={searchInput} 
            />
            <button type="submit" className="search-button">Ara</button>
          </form>
          <div className="header-actions">
            <div className="action-item" onClick={()=> setView('addProduct')}>
              <span>Yeni Ürün</span>
            </div>
            <div className="action-item">
              <span>Giriş Yap</span>
            </div>
            <div className="action-item relative" onClick={onCartOpen}> {/*tıklayınca sepet modalı açılır*/}
              <span>Sepetim</span>
              {cartCount > 0 && ( //ürün varsa badge göster
                <span className="badge">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
