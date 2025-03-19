import carruselImages from "@/constants/carruselHome";

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
      <div className="carrusel-container">
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
          className="carrusel-swiper"
        >
          {carruselImages.map((item, index) => (
            <SwiperSlide key={index} className="carrusel-swiperSlide">
              <img src={item.img} alt="" className="carrusel-img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Carrusel;
