import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from 'next/link';
import { formatCurrency } from '@/utils/money';

// Componente que renderiza una tarjeta individual de producto
export default function ProductCard({ id, name, price, image, brand, onAddToCart, link }) {
  return (
    <>
  <div className="border relative rounded-xl my-4 h-[370px] flex flex-col justify-between">

        <span className="product-card__brand absolute -top-4 left-2 z-10 bg-white border border-color-primario rounded-md text-color-primario font-bold text-gray-500 px-2 py-[2px]"
        >
          {brand}
        </span>
  <div className="product-card w-[90%] mx-auto my-1">

          <Link href={link} className="block group">
            <div className="h-[200px] my-5 mx-auto overflow-hidden rounded-lg flex items-center justify-center w-full">
              <img src={image} alt={name} className="product-card__image block h-[200px] object-contain group-hover:scale-105 transition" />
            </div>
            <h3 className="product-card__name line-clamp-2 group-hover:text-color-primario transition">{name}</h3>
            <p className="product-card__price font-semibold mt-1 text-base leading-snug break-words">{formatCurrency(price)}</p>
          </Link>

          {/* Boton para añadir al carrito */}

          <div className="flex justify-end mt-2">

            <IconButton
              className="product-card__button !bg-color-primario"
              sx={{borderRadius: "10px", width: 50, height: 48}}
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); onAddToCart(id); }}
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