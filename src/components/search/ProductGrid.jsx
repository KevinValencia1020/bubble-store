import ProductCard from "./ProductCard";
import Link from "next/link";

// Componente que renderiza una cuadrícula de productos
// Recibe una lista de productos como prop y los muestra en una cuadrícula
export default function ProductGrid({ products }) {

  return (

    <>
      <div className="product-grid w-[90%] mx-auto my-5">

        {/* Itera sobre los productos y renderiza una tarjeta para cada uno */}
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (

            <li key={product.id}>

              <Link href={`/product/${encodeURIComponent(product.id)}`}>

              <ProductCard 
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                brand={product.brand}
                onAddToCart={product.onAddToCart} // funcion para añadir al carrito
              />
              </Link>

            </li>
          ))}
        </ul>
      </div>
    </>
  );
}