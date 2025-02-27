"use client";
import React from "react";
import CarruselHome from "./CarruselHome";
import FeaturedTechnology from "../components/Featured";
import mixCategories from "../constants/mixCateg";
import "../styles/homePage.css";


const Home = () => {

  return(
    <>
      <div className="home-main">
        <CarruselHome/>

        <div className="home-banner__container">
          <img src="/images/banner/Banner Envio Gratis.png" alt="" className="home-banner__img" />
        </div>

        <FeaturedTechnology/>

        <div className="home-washing__container">
          <img src="https://i.pinimg.com/736x/cf/7e/ef/cf7eef746b385dac749ad8f7815b7c4c.jpg" alt="" className="home-img__washing" />
        </div>

        <div className="home-categ">
          <ul className="mix-categ">
            
            {mixCategories.map((item, index) => (
              <div key={index} className="mix-categ__container">
                <img src={item.img} alt="" className="mix-categ__img" />
                <p className="mix-categ__name">
                  {item.name}
                </p>
                <box-icon name = "chevron-right" className="mix-categ__icon"></box-icon>
              </div>
            ))}
          </ul>
        </div>

        <div className="banner-earphones">
          <img src="https://i.imgur.com/BDGrblR.jpg" alt="" className="banner-earphones__img" />
        </div>

        <div className="banners-promo">
          <img src="https://i.imgur.com/S3vi8c7.png" alt="" className="banners-promo__img images1" />
          <img src="https://i.imgur.com/jt9YzBY.png" alt="" className="banners-promo__img images2" />
          <img src="https://i.imgur.com/fZffTzp.png" alt="" className="banners-promo__img images3" />
          <img src="https://i.imgur.com/stMRpiC.png" alt="" className="banners-promo__img images4" />
        </div>
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