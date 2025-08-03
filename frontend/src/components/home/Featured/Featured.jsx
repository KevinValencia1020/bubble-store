import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import styleGlobal from "../../../styles/global.module.css";
import styleFeatured from "./featured.module.css";

// Importa los estilos del swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Featured = ({ title, products}) => {
  return (
    <>
      <div className="featured-container w-full h-auto my-5 mx-auto">
        <h3 className={`featured-title ${styleGlobal.containerContent} font-medium`}>{title}</h3>

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
          className={`${styleFeatured.featuredSwiper} w-full h-auto my-0 mx-auto`}>

          {products.map((product) => (

            <SwiperSlide key={product.id} className="featured-slide w-full my-0 mx-auto py-3">

              <div className={`featured-content ${styleGlobal.containerContent} rounded-xl shadow-lg py-4`}>

                <picture className={`featured-picture ${styleGlobal.containerContent} bg-center`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="featured-img block w-full h-full"
                  />
                </picture>

                <div className={`featured-text ${styleGlobal.containerContent} py-3 flex flex-col justify-between gap-2`}>
                  <p className="featured-brand text-gray-500">{product.marca}</p>

                  <p className="featured-name whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{product.name}</p>

                  <p className="featured-price text-green-700">
                    {"$ "}
                    {new Intl.NumberFormat('es-CO').format(product.price)}
                  </p>
                </div>

                <button
                  className={`featured-btn ${styleGlobal.containerContent} flex justify-center items-center py-2 px-1 mt-4 gap-2 rounded-xl bg-color-primario text-color-secundario text-sm`}
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
