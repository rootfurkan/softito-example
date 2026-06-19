export default function AboutUs() {
  return (
    <>
    <main className="about-container">
        <div className="about-header">
            <span className="about-subtitle">Biz Kimiz?</span>
            <h1>N11 Clone Hakkımızda</h1>
        </div>
        <div className="about-body">
            <p className="about-text">
                N11 Clone, Türkiye'nin lider e-ticaret platformlarından n11'den ilham
                alınarak geliştirilmiş, alıcılar ile satıcıları buluşturan tamamen yenilikçi 
                ve güvenilir bir alışveriş pazaryeri prototipidir.
            </p>
            <div className="about-values-grid">
                <div className="value-card">
                    <h3 className="value title">
                        Güvenilirlik
                    </h3>
                    <p className="value-desc">Ödeme ve veri güvenliğinde en üst düzey standartları benimsiyoruz</p>
                </div>
                <div className="value-card">
                    <h3 className="value title">
                        Yenilikçilik
                    </h3>
                    <p className="value-desc">Modern web teknolojilerini takip ederek sürekli gelişim sağlıyoruz.</p>
                </div>
                <div className="value-card">
                    <h3 className="value title">
                        Kullanıcı Odaklılık
                    </h3>
                    <p className="value-desc">Kullanıcılarımızın geri bildirimlerini dinliyor ve önemsiyoruz</p>
                </div>
            </div>
        </div>
    </main>
    </>
  ); 
}
