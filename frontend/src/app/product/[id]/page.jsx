"use client";

import { useEffect, useState, use } from "react";
import { getProductById } from "@/utils/api";
import { Skeleton } from "@mui/material";
import ProductDetails from "@/components/product/ProductDetails";

export default function ProductDetailPage({ params }) {
  // Desempaqueta params usando React.use() para compatibilidad futura
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 w-full">
        <div className="p-2">
          <Skeleton variant="text" width="90%" height={30} animation="wave" />
          <Skeleton variant="rectangular" width="100%" height={160} className="rounded-xl" animation="wave" />
          <Skeleton variant="text" width="80%" height={30} animation="wave" />
          <Skeleton variant="text" width="60%" height={30} animation="wave" />
        </div>
      </div>
    );
  }

  if (!product) return <div>No se encontró el producto.</div>;

  return <ProductDetails product={product} />;
}