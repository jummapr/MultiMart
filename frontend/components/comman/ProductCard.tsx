"use client"

import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { onOpen } from "@/redux/features/modal/productDetailSlice";

const ProductCard = () => {

  const dispatch = useDispatch()

  const onModalOpen = () => {
    dispatch(onOpen())
  }

  return (
    <div>
      <Card className="w-[16rem] border-none rounded-lg">
        <CardHeader className="w-full relative bg-[#F5F5F5]">
          <Image
            src="/product/chaiimage.png"
            alt="Shoes"
            width={250}
            height={250}
          />
          <div className="absolute top-2 right-2">
            <div className="flex justify-center items-center bg-white w-8 h-8 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Heart className="w-5 h-5 " />
            </div>
          </div>
          <div className="absolute top-12 right-2">
            <div className="flex justify-center items-center bg-white w-8 h-8 text-center rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Eye className="w-5 h-5" onClick={onModalOpen} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-0 pt-2 px-1">
          <h2 className="text-sm font-medium">
            HAVIT HV-G92 Gamepad hdgfd jhgjkhgs
          </h2>

          <div className="flex justify-between pt-2 gap-3">
            <div className="flex flex-row gap-2">
              <p className="text-base font-medium text-primary">$120</p>
              <p className="text-base font-medium line-through text-gray-400">
                $160
              </p>
            </div>
            <div>
              <p className="text-base font-medium pr-2">28 sold</p>
            </div>
          </div>
          <div className="flex justify-between pt-2 gap-3">
            <div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
