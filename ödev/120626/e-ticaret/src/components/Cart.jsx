import React from 'react'

const Cart = () => {
  const cartItems = [
    { id: 1, ad: "Televizyon", fiyat: 25000, adet: 1 },
    { id: 2, ad: "Saat", fiyat: 6000, adet: 2 }, //brada örnek için 2 adet dzii olışturdum statik 
  ]


  return (
    <div className="border border-gray-300 rounded p-4 w-72">
      <h3 className="font-bold text-lg mb-4">Sepet</h3>
      {cartItems.map(item => (
        <div key={item.id} className="mb-3 border-b pb-2">
          <p className="font-bold">{item.ad}</p>
          <p className="text-gray-500 text-sm">{item.fiyat} TL</p>
          <div className="flex items-center gap-2 mt-1">
            <button className="bg-gray-200 px-2 rounded">-</button>
            <span>{item.adet}</span>
            <button className="bg-gray-200 px-2 rounded">+</button>
            <button className="bg-red-500 text-white px-2 rounded ml-auto">Sil</button>
          </div>
        </div>
      ))}
      <p className="font-bold mt-4">Toplam: 31.000 TL</p>
      <div className="flex gap-2 mt-4">
        <button className="bg-gray-200 px-4 py-1 rounded">Temizle</button>
        <button className="bg-green-500 text-white px-4 py-1 rounded">Satın Al</button>
      </div>
    </div>
  )
}

export default Cart