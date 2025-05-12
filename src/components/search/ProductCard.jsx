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
      <div className="border relative rounded-xl my-4 h-[370px] flex flex-col justify-between">

        <span className="product-card__brand absolute -top-4 left-2 z-10 bg-white border border-color-primario rounded-md text-color-primario font-bold text-gray-500 px-2 py-[2px]"
        >
          {brand}
        </span>
        <div className="product-card w-[90%] mx-auto my-1">

          <div className="h-[200px] my-5 mx-auto overflow-hidden rounded-lg flex items-center justify-center w-full">
          <img src={image} alt={name} className="product-card__image block h-[200px] object-contain" />
          </div>


          <h3 className="product-card__name line-clamp-2">{name}</h3>

          <p className="product-card__price">${price}</p>

          {/* Boton para añadir al carrito */}

          <div className="flex justify-end mt-2">

            <IconButton
              className="product-card__button !bg-color-primario"
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
      </div>
    </>
  );
}