"use client"

import ProductCard from "@/components/comman/ProductCard";
import ProductMainCard from "@/components/comman/ProductMainCard";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const FeaturedProducts = () => {

  const {allProduct} = useSelector((state: any) => state.product);

  console.log("All Product for home page",allProduct)
  return (
    <div className="w-full pt-20">
      <h3 className="text-3xl font-semibold">Explore Our Products</h3>
      <div className="flex w-full flex-wrap flex-row items-center gap-7 pt-10 pl-4">
        {
          allProduct && allProduct.map((item: any, index: any) => (
            <>
              <ProductMainCard data={item} /> 
            </>
          ))

        }
      </div>

      <div className='w-full flex justify-center items-center py-12'>
        <Link href={"/products"} className={buttonVariants()}>View All products</Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
