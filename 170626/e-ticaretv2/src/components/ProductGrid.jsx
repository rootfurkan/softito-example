import ProductCard from "./ProductCard";
// ürünleri maple gezer kaç ürün varsa grid yapısı döner
export default function ProductGrid({products}) {
  return (
    <>
      <div className="product-grid">
       {products.map((product)=>(
        <ProductCard key={product.id} product={product}/>
       ))}
      </div>
    </>
  );
}
