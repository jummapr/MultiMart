"use client";

import { productData } from "@/static/data";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/comman/BreadCrumb";
import ProductCard from "@/components/comman/ProductCard";
import Filters from "./components/Filters";

const Products = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>();

  const categoryParams = searchParams.get("category");

  useEffect(() => {
    if (categoryParams == null) {
      const data =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(data);
    } else {
      const data =
        productData &&
        productData.filter((item) => item.category === categoryParams);
      setData(data);
    }
  }, []);

  return (
    <div className="h-full ">
      <div className="pt-12 px-12 ">
        <BreadCrumb name="Products"/>
      </div>

      <div className="grid w-full h-full grid-cols-1 items-start gap-x-3 gap-y-8 sm:grid-cols-12 lg:gap-x-8 px-10">
        <div className="sm:col-span-4 lg:col-span-3">
            <div>
                <h2 className="font-semibold">Filters</h2>

                <div>
                    <Filters />
                </div>
            </div>
        </div>
        <div className="sm:col-span-8 lg:col-span-9 ">
            <div className="flex w-full flex-row gap-4 flex-wrap pl-8">
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
