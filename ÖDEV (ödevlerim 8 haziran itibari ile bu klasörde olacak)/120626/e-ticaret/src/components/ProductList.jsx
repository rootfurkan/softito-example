import React from "react"
import products from "../products"

const ProductList = ({ searchTerm, activeCategory }) => { // app.jsx den 2 prop aldım kullanıcının inputa yazdığı metin ve aktif kategori
const filtered = products
  .filter(p => activeCategory === "Tümü" || p.kategori === activeCategory) //kategori bazlı filtreleme
  .filter(p => p.ad.toLowerCase().includes(searchTerm.toLowerCase())) // kullanıcının girdiği arama terimini küçük harfe çevirip ürünleri arıyor

  return (
    <div className="flex flex-col gap-4">
      {filtered.map(p => ( //filtreden gelen ürünü döndürüyor
        <div key={p.id} className="border border-gray-300 rounded p-4">
          <h3 className="font-bold">{p.ad}</h3>
          <p className="text-gray-500">Kategori: {p.kategori}</p>
          <p className="text-blue-500 font-bold">Fiyat: {p.fiyat} TL</p>
          <p className="text-sm text-gray-400">Stok: {p.stok} adet</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Sepete Ekle</button>
        </div>
      ))}
    </div>
  )
}

export default ProductList