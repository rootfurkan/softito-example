import { useState, useEffect } from "react";

export default function Baslik({ env, sepetAdedi, onSepetAc, searchVal, onSearchChange }) { //dışardan propslar aldık
  const [windowSize, setWindowSize] = useState({ //ekran boyutunu tutmak için state oluşturduk
    width: window.innerWidth, //tarayıcı penceresinin genişliğini al
    height: window.innerHeight // tarayıcı penceresinin yüksekliğini al
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      }); //tarayıcı penceresi küçültüldüğünde veya büyütüldüğünde değerleri günceller
    };

    window.addEventListener("resize", handleResize); //tarayıcı penceresine boyut değişip değişmediğini anlamak için dinleyici koyulur
    return () => {
      window.removeEventListener("resize", handleResize); // fonksiyon tekrardan çalışacak olursa eski değeri siler
    };
  }, []);

  const getEnvName = (cat) => {
    if (cat === "all") return "TÜM KATEGORİLER"; // eğer kategori adı tümü ise tüm kategoriler yazdırır 
    return cat.toUpperCase(); // eğer tümü değilse kateogri adını büyük harfe çevirip döndürür
  };

  return (
    <header className="eticaret-header">
      <div className="header-ust-alan">
        <div className="logo-alani">
          <div className="site-logo-link">HEPSİAL</div>
          <span className="site-logo-badge">STORE</span>
        </div>

        <div className="arama-alani">
          <input
            type="text"
            placeholder="Ürün, kategori veya marka ara..."
            value={searchVal}
            onChange={(e) => onSearchChange(e.target.value)}
            className="arama-input"
          />
          <button className="arama-butonu">Ara</button>
        </div>

        <div className="kullanici-kontrolleri">
          <div className="menu-linki">Giriş Yap</div>
          <div className="menu-linki">Siparişlerim</div>
          
          <button onClick={onSepetAc} className="sepet-tetikleyici">
            <span>🛒 Sepetim</span>
            {sepetAdedi > 0 && (
              <span className="sepet-sayac-rozet">{sepetAdedi}</span>
            )}
          </button>
        </div>
      </div>

      <div className="kategori-seridi">
        <span className="badge badge-gray">{getEnvName(env)}</span>
        <span className="detail-meta-label">| Çözünürlük: {windowSize.width}px</span>
      </div>
    </header>
  );
}
