import ProductCard from "./ProductCard";
// ürünleri maple gezer kaç ürün varsa grid yapısı döner
export default function ProductGrid({products, onAddToCart}) { //onAddToCart'ı alıp her karta ilet
  return (
    <>
      <div className="product-grid">
       {products.map((product)=>(
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart}/> //her karta fonksiyonu geçir
       ))}
      </div>
    </>
  );
}
