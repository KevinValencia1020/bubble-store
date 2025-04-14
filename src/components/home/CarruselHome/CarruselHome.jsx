"use client";
import carruselImages from "@/constants/carruselHome";
import styleCarrusel from "./carruselHome.module.css";

// Importa los componentes de swiper react
import { Swiper, SwiperSlide } from "swiper/react";

// Importa los modulos requeridos del swiper
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Importa los estilos del swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "../styles/carruselHome.css";

const Carrusel = () => {

  return (
    <>
      <div className="w-full h-48 mb-5">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className={`${styleCarrusel.carruselHome} w-full h-full`}
        >
          {carruselImages.map((item, index) => (

            <SwiperSlide key={index} className="carrusel-swiperSlide w-full h-full">

              <img src={item.img} alt="" className="carrusel-img block w-full h-full object-cover" />

            </SwiperSlide>
          ))}
          
        </Swiper>
      </div>
    </>
  );
};

export default Carrusel;
