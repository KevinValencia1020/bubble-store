"use client";
import { useEffect } from "react";
import styleHome from "../home/home.module.css";

import CarruselHome from "../../../components/home/CarruselHome/CarruselHome";
import Featured from "@/components/home/Featured/Featured";
import MixCategories from "../../../components/home/MixCategories/MixCategories";
import featuredTech from "@/constants/carruselProduct";
import BannerGrid from "../../../components/home/BannerGrid/BannerGrid";
import SectionBrands from "../../../components/common/SearchBrands/SectionBrands";

const Home = () => {
  
  useEffect(() => {

    const bannersPromoPicture = document.querySelectorAll(".banners-promo__picture");

    const addClassBannerPromoPicture = ["rounded-xl", "overflow-hidden", "object-cover"];

    bannersPromoPicture.forEach(element => {
      const currentClass = element.className.split(" ");

      if(!currentClass.includes(...addClassBannerPromoPicture)) {

        element.className += " " + addClassBannerPromoPicture.join(" ");
      }
    })

    // Recupero todos los banners promocionales
    const bannersPromoImg = document.querySelectorAll(".banners-promo__img");

    // Defino las clases de tailwind para los banners promocionales
    const addClassBannerPromoImg = ["block", "w-full", "h-full"];

    // Recorro cada banner promocional y le agrego las clases de tailwind
    bannersPromoImg.forEach(element => {

      // Obtengo las clases actuales del elemento
      const currentClass = element.className.split(" ");

      // si no incluyen las clases de tailwind, las agrego
      if(!currentClass.includes(...addClassBannerPromoImg)){

      element.className += " " + addClassBannerPromoImg.join(" ");
      }
    });

    // Recupero todos los elementos con la clase "payment-method__img" y le agrego las clases de tailwind
    const paymentMethodImg = document.querySelectorAll(".payment-method__img");
    const addClassPaymentMethod = ["block", "w-full", "h-full", "overflow-hidden", "object-cover"];

    paymentMethodImg.forEach(element => {

      const currentClass = element.className.split(" ");

      if(!currentClass.includes(...addClassPaymentMethod)){
        element.className += " " + addClassPaymentMethod.join(" ");
      }
    });

  }, []);

  return(
    <>
      <main className="home-main pb-2">
        <CarruselHome/>

        <div className="home-banner__container w-[90%] max-h-56 my-3 mx-auto rounded-xl overflow-hidden">
          
          <img src="/images/banner/Banner Envio Gratis.png" alt="Banner envio gratis" className="home-banner__img block w-full h-full" />
        </div>

        <Featured title={"Lo más vendido en tecnología"} products={featuredTech}/>

        <div className="home-washing__container w-[90%] max-h-max my-3 mx-auto rounded-xl overflow-hidden">

          <img src="https://i.pinimg.com/736x/cf/7e/ef/cf7eef746b385dac749ad8f7815b7c4c.jpg" alt="" className="home-img__washing block w-full h-full object-cover bg-center" />
        </div>
        
        <MixCategories/>

        <div className="banner-earphones w-[90%] max-h-max my-3 mx-auto rounded-lg overflow-hidden">

          

        </div>

        <div className="banners-promo grid grid-cols-2 gap-4 w-[90%] max-h-max y-3 mx-auto">
          <picture className="banners-promo__picture col-span-2 row-span-1 rounded-xl overflow-hidden">

            <img src="https://i.imgur.com/BDGrblR.jpg" alt="Banner" className="banners-promo__img" />
          </picture>

          <picture className="banners-promo__picture">

            <img src="https://i.imgur.com/S3vi8c7.png" alt="Banner" className="banners-promo__img" />
          </picture>

          <picture className="banners-promo__picture">

            <img src="https://i.imgur.com/jt9YzBY.png" alt="Banner" className="banners-promo__img" />
          </picture>

          <picture className="banners-promo__picture">
            <img src="https://i.imgur.com/fZffTzp.png" alt="Banner" className="banners-promo__img" />
          </picture>

          <picture className="banners-promo__picture">
            <img src="https://i.imgur.com/stMRpiC.png" alt="Banner" className="banners-promo__img" />
          </picture>

        </div>

        <Featured title={"Lo más vendido en tecnología"} products={featuredTech}/>

        <BannerGrid/>

        <SectionBrands/>

        <MixCategories/>

        <section className="payment-method">
          <div className="payment-method__container w-[90%] my-3 mx-auto">
            <h3 className="payment-method__tittle text-center text-lg font-bold text-color-texto">
              Métodos de pago
            </h3>

            <ul className={`payment-method__ul ${styleHome.paymentMethod__ul}`}>

              <li className="payment-method__li">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="" className="payment-method__img"/>
              </li>
              <li className="payment-method__li">
                <img src="https://static.vecteezy.com/system/resources/previews/020/336/392/non_2x/visa-logo-visa-icon-free-free-vector.jpg" alt="" className="payment-method__img"/>
              </li>
              <li className="payment-method__li">
                <img src="https://cdn-icons-png.flaticon.com/256/825/825539.png" alt="" className="payment-method__img"/>
              </li>
            </ul>
          </div>
        </section>

      </main>

    </>
  );

}

export default Home;