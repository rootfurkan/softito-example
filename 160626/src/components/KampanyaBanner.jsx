import { useState, useEffect } from "react";

export default function KampanyaBanner() {
  const [secondsLeft, setSecondsLeft] = useState(3600 * 3 + 1200); //3 saat 20 dk kalan süre

  useEffect(() => { //sayfa yüklenince başlar
    const timer = setInterval(() => { //zamanlayıcı timer değişkenine atandı
      setSecondsLeft((prev) => { //secondsleft statini güncellemek için sayacın önceki halini alır
        if (prev <= 1) { // eğer sayacın önceki hali 1'e eşit veya küçükse
          return 3600 * 3 + 1200; //tekrar başa sarar 3 saat 20 dk
        }
        return prev - 1; //sayaç bitmediyse kalan süreyi -1 azaltır
      });
    }, 1000); //kaç ms de bir çalışacağını söyler yani 1 saniye

    return () => {
      clearInterval(timer); //component ekrandan kaldırılırsa sayacı temizler
    };
  }, []);

  const formatCountdown = (totalSecs) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="slider-banner">
      <div className="slider-bilgi">
        <span className="slider-etiket">GÜNÜN FIRSATI</span>
        <h2 className="slider-baslik">Büyük Yaz İndirimleri Başladı!</h2>
        <p className="slider-detay">
          Tüm Elektronik, Giyim ve Kitaplarda sepette anında %40'a varan indirimleri kaçırmayın.
        </p>
      </div>

      <div className="slider-sayac">
        <span>⏰ Kalan Süre:</span>
        <span>{formatCountdown(secondsLeft)}</span>
      </div>
    </div>
  );
}
