"use client";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// Importacion de modulos de Swiper
import { Pagination, Navigation } from "swiper/modules";
import { Swiper , SwiperSlide } from "swiper/react";

export default function ProductDetails({ product }) {

  return (
    <>
      <div className="w-[90%] mx-auto my-5">
        <h3 className="text-xl font-semibold">{product.name}</h3>

        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="product-id__swiper my-5"
        >
          {/* Soporta array o string para product.image
          Si es un array, mapea cada imagen y crea un SwiperSlide 
          Si es una string, crea un solo SwiperSlide */}
          
          {Array.isArray(product.image)
            ? product.image.map((img, index) => (

                <SwiperSlide key={index}>
                  <img src={img} alt={product.name} className="block w-full h-64 object-contain rounded-lg" />
                </SwiperSlide>

              ))

            : product.image
            ? (

                <SwiperSlide>
                  <img src={product.image} alt={product.name} className="block w-full h-64 object-contain rounded-lg" />
                </SwiperSlide>

              )
            : null}
        </Swiper>

        <div className="content__price mt-5">

          <p className="text-slate-600 font-medium">$ {product.price}</p>

        </div>

        <p><strong className="text-green-500" >Envío gratis</strong> a todo el pais</p>

        <div className="content__stock flex flex-col gap-2 my-3">
          <p className="text-sm font-semibold">Stock: {product.stock}</p>

          <button className="bg-color-primario text-color-secundario p-2 border-none outline-none rounded-md" >Comprar ahora</button>

          <button className="border border-color-primario p-2 ne rounded-md">Agregar al carrito</button>
        </div>

        <div className="my-3">

          <span className="font-semibold">Marca</span>
          {/* <img src="" alt="" /> */}

          <p className="text-gray-400 font-semibold italic">{product.brand}</p>
        </div>

        <div className="flex flex-col justify-start gap-3">
          
          <div className="flex flex-row items-center gap-2">
            <UTurnLeftIcon fontSize="small"/>
            <p><strong className="font-medium text-color-primario">Devolucion gratis. </strong>Tienes hasta 30 días desde que lo recibes.</p>
          </div>

          <div className="flex flex-row items-center gap-2">

            <VerifiedUserIcon fontSize="small"/>
            <p><strong className="font-medium text-color-primario">Compra protegida. </strong>Recibí el producto que esperabas o te devolvemos tu dinero.</p>

          </div>

          <div className="flex flex-row items-center gap-2">
            <WorkspacePremiumIcon fontSize="small"/>
            <p>12 meses de garantía de fábrica</p>
          </div>


          <div>
            <p className="font-semibold mb-2">Características del producto</p>
            {product.feature ? (
              Array.isArray(product.feature) ? (
                <ul className="list-disc ml-5">
                  {product.feature.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              ) : typeof product.feature === 'object' ? (
                <ul className="list-disc ml-5">
                  {Object.entries(product.feature).map(([key, value], idx) => (
                    <li key={idx}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">{product.feature}</p>
              )
            ) : (
              <p className="text-gray-400 italic">No hay características registradas.</p>
            )}
          </div>


        </div>
      </div>
    </>
  );

}