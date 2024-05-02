import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BestDeal = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center pb-10">
        <h3 className="text-3xl font-semibold">Best Event</h3>
        <Link href={"/bestevent"} className={cn(buttonVariants(), "px-6")}>
          View All
        </Link>
      </div>
      <div className="flex justify-between w-full rounded-lg bg-primaryBlack my-5 px-14 py-8">
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="text-4xl font-semibold text-white">
            IPhone 14Pro max
          </h2>
          <p className="text-white text-sm w-[22rem] pt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex
            quasi fuga ea, quam animi id cum? Ipsam sint neque ab amet, tempore
            accusamus ipsum nihil qui! Libero, repellendus eos!
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-white font-medium">$899</p>
            <p className="text-[#DB4444] line-through">$1099</p>
          </div>
          <div className="flex flex-row gap-4 w-full pt-6">
            <div className="flex justify-center items-center flex-col w-16 h-16 relative rounded-full bg-white">
              <p className="text-primaryBlack text-xs font-semibold">23</p>
              <p className="text-primaryBlack text-xs font-medium">Hours</p>
            </div>
            <div className="flex justify-center items-center flex-col w-16 h-16 relative rounded-full bg-white">
              <p className="text-primaryBlack text-xs font-semibold">23</p>
              <p className="text-primaryBlack text-xs font-medium">Days</p>
            </div>
            <div className="flex justify-center items-center flex-col w-16 h-16 relative rounded-full bg-white">
              <p className="text-primaryBlack text-xs font-semibold">23</p>
              <p className="text-primaryBlack text-xs font-medium">Minutes</p>
            </div>
            <div className="flex justify-center items-center flex-col w-16 h-16 relative rounded-full bg-white">
              <p className="text-primaryBlack text-xs font-semibold">23</p>
              <p className="text-primaryBlack text-xs font-medium">Seconds</p>
            </div>
          </div>
          <Button className="w-40 text-lg mt-10 h-14">Buy now</Button>
        </div>
        <div>
          <Image
            src="/product/iphoneimage.png"
            alt="Shoes"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default BestDeal;
