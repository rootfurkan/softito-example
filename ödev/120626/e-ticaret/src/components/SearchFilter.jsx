import React from 'react'

const SearchFilter = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) => { //app.jsx den gelen 4 propu parametre olarak aldım
  const categories = ["Tümü", "Elektronik", "Mutfak", "Ev Tekstili", "Aksesuar", "Sağlık"] // kategorileri tek tek yazmak yerine diziye alıp maple döndüm

  return (
    <div className="bg-white border border-gray-300 rounded p-5 mb-4">
      <h3 className="text-lg font-bold mb-4">Ürün Ara ve Filtrele</h3>
      <input
        className="w-full bg-gray-100 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)} //buradaki input state deki değeri gösterir inputa bir şey yazılınca setsearchterm state i ile güncellenir ve value ye aktarılır
        placeholder="Ürün adı ara..."
      />
      <div className="mt-4 flex gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? "bg-blue-500 text-white px-4 py-1 rounded" : "bg-gray-100 px-4 py-1 border border-gray-300 rounded"}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchFilter