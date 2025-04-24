import ProductCard from "./ProductCard";

// Componente que renderiza una cuadrícula de productos
// Recibe una lista de productos como prop y los muestra en una cuadrícula
export default function ProductGrid({ products }) {

  return (

    <>
      <div className="product-grid">

        {/* Itera sobre los productos y renderiza una tarjeta para cada uno */}
        {products.map((product) => (
          
          <ProductCard

            key={product.id} // clave unica para cada producto
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            brand={product.brand}
            onAddToCart={product.onAddToCart} // funcion para añadir al carrito

          />
        ))}
      </div>
    </>
  );
}