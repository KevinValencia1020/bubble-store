"use client";
import React from "react";
import CarruselHome from "./CarruselHome";
import Featured from "@/components/Featured";
import MixCategories from "./MixCategories";
import featuredTech from "@/constants/carruselProduct";
import BannerGrid from "./BannerGrid";
import SectionBrands from "./SectionBrands";
import "../styles/homePage.css";


const Home = () => {

  return(
    <>
      <div className="home-main">
        <CarruselHome/>

        <div className="home-banner__container">
          <img src="/images/banner/Banner Envio Gratis.png" alt="" className="home-banner__img" />
        </div>

        <Featured title={"Lo más vendido en tecnología"} products={featuredTech}/>

        <div className="home-washing__container">
          <img src="https://i.pinimg.com/736x/cf/7e/ef/cf7eef746b385dac749ad8f7815b7c4c.jpg" alt="" className="home-img__washing" />
        </div>
        
        <MixCategories/>

        <div className="banner-earphones">
          <img src="https://i.imgur.com/BDGrblR.jpg" alt="" className="banner-earphones__img" />
        </div>

        <div className="banners-promo">
          <img src="https://i.imgur.com/S3vi8c7.png" alt="" className="banners-promo__img images1" />
          <img src="https://i.imgur.com/jt9YzBY.png" alt="" className="banners-promo__img images2" />
          <img src="https://i.imgur.com/fZffTzp.png" alt="" className="banners-promo__img images3" />
          <img src="https://i.imgur.com/stMRpiC.png" alt="" className="banners-promo__img images4" />
        </div>

        <Featured title={"Lo más vendido en tecnología"} products={featuredTech}/>

        <BannerGrid/>

        <SectionBrands/>

        <MixCategories/>

        <section className="payment-method">
          <div className="payment-method__container">
            <h3 className="payment-method__tittle">
              Métodos de pago
            </h3>

            <ul className="payment-method__ul">
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

      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit reiciendis debitis molestiae vitae ratione accusantium excepturi est a vero fugit enim quae ut facilis obcaecati incidunt, nostrum quos minima eos.
      Nulla, corrupti hic aspernatur necessitatibus rerum perferendis, corporis sint temporibus dicta reiciendis cum, excepturi sed. Aspernatur quia quos sed magni impedit ullam cumque, minima optio nostrum nobis consequatur repudiandae molestias?
      Neque laboriosam id facere nemo iusto quia laborum accusamus architecto obcaecati ducimus, similique ipsam consequuntur vero quas deleniti libero officiis debitis dolor? Aliquam deleniti neque repellat rem quisquam dignissimos dolor!
      Odio assumenda quisquam at eligendi repellendus beatae, mollitia soluta recusandae voluptas sunt nisi quas culpa illo hic possimus, quam facere distinctio nam tenetur voluptatem fugiat sint saepe dolorem. Amet, ad.
      Sapiente atque corporis blanditiis nihil fugit, officia voluptatum, ab voluptatibus modi consequatur dolorem fugiat odio ad temporibus ipsum mollitia quia cumque placeat voluptatem. Itaque eligendi similique libero dolores sapiente voluptates?
      </div>


    </>
  );

}

export default Home;