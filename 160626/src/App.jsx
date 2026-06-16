import { useState, useMemo, useEffect, useCallback } from "react";
import Baslik from "./components/Baslik";
import KampanyaBanner from "./components/KampanyaBanner";
import UrunListesi from "./components/UrunListesi";
import UrunDetayi from "./components/UrunDetayi";
import SepetGezgini from "./components/SepetGezgini";

export default function App() {
  const [products, setProducts] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [sepetAcik, setSepetAcik] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/urunler.json") // ürünleri json dosyasından çekiyoruz
      .then((res) => {
        if (!res.ok) { //eğer respons okey değilse aşağıdaki kodu çalıştır
          throw new Error(`Katalog yüklenemedi. Sunucu hata kodu: ${res.status}`); //hata
        }
        return res.json(); //geri dön
      })
      .then((data) => { //gelen veriyi dataya ata
        setProducts(data); // data içindeki verileri products statine gönder
        setLoading(false); // loaderi false yap
      })
      .catch((err) => { //yukarıdaki bloklar çalışmazsa burası çalışır
        setError(err.message); //error statine error mesajını gönder
        setLoading(false); // loaderi false yap
      });
  }, []);

  const displayProducts = useMemo(() => { //görüntülecek ürünleri geçici hafızaya al
    const filtered = currentCategory === "all"
      ? products
      : products.filter((item) => item.kategori === currentCategory); 
      // seçili kategori tümü ise tüm ürünleri filtered içine koyar eğer değilse ürünleri gezer ve sadece seçili kategoriyle eşleşen ürünleri alır diğerlerini dışarı atar

    return filtered.map((item) => { //filtered değişkenindeki ürünleri maple tek tek gezer
      const sepetUrun = sepet.find((c) => c.id === item.id); // sepette aynı ürün var mı diye id sini kontrol eder (tekrar eklenmesini önlemek sadece sayısını artırmak için)
      const sepetAdet = sepetUrun ? sepetUrun.adet : 0; // sepette ürün varsa adedini alır yoksa 0 olarak alır
      return {
        ...item, // ürünün diğer bilgilerini alır
        stok: Math.max(0, item.stok - sepetAdet) //stok sayısını günceller eksi sayıya düşmesini engellemek için de math.max(0) kullanlır
      };
    });
  }, [products, currentCategory, sepet]);

  const selectedProduct = useMemo(() => { // seçilen ürünleri geçici hafızaya alır
    return displayProducts.find((p) => p.id === selectedProductId) || null; //displayproduct içinde arama yapar ürünün id si seçili olan ürünün id sine eşit mi ona bakar değilse hiçbir şey yapmaz
  }, [displayProducts, selectedProductId]); //hiçbir değişiklik yoka eski sonucu kullan

  const handleSepeteEkle = useCallback((urun) => {  //fonksiyon oluşturup ürün parametresini verdik callback ile de kodun gereksiz yere tekrar çalışmasını engelledik
    if (urun.stok <= 0) return; // ürün stoğu 0 veya daha azsa return ile fonksiyonu durdurur

    setSepet((prevSepet) => { // sepet statine sepetin güncellenmeden önceki halini parametre geçtik
      const varOlan = prevSepet.find((item) => item.id === urun.id); // sepetteki ürünleri tektek gezer varolan sepette aynı ürün var mı diye id ile kontrol eder
      if (varOlan) { 
        return prevSepet.map((item) =>
          item.id === urun.id ? { ...item, adet: item.adet + 1 } : item
        ); // eğer sepette aynı üründen varsa ürünün diğer özelliklerini ... ile alır ürün adetini +1 artırır eğer ürün aynı değilse varolan korunur
      }
      return [...prevSepet, { id: urun.id, ad: urun.ad, fiyat: urun.fiyat, adet: 1 }]; //sepette aynı ürün yoksa eklenen ürünün bilgilerini sepete ekler eski sepet bilgileri korunarak
    });
  }, []);

  const handleAdetGuncelle = useCallback((productId, yeniAdet) => { // yeni fonksiyona 2 parametre veriyoruz adet değişecek ürün idsi ve ürünün yeni adedi
    const anaUrun = products.find((p) => p.id === productId); //ürün listesinde ürünleri tek tek gezer p parametresine atar ürünün id si güncellenmek istenen ürünün id si ile aynı mı kontrol eder
    if (!anaUrun) return; //değilse fonksiyonu durdurur

    if (yeniAdet <= 0) { // eğer yeni adet 0 dan küçük veya eşitse
      setSepet((prev) => prev.filter((item) => item.id !== productId)); // 0 dan düşük olan ürünleri sepetten çıkarır
      return;
    }

    if (yeniAdet > anaUrun.stok) { //yeni ürün adedi ürünün stok sayısından fazlaysa
      alert(`Üzgünüz, bu üründen en fazla ${anaUrun.stok} adet ekleyebilirsiniz.`); //stok sayısı kadar ürün ekleyebileceğimiz uyarısı verir
      return;
    }

    setSepet((prev) => //sepeti güncellemek için kullandık prev ile sepetin önceki halini parametre aldık
      prev.map((item) => //sepetteki ürünleri tek tek dolaşır
        item.id === productId ? { ...item, adet: yeniAdet } : item // sepetteki ürün adedi güncellenecek ürün mü diye kontrol edilir öyleyse ürünlerin diğer bilgilerini alır yeni bir ürün nesnesi oluşturur değilse aynı kalır
      )
    );
  }, [products]); // products değiştirilirse fonksiyon yeniden oluşturulur usecallback oldugu için

  const handleUrunCikar = useCallback((productId) => { //parametre olarak ürünün id sini aldık
    setSepet((prev) => prev.filter((item) => item.id !== productId)); //sepetteeki ürünleri filtreleyerek id si productId ye eşit olmayan ürünleri tutar yani product id ile eşleşen ürünleri siler
  }, []);

  const handleCategoryChange = useCallback((newCat) => {
    setCurrentCategory(newCat); //seçili kategoriyi değiştirir 
  }, []);

  return (
    <div className="app-container">
      <Baslik
        env={currentCategory}
        sepetAdedi={sepet.reduce((sum, item) => sum + item.adet, 0)}
        onSepetAc={() => setSepetAcik(true)}
        searchVal={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <KampanyaBanner />

      <UrunListesi
        products={displayProducts}
        loading={loading}
        error={error}
        activeCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
        onSelectProduct={(item) => setSelectedProductId(item.id)}
        onSepeteEkle={handleSepeteEkle}
        searchTerm={searchTerm}
      />

      <SepetGezgini
        sepet={sepet}
        isOpen={sepetAcik}
        onClose={() => setSepetAcik(false)}
        onAdetGuncelle={handleAdetGuncelle}
        onUrunCikar={handleUrunCikar}
      />

      {selectedProductId && (
        <UrunDetayi
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
          onSepeteEkle={handleSepeteEkle}
        />
      )}
    </div>
  );
}
