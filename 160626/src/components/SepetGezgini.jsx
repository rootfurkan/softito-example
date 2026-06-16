import { useMemo } from "react";

export default function SepetGezgini({
  sepet,
  isOpen,
  onClose,
  onAdetGuncelle,
  onUrunCikar
}) { //dışarıdan aldığı propslar

  const toplamFiyat = useMemo(() => {
    return sepet.reduce((toplam, item) => toplam + item.fiyat * item.adet, 0); //reduce ile sepetteki ürünleri tek tek dolaşır ve toplam fiyatı hesaplar
  }, [sepet]);

  const kargoLimit = 1500; //ücretsiz kargo limiti
  const kargoUcreti = toplamFiyat >= kargoLimit || toplamFiyat === 0 ? 0 : 50; //sepet toplamı 1500 tl veya daha fazlaysa kargo ücretsiz değilse 50 tl
  const kalanTutar = Math.max(0, kargoLimit - toplamFiyat); //ücretsiz kargo için kalan tutarı hesaplar toplam sepet tutarından kargo limiti çıkararak
  const ilerlemeYuzdesi = Math.min((toplamFiyat / kargoLimit) * 100, 100); // ilerleme çubuğunun yüzde kaç dolacağını hesaplar

  const drawerClass = `sepet-drawer ${isOpen ? "sepet-drawer-visible" : "sepet-drawer-hidden"}`; //sepetin arka plan blurunu açık kapalı durumuna göre class atıyor

  if (!isOpen) return null; // eğer açık değilse hiçbir şey yapma

  return (
    <>
      <div onClick={onClose} className="drawer-arka-plan"></div>

      <div className={drawerClass}>
        <div>
          <div className="drawer-ust">
            <h3 className="app-card-title">Sepetim ({sepet.reduce((sum, item) => sum + item.adet, 0)} Ürün)</h3>
            <button onClick={onClose} className="drawer-kapat-btn">✕</button>
          </div>

          {sepet.length > 0 && (
            <div className="sepet-kargo-ilerleme-kutusu">
              {toplamFiyat >= kargoLimit ? (
                <span className="sepet-kargo-ilerleme-metni">🎉 Kargonuz Bedava!</span>
              ) : (
                <span className="sepet-kargo-ilerleme-metni">
                  🚚 Kargo bedava için <strong>{kalanTutar.toFixed(2)} TL</strong> daha ekleyin!
                </span>
              )}
              <div className="ilerleme-bar-yolu">
                <div
                  className="ilerleme-bar-doluluk"
                  style={{ width: `${ilerlemeYuzdesi}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="sepet-liste-alani">
            {sepet.length === 0 ? (
              <div className="sepet-bos-etiket">
                <span>Sepetiniz şu anda boş.</span>
              </div>
            ) : (
              sepet.map((item) => (
                <div key={item.id} className="sepet-urun-satir">
                  <div className="sepet-eleman-bilgi">
                    <span className="sepet-urun-ad">{item.ad}</span>
                    <span className="sepet-urun-fiyat">{item.fiyat.toFixed(2)} TL</span>
                    
                    <div className="sepet-adet-kontrolleri">
                      <button
                        onClick={() => onAdetGuncelle(item.id, item.adet - 1)}
                        className="sepet-adet-btn"
                      >
                        -
                      </button>
                      <span className="sepet-adet-yazi">{item.adet}</span>
                      <button
                        onClick={() => onAdetGuncelle(item.id, item.adet + 1)}
                        className="sepet-adet-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="sepet-satir-sag">
                    <span className="sepet-satir-toplam-fiyat">
                      {(item.fiyat * item.adet).toFixed(2)} TL
                    </span>
                    <button
                      onClick={() => onUrunCikar(item.id)}
                      className="sepet-satir-sil-btn"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {sepet.length > 0 && (
          <div className="sepet-alt-odeme-paneli">
            <div className="odeme-detay-satiri">
              <span className="detail-meta-label">Ara Toplam</span>
              <span className="detail-meta-val font-mono">{toplamFiyat.toFixed(2)} TL</span>
            </div>
            <div className="odeme-detay-satiri">
              <span className="detail-meta-label">Kargo Ücreti</span>
              <span className="detail-meta-val font-mono">
                {kargoUcreti === 0 ? "Bedava" : `${kargoUcreti.toFixed(2)} TL`}
              </span>
            </div>
            <div className="odeme-detay-satiri border-t border-slate-100 pt-3">
              <span className="app-card-title">Genel Toplam</span>
              <span className="odeme-genel-toplam">
                {(toplamFiyat + kargoUcreti).toFixed(2)} TL
              </span>
            </div>
            <div className="terminal-header">
              <button
                onClick={() => alert("Siparişiniz başarıyla alındı! (Simülasyon)")}
                className="btn btn-primary w-full"
              >
                Alışverişi Tamamla
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
