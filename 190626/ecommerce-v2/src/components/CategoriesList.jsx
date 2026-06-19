export default function CategoriesList({
  categories = [],
  products = [],
  onCategoryClick,
}) {
  const categoriesWithCount = categories
    .filter((category) => category !== "Tümü")
    .map((category) => ({
      name: category,
      count: products.filter(
        (product) => product.category === category
      ).length,
    }));

  return (
    <main className="container">
      <div className="container-header">
        <h1 className="page-title">Tüm Kategoriler</h1>
        <p className="page-subtitle">
          Bir kategori seçerek ürünleri görüntüleyin.
        </p>
      </div>

      {categoriesWithCount.length === 0 ? (
        <div className="empty-state">
          <p>Henüz kategori bulunmuyor.</p>
        </div>
      ) : (
        <div className="categories-grid">
          {categoriesWithCount.map((category) => (
            <div
              key={category.name}
              className="category-card"
              onClick={() =>
                onCategoryClick?.(category.name)
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" ||
                  e.key === " "
                ) {
                  onCategoryClick?.(category.name);
                }
              }}
            >
              <div className="category-icon-box">
                <span>
                  {category.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <h3 className="category-name">
                {category.name}
              </h3>

              <span className="category-count">
                {category.count} Ürün
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}