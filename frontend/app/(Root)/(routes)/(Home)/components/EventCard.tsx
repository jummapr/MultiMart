import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { FC } from "react";

interface EventCardInterface {
    name: string;
    description:  string;
    originalPrice: number;
    discountPrice: number;
    start_date: string;
    finish_date: string;
    image: string
}

const EventCard = ({data,counter}: any) => {
  return (
    <div className="flex justify-between w-full rounded-lg bg-primaryBlack my-5 px-14 py-8">
      <div className="flex flex-col justify-center items-start gap-2">
        <h2 className="text-4xl font-semibold text-white">{data.name}</h2>
        <p className="text-white text-sm w-[22rem] pt-3">
          {data.description}
        </p>
        <div className="flex flex-row gap-2">
          <p className="text-white font-medium">${data.discountPrice}</p>
          <p className="text-[#DB4444] line-through">${data.originalPrice}</p>
        </div>
        <div className="flex flex-row gap-4 w-full pt-6">
          <div className="flex justify-center items-center flex-col w-16 h-16 relative rounded-full bg-white">
            <p className="text-primaryBlack text-xs font-semibold">{counter.days}</p>
            <p className="text-primaryBlack text-xs font-medium">Days</p>
          </div>
          <div className="flex justify-center items-center flex-col w-16 h-16 relative rounded-full bg-white">
            <p className="text-primaryBlack text-xs font-semibold">{counter.hours}</p>
            <p className="text-primaryBlack text-xs font-medium">Hours</p>
          </div>
          <div className="flex justify-center items-center flex-col w-16 h-16 relative rounded-full bg-white">
            <p className="text-primaryBlack text-xs font-semibold">{counter.minutes}</p>
            <p className="text-primaryBlack text-xs font-medium">Minutes</p>
          </div>
          <div className="flex justify-center items-center flex-col w-16 h-16 relative rounded-full bg-white">
            <p className="text-primaryBlack text-xs font-semibold">{counter.seconds}</p>
            <p className="text-primaryBlack text-xs font-medium">Seconds</p>
          </div>
        </div>
        <Button className="w-40 text-lg mt-10 h-14">Buy now</Button>
      </div>
      <div>
        <Image
          src={data.image}
          alt="Shoes"
          width={350}
          height={350}
        />
      </div>
    </div>
  );
};

export default EventCard;
