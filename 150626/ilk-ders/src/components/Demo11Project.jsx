import { useState, useEffect } from 'react'; 

const PersonelFiltre = ({ 
  aramaMetni, 
  setAramaMetni,
  seciliDepartman, 
  setSeciliDepartman, 
  sadeceAktif, 
  setSadeceAktif, 
  sadeceStajyer, 
  setSadeceStajyer 
}) => {
  const departmanlar = ["Tümü", "Yazılım", "Tasarım", "Yönetim", "Pazarlama", "İnsan Kaynakları"]; // Select için departman listesi

  return ( 
    <div className="demo-card demo-card-3xl p-4">
      <h4 className="demo-section-title mb-3">Personel Ara ve Filtrele</h4>

      <div className="demo-responsive-grid-2">
        <div>
          <input
            type="text"
            placeholder="İsim veya rol ara..."
            value={aramaMetni} // Input değerini state e bağlar
            onChange={(e) => setAramaMetni(e.target.value)} // Yazıldıkça aramaMetni stateini günceller
            className="demo-input"
          />
        </div>

        <div>
          <select
            value={seciliDepartman} // Select değerini state'e bağlar
            onChange={(e) => setSeciliDepartman(e.target.value)} // Seçim değişince departman state'ini günceller
            className="demo-select"
          >
            {departmanlar.map(dep => ( // Departman dizisini optionlara çevirir
              <option key={dep} value={dep}>{dep} Departmanı</option> // Her option için benzersiz key kullanır
            ))}
          </select>
        </div>
      </div>

      <div className="demo-filter-actions">
        <label className="demo-filter-checkbox-label">
          <input
            type="checkbox"
            checked={sadeceAktif} // Checkbox değerini state'e bağlar
            onChange={(e) => setSadeceAktif(e.target.checked)} // İşaretlenme durumunu state'e aktarır
            className="todo-checkbox"
          />
          Sadece Aktif Çalışanlar
        </label>

        <label className="demo-filter-checkbox-label">
          <input
            type="checkbox"
            checked={sadeceStajyer} // Checkbox değerini state'e bağlar
            onChange={(e) => setSadeceStajyer(e.target.checked)} // Stajyer filtresini günceller
            className="todo-checkbox"
          />
          Sadece Stajyerler
        </label>
      </div>
    </div>
  );
};

