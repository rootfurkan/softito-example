export default function CartModal({ cart, onRemove, onUpdateQuantity, onClose }) { //sepet verisi ve kontrol fonksiyonlarını alır
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); //fiyat x adet ile toplamı hesapla

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-96 h-full overflow-y-auto p-6 flex flex-col shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Sepetim <span className="text-red-500">({cart.length})</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl transition-colors">✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-400 mt-8 text-center">Sepetiniz boş</p>
        ) : (
          <>
            <div className="flex flex-col gap-4 flex-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 border-b border-gray-100 pb-4">
                  <img src={item.image} className="w-16 h-16 object-contain rounded-xl bg-gray-50 p-1" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm line-clamp-2">{item.title}</p>
                    <p className="text-red-500 font-bold mt-1">{item.price} TL</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)} //adeti 1 azalt
                        className="product-btn w-7 h-7 text-base"
                      >−</button>
                      <span className="font-bold text-gray-800 w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, +1)} //adeti 1 artır
                        className="product-btn w-7 h-7 text-base"
                      >+</button>
                      <button
                        onClick={() => onRemove(item.id)} //ürünü tamamen kaldır
                        className="ml-auto text-sm font-semibold text-black hover:text-red-500 transition-colors"
                      >Sil</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Toplam</span>
                <span className="text-xl font-bold text-gray-900">{total.toFixed(2)} TL</span>
              </div>
              <button className="form-submit">Siparişi Tamamla</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
