import React from "react";
import { Link } from "react-router-dom";
import products from "./constants/carruselProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";

// Importa los estilos del swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./css/featured.css";

const FeaturedTechnology = () => {
  return (
    <>
      <div className="featured-container">
        <h3 className="featured-title">Lo mas vendido en tecnología</h3>
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={1} // Separacion entre slides
          slidesPerView={1.5} // Cantidad de visializacion
          centeredSlides={false}
          direction="horizontal" // Direccion de desplazamiento
          touchEventsTarget="container"
          touchRatio={1} // Sensibilidad del gesto tatil
          touchAngle={45} // Angulo maximo para reconocer el gesto
          simulateTouch={true}
          touchStartPreventDefault={false}
          mousewheel={{forceToAxis: true, // Evita que el scroll vertical afecte el carrusel
            sensitivity: 0.5, //Reduce la sensibilidad del scroll
            thresholdDelta: 20, //Controla cuanto movimiento es necesario para cambiar el slide
          }}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={true}
          className="featured-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="featured-slide">
              <div className="featured-content">
                <Link to={product.url}>
                  <picture className="featured-picture">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="featured-img"
                    />
                  </picture>

                  <div className="featured-text">
                    <p className="featured-brand">{product.marca}</p>

                    <p className="featured-name">{product.name}</p>

                    <p className="featured-price">{product.price}</p>
                  </div>
                </Link>
                <button
                  className="featured-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Agregar al carrito
                  <box-icon
                    name="cart-add"
                    class="fill-current text-color-secundario"
                  ></box-icon>
                </button>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </>
  );
};

export default FeaturedTechnology;
