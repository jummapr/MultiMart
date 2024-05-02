import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import React from "react";

const BrowseByCategory = () => {
  return (
    <div className="w-full pt-20">
      <h3 className="text-3xl font-semibold">Browse By Category</h3>
      <div className="w-full flex flex-row flex-wrap gap-5 py-14">
        <Link href={"/products?category='mobiles'"}>
          <div className="flex w-[10rem]  flex-col items-center gap-2 border  px-10 py-4 cursor-pointer rounded-md">
            <Smartphone className="w-10 h-10" />
            <p className="text-xl font-semibold">Phone</p>
          </div>
        </Link>
        <div className="flex w-[10rem]  flex-col items-center gap-2 border  px-10 py-4 cursor-pointer rounded-md">
          <Monitor className="w-10 h-10" />
          <p className="text-xl font-semibold">Phone</p>
        </div>
        <div className="flex w-[10rem]  flex-col items-center gap-2 border  px-10 py-4 cursor-pointer rounded-md">
          <Smartphone className="w-10 h-10" />
          <p className="text-xl font-semibold">Phone</p>
        </div>
        <div className="flex w-[10rem]  flex-col items-center gap-2 border  px-10 py-4 cursor-pointer rounded-md">
          <Smartphone className="w-10 h-10" />
          <p className="text-xl font-semibold">Phone</p>
        </div>
        <div className="flex w-[10rem]  flex-col items-center gap-2 border  px-10 py-4 cursor-pointer rounded-md">
          <Smartphone className="w-10 h-10" />
          <p className="text-xl font-semibold">Phone</p>
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
