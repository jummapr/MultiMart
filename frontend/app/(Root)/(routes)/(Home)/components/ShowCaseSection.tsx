import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import ProductCard from '@/components/comman/ProductCard';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ShowCaseSection = () => {
  return (
    <div className='w-full pt-20 mb-4'>
      <div className='w-full'>
        <div className='w-full flex justify-between items-center'>
        <h3 className='text-3xl font-semibold'>Best Selling products</h3>
        <Link href={"/bestselling"} className={cn(buttonVariants(),"px-6")}>View All</Link>
        </div>
        <div className='flex w-full flex-wrap flex-row  items-center gap-7 pt-10 pl-4'>
         <Link href={"/product/havit hv-G92 gamepad"}>
         <ProductCard />
         </Link>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className='w-full flex justify-center items-center py-12'>
        <Button>View products</Button>
      </div>
    </div>
  )
}

export default ShowCaseSection
