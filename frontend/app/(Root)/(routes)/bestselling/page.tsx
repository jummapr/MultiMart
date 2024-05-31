"use client";

import ProductCard from "@/components/comman/ProductCard";
import { useAllProductMutation } from "@/redux/features/product/productApi";
import { productData } from "@/static/data";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BestSelling = () => {
  const [data, setData] = useState<any>();
  const { allProduct: products } = useSelector((state: any) => state.product);
  const [
    allProduct,
    { isError, data: getAllProductData, error, isSuccess, isLoading },
  ] = useAllProductMutation();

  console.log("All Product from best selling product",data)

  const fetchedProduct = async () => {
    
    await allProduct();
  };

  useEffect(() => {
    fetchedProduct();
    const sortedData =
    products && products?.sort((a:any, b:any) => a.total_sell - b.total_sell);
    setData(sortedData);
  }, []);

  return (
    <div>
      <div className="w-full flex flex-wrap gap-10 py-20 px-24 ">
        {data && data.map((item: any, index: any) => <ProductCard />)}
      </div>

      {data && data.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <h2>Product not found.</h2>
        </div>
      ) : null}
    </div>
  );
};

export default BestSelling;
