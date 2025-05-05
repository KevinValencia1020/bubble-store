import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Componente que renderiza una tarjeta individual de producto
export default function ProductCard({
  id,
  name,
  price,
  image,
  brand,
  onAddToCart,
}) {
  return (
    <>
      <div className="border relative rounded-xl my-4">

        <span className="product-card__brand absolute -top-4 left-2 z-10 bg-white border border-color-primario rounded-md text-color-primario font-bold text-gray-500 px-2 py-[2px]"
        >
          {brand}
        </span>
        <div className="product-card w-[90%] mx-auto my-0 relative flex flex-col gap-2">
          <img src={image} alt={name} className="product-card__image" />


          <h3 className="product-card__name">{name}</h3>

          <p className="product-card__price">${price}</p>

          {/* Boton para añadir al carrito */}
          <IconButton
            className="product-card__button !bg-color-primario flex flex-col items-center justify-center gap-1 absolute bottom-1 left-[80%] px-2"
            sx={{borderRadius: "10px", width: 50, height: 48}}
            onClick={() => onAddToCart(id)}
          >
            <AddShoppingCartIcon
              fontSize="medium"
              sx={{ color: "var(--color-secundary)" }}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}