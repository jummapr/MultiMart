"use client";

import React, { useState } from "react";
import Modal from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "@/redux/features/modal/productDetailSlice";
import Gallery from "../gallery";
import { ImageData } from "@/static/image";
import Image from "next/image";
import { productData } from "@/static/data";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

const PreViewModal = () => {
  const { isOpen } = useSelector((state: any) => state.productDetailModal);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(onClose());
  };

  const handleSubmit = () => {};

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <Modal className="max-w-[50rem]" isOpen={isOpen} onClose={onCloseModal}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5 pl-3">
          <Gallery images={ImageData} />
          <div className="flex pt-7 space-x-3">
            <Image
              src={productData[0].shop.shop_avatar.url}
              alt="Product Company Logo"
              className="rounded-full w-[50px] h-[50px]"
              width={50}
              height={50}
            />
            <div>
              <h3 className="shop_name">{productData[0].shop.name}</h3>
              <h5 className="pb-3 text-[15px]">
                {productData[0].shop.ratings} Ratting
              </h5>
            </div>
          </div>
          <Button className="mt-5">Send Message</Button>

          <h5 className="text-[16px] text-red-700 mt-5">
            ({productData[0].total_sell}) Sold out
          </h5>
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <h2 className="font-Roboto text-[#333] text-[20px] font-medium pb-3">
            {productData[0].name}
          </h2>
          <p className="text-sm text-gray-600">{productData[0].description}</p>

          <div className="flex w-full pt-4">
            <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
              ${productData[0].discount_price}
            </h4>
            <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              {productData[0].price ? "$" + productData[0].price : null}
            </h3>
          </div>

          <div className="flex items-center pt-5 justify-around">
            <div className="flex ">
              <Button
                variant={"outline"}
                className="hover:bg-primary rounded-none hover:text-white"
                onClick={incrementCount}
              >
                +
              </Button>
              <Button
                variant={"outline"}
                className="px-8 rounded-none hover:bg-white cursor-default"
              >
                {count}
              </Button>
              <Button
                variant={"outline"}
                className=" hover:bg-primary rounded-none hover:text-white"
                onClick={decrementCount}
              >
                -
              </Button>
            </div>

            <Button>Add to cart</Button>

            <div className="flex justify-center items-center bg-white w-9 h-9 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Heart className="w-6 h-6 " />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreViewModal;
