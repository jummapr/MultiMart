"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useSelector } from "react-redux";
import Rating from "react-rating";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productData } from "@/static/data";
import ProductCard from "@/components/comman/ProductCard";

const Shop = () => {
  const { isSeller, seller } = useSelector((state: any) => state.seller);
  return (
    <div className="flex h-full w-full px-40 flex-col md:flex-row md:overflow-hidden">
      <Card className="w-1/2 h-full mt-14 shadow-md">
        <CardContent className="pt-12 overflow-y-auto">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-28 h-28">
              <AvatarImage src={seller?.data?.avatar?.url} />
            </Avatar>
            <h3 className="font-semibold">{seller?.data?.shopName}</h3>
          </div>
          <p className="text-sm pt-6 text-justify">
            {seller?.data?.description}
          </p>
          <div className="flex flex-col pt-5">
            <h4 className="text-md font-semibold">Address</h4>
            <h3>{seller?.data?.address}</h3>
          </div>
          <div className="flex flex-col pt-5">
            <h4 className="text-md font-semibold">Phone Number</h4>
            <h3>{seller?.data?.phonenumber}</h3>
          </div>
          <div className="flex flex-col pt-5">
            <h4 className="text-md font-semibold">Total Product</h4>
            <h3>20</h3>
          </div>
          <div className="flex flex-col pt-5">
            <h4 className="text-md font-semibold">Shop Ratings</h4>
            <div className="flex gap-3">
              <Rating
                initialRating={4}
                readonly
                emptySymbol={
                  <Image
                    src={"/icons/Vector.png"}
                    alt="rattingStarIcons"
                    width={16}
                    height={16}
                  />
                }
                fullSymbol={
                  <Image
                    src={"/icons/fieldstar.png"}
                    alt="rattingStarIcons"
                    width={16}
                    height={16}
                  />
                }
              />
              <h2>4.5</h2>
            </div>
            <div className="flex flex-col pt-5">
              <h4 className="text-md font-semibold">Joined On</h4>
              <h3>{seller?.data?.createdAt.slice(0, 10)}</h3>
            </div>

            {isSeller && (
              <div className="flex flex-col gap-4 py-11 px-6">
                <Button className="w-full">Edit Shop</Button>
                <Button className="w-full">Logout</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="px-6 mt-14 w-full">
        <Tabs defaultValue="shopProducts" className="w-[100%]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shopProducts" className="w-full">
              Shop Products{" "}
            </TabsTrigger>
            <TabsTrigger value="shopEvents">Shop Events</TabsTrigger>
            <TabsTrigger value="shopReviews">Shop Reviews</TabsTrigger>
          </TabsList>
          <TabsContent
            value="shopProducts"
            className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-9 xl:grid-cols-3 xl:gap-[20px] mb-12"
          >
            {productData && productData.map((i, index) => <ProductCard />)}
          </TabsContent>
          <TabsContent
            value="shopEvents"
            className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-9 xl:grid-cols-3 xl:gap-[20px] mb-12"
          >
            {productData && productData.map((i, index) => <ProductCard />)}
          </TabsContent>
          <TabsContent
            value="shopReviews"
            className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-9 xl:grid-cols-3 xl:gap-[20px] mb-12"
          >
            {productData && productData.map((i, index) => <ProductCard />)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Shop;
