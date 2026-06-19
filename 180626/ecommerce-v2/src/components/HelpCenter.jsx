export default function HelpCenter() {
  return (
    <>
        <main className="help-container">
            <div className="faq-section">
                <h2 className="form-title">Sıkça Sorulan Sorular</h2>
                <div className="faq-card">
                    <div className="faq-question">
                        <span>Siparişim ne zaman kargolanır?</span>
                        <span className="text-gray-400">+</span>
                    </div>
                    <p className="faq-answer">
                        Satıcılarımız siparişlerinizi genellikle 24 saat içerisinde
                        kargoya teslim eder. Kargo takip bilgileriniz e-posta adresinize
                        gönderilir. Ayrıca sitemizdeki kargo takip bölümünden de kargonuzu takip
                        edebilirsiniz.
                    </p>
                    <div className="faq-question">
                        <span>Siparişim ne zaman kargolanır?</span>
                        <span className="text-gray-400">+</span>
                    </div>
                    <p className="faq-answer">
                        Satıcılarımız siparişlerinizi genellikle 24 saat içerisinde
                        kargoya teslim eder. Kargo takip bilgileriniz e-posta adresinize
                        gönderilir. Ayrıca sitemizdeki kargo takip bölümünden de kargonuzu takip
                        edebilirsiniz.
                    </p>
                    <div className="faq-question">
                        <span>Siparişim ne zaman kargolanır?</span>
                        <span className="text-gray-400">+</span>
                    </div>
                    <p className="faq-answer">
                        Satıcılarımız siparişlerinizi genellikle 24 saat içerisinde
                        kargoya teslim eder. Kargo takip bilgileriniz e-posta adresinize
                        gönderilir. Ayrıca sitemizdeki kargo takip bölümünden de kargonuzu takip
                        edebilirsiniz.
                    </p>
                </div>
            </div>
            <div className="support-section">
                <h2 className="form-title">Destek Talebi Oluştur</h2>
                <form>
                    <div className="form-group">
                        <label className="form-label">Adınız Soyadınız</label>
                        <input type="text" className="form-input" placeholder="Örn. Ahmet Yılmaz" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">E-posta Adresiniz</label>
                        <input type="email" className="form-input" placeholder="user@demo.com" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Mesajınız</label>
                        <textarea className="form-textarea" placeholder="Talebinizi buraya detaylıca yazınız.."/>
                    </div>
                    <button type="submit" className="form-submit">
                        Talebi Gönder
                    </button>
                </form>
            </div>
        </main>
    </>
  )
}
