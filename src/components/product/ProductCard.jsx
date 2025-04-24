import { IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Componente que renderiza una tarjeta individual de producto
export default function ProductCard ({ id, name, price, image, brand, onAddToCart }) {

  return (
    <div className="product-card">

      <img src={image} alt={name} className="product-card__image" />

      <span className="product-card__brand">
        {brand}
      </span>

      <h3 className="product-card__name">
        {name}
      </h3>

      <p className="product-card__price">
        ${price}
      </p>

      {/* Boton para añadir al carrito */}
      <IconButton
        className="product-card__button bg-color-primario"
        onClick={() => onAddToCart(id)}
      >
        <AddShoppingCartIcon fontSize="large" className="text-color-secundario" />
        
      </IconButton>

    </div>
  );
}