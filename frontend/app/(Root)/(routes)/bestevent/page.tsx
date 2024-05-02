import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const BestEvent = () => {
  return (
    <div className='h-full w-full px-8 sm:px-24 md:px-16 lg:px-36'>
      

      <div className="flex justify-between flex-wrap md:flex-nowrap w-full rounded-lg bg-primaryBlack my-5 px-5 py-8">
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="text-2xl lg:text-4xl font-semibold text-white">
            IPhone 14Pro max
          </h2>
          <p className="text-white text-base lg:text-sm w-[22rem] pt-3">
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
        <div className='pt-11'>
          <Image
            src="/product/iphoneimage.png"
            alt="Shoes"
            className='md:w-[18rem] md:h-[20rem]'
            width={350}
            height={350}
          />
        </div>
      </div>
      </div>
  )
}

export default BestEvent