const PersonelKart = ({ personel, sil, duzenle, aktiflikToggle }) => { // Tek personel kartı componenti
  return ( // Kartın JSX çıktısını döndürür
    <div className={`personel-card ${!personel.aktif ? "personel-card-passive" : ""}`}> 
      {/* Personel pasifse ekstra class ekler */}

      <div>
        <div className="personel-card-header">
          <div>
            <h4 className="personel-name">{personel.ad} {personel.soyad}</h4>

            <span className="personel-role">{personel.rol}</span>
          </div>

          <div className="personel-badges-col">
            <button
              onClick={() => aktiflikToggle(personel.id)} // Butona basınca aktif/pasif durumunu değiştirir
              className={`badge-status-btn ${
                personel.aktif ? "badge-status-btn-active" : "badge-status-btn-passive"
              }`}
            >
              {personel.aktif ? "Aktif" : "Pasif"} 
            </button>

            {personel.stajyer && ( // Personel stajyerse etiketi gösterir
              <span className="badge-intern">
                Stajyer
              </span>
            )}
          </div>
        </div>

        <div className="personel-card-info">
          <div><strong>Departman:</strong> {personel.departman}</div>
          <div><strong>E-Posta:</strong> {personel.eposta}</div>
          <div><strong>Telefon:</strong> {personel.telefon || "Belirtilmedi"}</div>
        </div>
      </div>

      <div className="personel-card-actions">
        <button
          onClick={() => duzenle(personel)} // Düzenleme için personel bilgisini forma taşır
          className="btn-edit-personel"
        >
          Düzenle
        </button>

        <button
          onClick={() => sil(personel.id)} // Silinecek personelin id değerini gönderir
          className="btn-delete-personel"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

const PersonelForm = ({ form, setForm, kaydet, duzenlenenId, iptalEt }) => { // Personel form componenti
  const [hatalar, setHatalar] = useState({}); // Form hata mesajlarını state'te tutar

  const handleInputChange = (e) => { // Input değişimlerini yakalayan fonksiyon
    const { name, value, type, checked } = e.target; // Inputtan gerekli değerleri alır
    const guncelDeger = type === "checkbox" ? checked : value; // Checkbox ise checked, değilse value kullanır

    setForm(prev => ({ ...prev, [name]: guncelDeger })); // Form state'ini ilgili input adına göre günceller

    if (hatalar[name]) { // O inputta hata varsa kontrol eder
      setHatalar(prev => ({ ...prev, [name]: "" })); // Yazmaya başlayınca ilgili hatayı temizler
    }
  };

  const formDogrula = () => {
    const yeniHatalar = {};

    if (form.ad.trim().length < 2) yeniHatalar.ad = "Ad en az 2 karakter olmalıdır."; 
    if (form.soyad.trim().length < 2) yeniHatalar.soyad = "Soyad en az 2 karakter olmalıdır."; 
    if (form.rol.trim().length < 2) yeniHatalar.rol = "Rol en az 2 karakter olmalıdır."; 

    if (!form.eposta.includes("@") || form.eposta.trim().length < 5) { 
      yeniHatalar.eposta = "Geçerli bir e-posta giriniz.";
    }

    setHatalar(yeniHatalar); // Hataları state'e kaydeder
    return Object.keys(yeniHatalar).length === 0; // Hata yoksa true döndürür
  };

  const handleFormSubmit = (e) => { // Form submit fonksiyonu
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    if (formDogrula()) { // eğer form doğruysa
      kaydet();
      setHatalar({}); // Hataları temizler
    }
  };

  return (
    <div className="demo-card demo-card-3xl p-5 sticky top-4">
      <h4 className="card-title-bordered">
        {duzenlenenId ? "Personel Bilgilerini Düzenle" : "Yeni Personel Ekle"}
        {/* Düzenleme varsa başlığı değiştirir */}
      </h4>

      <form onSubmit={handleFormSubmit} className="space-y-3">
        {/* Form gönderilince handleFormSubmit çalışır */}

        <div className="demo-grid-2">
          <div>
            <label className="demo-label">Ad:</label>
            <input
              type="text"
              name="ad"
              value={form.ad} // Ad inputunu form state'ine bağlar
              onChange={handleInputChange} // Değişince form state'ini günceller
              className={`demo-input ${hatalar.ad ? "demo-input-error" : ""}`} // Hata varsa hata classı ekler
            />
            {hatalar.ad && <p className="demo-error-text">{hatalar.ad}</p>}
            {/* Ad hatası varsa ekrana basar */}
          </div>

          <div>
            <label className="demo-label">Soyad:</label>
            <input
              type="text"
              name="soyad"
              value={form.soyad} // Soyad inputunu form state'ine bağlar
              onChange={handleInputChange} // Değişince form state'ini günceller
              className={`demo-input ${hatalar.soyad ? "demo-input-error" : ""}`} // Hata varsa class ekler
            />
            {hatalar.soyad && <p className="demo-error-text">{hatalar.soyad}</p>}
            {/* Soyad hatası varsa gösterir */}
          </div>
        </div>

        <div>
          <label className="demo-label">Rol / Unvan:</label>
          <input
            type="text"
            name="rol"
            value={form.rol} // Rol inputunu state'e bağlar
            onChange={handleInputChange} // Değişince state'i günceller
            placeholder="Örn: Jr. Full Stack Developer"
            className={`demo-input ${hatalar.rol ? "demo-input-error" : ""}`} // Hata varsa class ekler
          />
          {hatalar.rol && <p className="demo-error-text">{hatalar.rol}</p>}
          {/* Rol hatasını gösterir */}
        </div>

        <div>
          <label className="demo-label">Departman:</label>
          <select
            name="departman"
            value={form.departman} // Select değerini form state'ine bağlar
            onChange={handleInputChange} // Değişince state'i günceller
            className="demo-select"
          >
            <option value="Yazılım">Yazılım</option>
            <option value="Tasarım">Tasarım</option>
            <option value="Yönetim">Yönetim</option>
            <option value="Pazarlama">Pazarlama</option>
            <option value="İnsan Kaynakları">İnsan Kaynakları</option>
          </select>
        </div>

        <div>
          <label className="demo-label">E-Posta:</label>
          <input
            type="email"
            name="eposta"
            value={form.eposta} // E-posta inputunu state'e bağlar
            onChange={handleInputChange} // Değişince state'i günceller
            placeholder="ad.soyad@sirket.com"
            className={`demo-input ${hatalar.eposta ? "demo-input-error" : ""}`} // Hata varsa class ekler
          />
          {hatalar.eposta && <p className="demo-error-text">{hatalar.eposta}</p>}
          {/* E-posta hatasını gösterir */}
        </div>

        <div>
          <label className="demo-label">Telefon:</label>
          <input
            type="text"
            name="telefon"
            value={form.telefon} // Telefon inputunu state'e bağlar
            onChange={handleInputChange} // Değişince state'i günceller
            placeholder="+90 5XX XXX XX XX"
            className="demo-input"
          />
        </div>

        <div className="demo-checkbox-group">
          <label className="demo-filter-checkbox-label">
            <input
              type="checkbox"
              name="aktif"
              checked={form.aktif} // Aktif checkbox değerini state'e bağlar
              onChange={handleInputChange} // Değişince state'i günceller
              className="todo-checkbox"
            />
            Aktif Çalışan
          </label>

          <label className="demo-filter-checkbox-label">
            <input
              type="checkbox"
              name="stajyer"
              checked={form.stajyer} // Stajyer checkbox değerini state'e bağlar
              onChange={handleInputChange} // Değişince state'i günceller
              className="todo-checkbox"
            />
            Stajyer
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          {duzenlenenId && ( // Düzenleme modundaysa Vazgeç butonunu gösterir
            <button
              type="button"
              onClick={iptalEt} // Düzenlemeyi iptal eder
              className="btn-cancel-form"
            >
              Vazgeç
            </button>
          )}

          <button
            type="submit" // Formu submit eder
            className="btn-submit-form"
          >
            {duzenlenenId ? "Güncellemeyi Kaydet" : "Personel Kaydet"}
            {/* Düzenleme durumuna göre buton yazısını değiştirir */}
          </button>
        </div>
      </form>
    </div>
  );
};

const yedekPersoneller = [ // Fetch başarısız olursa kullanılacak yedek veri
  { id: 1, ad: "Görkem", soyad: "Kara", rol: "Team Leader", departman: "Yazılım", aktif: true, eposta: "gorkem.kara@sirket.com", telefon: "+90 533 123 4567", stajyer: false },
  { id: 2, ad: "Melis", soyad: "Kurt", rol: "Product Designer", departman: "Tasarım", aktif: true, eposta: "melis.kurt@sirket.com", telefon: "+90 535 765 4321", stajyer: false }
];

const Demo11Project = () => { // Ana component başlatılır
  const [personeller, setPersoneller] = useState([]); // Personel listesini state'te tutar
  const [loading, setLoading] = useState(true); // Yüklenme durumunu state'te tutar

  const [aramaMetni, setAramaMetni] = useState(""); // Arama metnini state'te tutar
  const [seciliDepartman, setSeciliDepartman] = useState("Tümü"); // Seçili departmanı state'te tutar
  const [sadeceAktif, setSadeceAktif] = useState(false); // Aktif filtresini state'te tutar
  const [sadeceStajyer, setSadeceStajyer] = useState(false); // Stajyer filtresini state'te tutar

  const [form, setForm] = useState({ // Form verilerini nesne state olarak tutar
    ad: "",
    soyad: "",
    rol: "",
    departman: "Yazılım",
    eposta: "",
    telefon: "",
    aktif: true,
    stajyer: false
  });

  const [duzenlenenId, setDuzenlenenId] = useState(null); // Düzenlenen personelin id değerini tutar

  useEffect(() => { // Component ilk açıldığında veri çekmek için çalışır
    fetch("/personeller.json") // JSON dosyasından personel verisini ister
      .then(res => { // Fetch cevabını işler then asenkron işlemi başarılıysa çalışr
        if (!res.ok) throw new Error("JSON veri alınamadı."); // Hata varsa yakalamaya gönderir
        return res.json(); // Cevabı JSON'a çevirir
      })
      .then(data => { // JSON verisi geldikten sonra çalışır
        setPersoneller(data); // Gelen veriyi personeller state'ine koyar
        setLoading(false); // Yüklenmeyi kapatır
      })
      .catch(err => { // Fetch hatası olursa çalışır
        console.warn("JSON fetch hatası, yedek liste yüklendi:", err.message);
        setPersoneller(yedekPersoneller); // Yedek personelleri state'e koyar
        setLoading(false); // Yüklenmeyi kapatır
      });
  }, []); // Boş dependency array: sadece ilk renderda çalışır

  const personelKaydet = () => { // Personel ekleme veya güncelleme fonksiyonu
    if (duzenlenenId) { // Düzenleme modunda mı kontrol eder
      setPersoneller(
        personeller.map(p => p.id === duzenlenenId ? { ...form, id: duzenlenenId } : p)
      ); // Aynı id'li personeli form verisiyle günceller

      setDuzenlenenId(null); // Düzenleme modunu kapatır
    } else {
      const yeni = { // Yeni personel nesnesi oluşturur
        ...form, // Formdaki tüm alanları yeni nesneye kopyalar
        id: Date.now() // Yeni personel için id üretir
      };

      setPersoneller([...personeller, yeni]); // Yeni personeli listeye ekler
    }

    setForm({ // Formu temizler
      ad: "",
      soyad: "",
      rol: "",
      departman: "Yazılım",
      eposta: "",
      telefon: "",
      aktif: true,
      stajyer: false
    });
  };

  const personelSil = (id) => { // Personel silme fonksiyonu
    if (window.confirm("Bu personeli silmek istediğinize emin misiniz?")) { // Silme onayı ister
      setPersoneller(personeller.filter(p => p.id !== id)); // İlgili id dışındaki personelleri bırakır

      if (duzenlenenId === id) { // Silinen kişi düzenleniyorsa kontrol eder
        setDuzenlenenId(null); // Düzenleme modunu kapatır

        setForm({ // Formu temizler
          ad: "",
          soyad: "",
          rol: "",
          departman: "Yazılım",
          eposta: "",
          telefon: "",
          aktif: true,
          stajyer: false
        });
      }
    }
  };

  const personelDuzenleYukle = (p) => { // Düzenlenecek personeli forma yükler
    setDuzenlenenId(p.id); // Düzenlenen kişinin id değerini kaydeder
    setForm(p); // Personel bilgilerini forma aktarır
  };

  const duzenlemeIptal = () => { // Düzenlemeyi iptal eden fonksiyon
    setDuzenlenenId(null); // Düzenleme modunu kapatır

    setForm({ // Formu sıfırlar
      ad: "",
      soyad: "",
      rol: "",
      departman: "Yazılım",
      eposta: "",
      telefon: "",
      aktif: true,
      stajyer: false
    });
  };

  const personelAktiflikToggle = (id) => { // Aktif/pasif değiştirme fonksiyonu
    setPersoneller(
      personeller.map(p => p.id === id ? { ...p, aktif: !p.aktif } : p)
    ); // İlgili personelin aktif değerini tersine çevirir
  };

  const filtrelenmisPersoneller = personeller.filter(p => { // Filtrelenmiş listeyi oluşturur
    const adSoyadRol = `${p.ad} ${p.soyad} ${p.rol}`.toLowerCase(); // Aranacak alanları küçük harfe çevirir
    const aramaEslesiyor = adSoyadRol.includes(aramaMetni.toLowerCase()); // Arama metniyle eşleşme kontrolü yapar

    const departmanEslesiyor = seciliDepartman === "Tümü" || p.departman === seciliDepartman; // Departman filtresi
    const aktifEslesiyor = !sadeceAktif || p.aktif; // Aktif filtresi
    const stajyerEslesiyor = !sadeceStajyer || p.stajyer; // Stajyer filtresi

    return aramaEslesiyor && departmanEslesiyor && aktifEslesiyor && stajyerEslesiyor; // Tüm şartları sağlayanları döndürür
  });

  if (loading) { // Veri yükleniyorsa kontrol eder
    return <div className="loading-indicator">Personel verileri yükleniyor...</div>; // Yüklenme ekranı gösterir
  }

  return ( // Ana JSX çıktısını döndürür
    <div className="p-4">
      <h3 className="demo-title">Demo 11: Personel Kayıt ve Yönetim Paneli</h3>

      <p className="demo-desc">
        Bu kapsamlı gün sonu projesinde: <code>useState</code> ile nesne ve dizi yönetimi, kontrollü form girdileri, form doğrulama, dinamik arama, filtreleme, ekleme, silme ve düzenleme özelliklerini tek bir yapıda uyguluyoruz.
      </p>

      <div className="mt-6">
        <PersonelFiltre
          aramaMetni={aramaMetni} // Arama state'ini filtre componentine gönderir
          setAramaMetni={setAramaMetni} // Arama güncelleme fonksiyonunu gönderir
          seciliDepartman={seciliDepartman} // Departman state'ini gönderir
          setSeciliDepartman={setSeciliDepartman} // Departman güncelleme fonksiyonunu gönderir
          sadeceAktif={sadeceAktif} // Aktif filtresini gönderir
          setSadeceAktif={setSadeceAktif} // Aktif filtresi güncelleme fonksiyonunu gönderir
          sadeceStajyer={sadeceStajyer} // Stajyer filtresini gönderir
          setSadeceStajyer={setSadeceStajyer} // Stajyer filtresi güncelleme fonksiyonunu gönderir
        />
      </div>

      <div className="project-layout-grid">
        <div>
          <PersonelForm
            form={form} // Form state'ini forma gönderir
            setForm={setForm} // Formu güncelleyen fonksiyonu gönderir
            kaydet={personelKaydet} // Kaydetme fonksiyonunu gönderir
            duzenlenenId={duzenlenenId} // Düzenleme durumunu gönderir
            iptalEt={duzenlemeIptal} // İptal fonksiyonunu gönderir
          />
        </div>

        <div className="space-y-4">
          <h3 className="card-title-bordered">
            Kayıtlı Personel Listesi ({filtrelenmisPersoneller.length})
            {/* Filtrelenmiş personel sayısını gösterir */}
          </h3>

          {filtrelenmisPersoneller.length === 0 ? ( // Liste boşsa kontrol eder
            <div className="empty-state-card">
              Eşleşen personel kaydı bulunamadı.
            </div>
          ) : (
            <div className="product-grid">
              {filtrelenmisPersoneller.map(p => ( // Filtrelenmiş personelleri kartlara dönüştürür
                <PersonelKart
                  key={p.id} // React'in liste elemanlarını ayırt etmesini sağlar
                  personel={p} // Personel bilgisini karta gönderir
                  sil={personelSil} // Silme fonksiyonunu karta gönderir
                  duzenle={personelDuzenleYukle} // Düzenleme fonksiyonunu karta gönderir
                  aktiflikToggle={personelAktiflikToggle} // Aktiflik değiştirme fonksiyonunu gönderir
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo11Project; // Componenti dışa aktarır