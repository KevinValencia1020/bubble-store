import React from "react";
import { Link } from "react-router-dom";
import products from "./constants/carruselProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

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
          modules={[Navigation, Pagination]}
          spaceBetween={15} // Separacion entre slides
          slidesPerView={1} // Cantidad de visializacion
          direction="horizontal" // Direccion de desplazamiento
          touchEventsTarget="container"
          touchRatio={1} // Sensibilidad del gesto tatil
          touchAngle={45} // Angulo maximo para reconocer el gesto
          simulateTouch={true}
          touchStartPreventDefault={false}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="featured-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="featured-slide">
              <Link to={product.url}>
                <div className="featured-content">
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

                    <button className="featured-btn">
                      Agregar al carrito
                      <box-icon name="cart-add" class="fill-current text-color-secundario"></box-icon>
                    </button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </>
  );
};

export default FeaturedTechnology;
