import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import ProductCard from '@/components/comman/ProductCard';
import { Button } from '@/components/ui/button';

const ShowCaseSection = () => {
  return (
    <div className='w-full pt-20 mb-4'>
      <div className='w-full'>
        <h3 className='text-3xl font-semibold'>Best Deal</h3>
        <div className='flex w-full flex-row items-center gap-7 pt-10 pl-4'>
          <ProductCard />
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
