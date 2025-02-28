import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";

// Importa los estilos del swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/featured.css";

const Featured = ({ title, products}) => {
  return (
    <>
      <div className="featured-container">
        <h3 className="featured-title">{title}</h3>
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
          mousewheel={{
            forceToAxis: true, // Evita que el scroll vertical afecte el carrusel
            sensitivity: 0.5, //Reduce la sensibilidad del scroll
            thresholdDelta: 10, //Controla cuanto movimiento es necesario para cambiar el slide
          }}
          pagination={{ clickable: true, enabled: true }}
          navigation={true}
          // Activa observer para que Swiper reevalúe los breakpoints
          observer={true}
          observeParents={true}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              pagination: { enabled: false },
              navigation: { enabled: false },
            },
            768: {
              slidesPerView: 3,
              pagination: { enabled: false },
              navigation: { enabled: false },
            },
            1024: {
              slidesPerView: 4,
              pagination: { clickable: true, enabled: true },
              navigation: { enabled: true },
            },
          }}
          className="featured-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="featured-slide">
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

                  <p className="featured-price">
                    {" "}
                    $ {product.price.toLocaleString()}
                  </p>
                </div>
                <button
                  className="featured-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  Agregar
                  <box-icon
                    name="cart-add"
                    class="fill-current text-color-secundario"
                  ></box-icon>
                </button>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </>
  );
};

export default Featured;
