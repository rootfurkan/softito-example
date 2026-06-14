import { useState } from "react"
import SearchFilter from "./components/SearchFilter"
import ProductList from "./components/ProductList"
import Cart from "./components/Cart"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tümü")

  return (
    <div className="flex gap-4 p-6">
      <div className="flex-1">
        <SearchFilter //state leri okumak ve güncellemek için kullanıyorum o yüzden hem değerleri hem fonksiyonları prop olarak geçtim (Setter)
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <ProductList searchTerm={searchTerm} activeCategory={activeCategory} />
      </div>
      <div className="w-72 border border-gray-300 rounded p-4">
          <Cart />
      </div>
    </div>
  )
}

export default App