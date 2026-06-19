import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import AddProductForm from "./components/AddProductForm";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "./productsMock";
import CartModal from "./components/CartModal";

import { useState } from "react";
function App() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sepet, setSepet] = useState([]); //sepetteki ürünleri tutar
  const [sepetAcik , setSepetAcik] = useState(false) //sepet modalının açık olup olmadığını tutar

  const handleAddProduct = (data) =>{ //formdan gelen datadaki ürünleri state içine ekler
    const newProduct = {
      id: Date.now(),
      title : data.title,
      price : Number(data.price),
      category : data.category,
      rating: 5.0, 
      ratingCount : 1, 
      image:data.image,
      description: data.description,
    }
    setProducts([newProduct, ...products]); //products e veri ekle kendi içindeki ürünleri bozmadan
  }

  const handleAddToCart = (product) => { //ürün zaten sepette varsa miktarı artır yoksa ekle
  setSepet(prev => {
    const existing = prev.find(item => item.id === product.id);
    if (existing) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
};

const handleRemoveFromCart = (productId) => { //ürünü sepetten tamamen kaldır
  setSepet(prev => prev.filter(item => item.id !== productId));
};

const handleUpdateQuantity = (productId, delta) => { //adet artır/azalt, 0 olunca otomatik kaldır
  setSepet(prev =>
    prev
      .map(item => item.id === productId ? { ...item, quantity: item.quantity + delta } : item)
      .filter(item => item.quantity > 0)
  );
};

const cartCount = sepet.reduce((sum, item) => sum + item.quantity, 0); //sepetteki toplam ürün sayısı


  const filteredProducts = products.filter((p) => { //state deki ürünleri filtrele
    const matchesCategory =
      selectedCategory === "Tümü" || p.category === selectedCategory;
      //seçilen kategori tümü veya ürün kategorisi seçilen kategoriyse
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
      //başlık ya da açıklama sorguda içeriyorsa 
    return matchesCategory && matchesSearch; //return ile eşleşen ürünleri dön
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput); //ara butonuna basınca sayfayı yeniden yükleme ve 
    //girilen input değerini gönder
  };

  return (
    <>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setView={setView}
        cartCount={cartCount} //badge için ürün sayısını gönder
        onCartOpen={() => setSepetAcik(true)} //sepet butonuna tıklayınca modalı açıyor yani statei falseden true ye döndürüyor
      />
      <Navbar
        categories={MOCK_CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setView={setView}
      />

      {view === "home" ? (
        <main className="main-layout">
          <Sidebar
            categories={MOCK_CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="content-area">
            <div className="content-header">
              <h1 className="page-title">
                {selectedCategory} {searchQuery && `> "${searchQuery}"`} Ürünler
              </h1>
              <span className="text-sm">
                Toplam {filteredProducts.length} Ürün
              </span>
            </div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-red-800">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                </div>
              ) : (
                <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} //sepete ekle fonksiyonunu gönder
                />
              )}
      


          </div>
        </main>
      ) : (
        <AddProductForm categories={MOCK_CATEGORIES} 
        setView = {setView} onAddProduct={handleAddProduct}
        />
      )}
      {sepetAcik && ( //sepet açıksa modalı göster
        <CartModal
          cart={sepet}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onClose={() => setSepetAcik(false)} //kapatınca state'i false yap
        />
      )}
      <Footer />
    </>
  );
}

export default App;
