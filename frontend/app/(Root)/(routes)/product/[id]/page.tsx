"use client";

import Gallery from "@/components/gallery";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageData } from "@/static/image";
import React from "react";
import QuintetteButton from "./QuintetteButton";
import { Heart, StarOff } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import ProductDetailInfo from "./components/ProductDetailInfo";
import Rating from "react-rating";
import { Star } from 'lucide-react';
import ProductCard from "@/components/comman/ProductCard";

const ProductDetail = () => {
  const handleSubmitMessage = () => {
    console.log("Messaging....");
  };
  return (
    <div className="flex flex-col h-full w-full py-10 px-6 md:px-12 lg:px-40 xl:py-16 lg:py-16 md:py-16">
      <div className="grid h-full w-full grid-cols-1 gap-8 sm:gap-0 md:grid-cols-2 sm:grid-cols-2  lg:grid-cols-2 ">
        <div className="w-[24rem] sm:w-[16rem] md:w-[20rem] lg:w-[20rem] xl:w-[30rem] ">
          <Gallery images={ImageData} />
        </div>
        <div className="">
          <div>
            <h2 className="font-semibold text-3xl">Havic HV G-92 Gamepad</h2>

            <div className="pt-3 w-full flex flow-row items-center gap-6">
              {/* @ts-ignore */}
              <Rating initialRating={4} readonly
                emptySymbol={<Image src={"/icons/Vector.png"} alt="rattingStarIcons" width={16} height={16}/>}
                fullSymbol={<Image src={"/icons/fieldstar.png"} alt="rattingStarIcons" width={16} height={16}/>}
              />
              <h4 className="text-gray-500">(150 Reviews)</h4>
              <h4 className="text-green-400">In stock</h4>
            </div>
          </div>
          <div className="pt-5 flex">
            <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
              $876
            </h4>
            <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              $3789
            </h3>
          </div>
          <div className="pt-6">
            <p className="text-sm font-medium">
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Velit dicta sint sed aliquam tenetur in tempore quas, odit
              vitae debitis.
            </p>
          </div>
          <Separator className="my-9" />
          <div className="flex gap-8 items-center ">
            <QuintetteButton />
            <Button>
              Add to cart
              <ShoppingCart size={23} />
            </Button>
            <div className="flex justify-center items-center bg-white w-8 h-8 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Heart className="w-5 h-5 " />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-9">
            <div className="flex pt-7 space-x-3">
              <Image
                src={
                  "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png"
                }
                alt="Product Company Logo"
                className="rounded-full w-[50px] h-[50px]"
                width={50}
                height={50}
              />
              <div>
                <h3 className="shop_name">Amazon LTD</h3>
                <h5 className="pb-3 text-[15px]">4.5 Ratting</h5>
              </div>
            </div>
            <Button className="mt-5" onClick={handleSubmitMessage}>
              Send Message
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-24 w-full">
        <ProductDetailInfo />
      </div>
      <div className="w-full pt-5">
          <div className="pb-16 flex gap-6 items-center">
            <div className="w-[20px] h-[40px] bg-primary rounded-sm" />
            <h2 className="font-semibold text-xl text-primary text-pretty">Related Item</h2>
          </div>

          <div className="flex items-center gap-8 ">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
      </div>
    </div>
  );
};

export default ProductDetail;
