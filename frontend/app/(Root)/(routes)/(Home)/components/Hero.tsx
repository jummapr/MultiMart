import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'
import React from 'react';

const Hero = () => {
  return (
    <div className='w-full px-6 py-4'>
      <div className='flex justify-between items-center px-12 py-9 w-full bg-primaryBlack'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row gap-7 items-center'>
            <Image src={"/assets/appleicon.png"} width={50} height={50} alt={"Apple Icon"}/>
            <h2 className='text-white'>iPhone 14 Series</h2>
          </div>
          <div>
            <h1 className='text-white text-6xl w-96 leading-snug'>Up to 10% off Voucher</h1>
          </div>
          <div className='flex gap-0 items-center'>
            <Button variant={"link"} className='text-white text-xl'>Shop now
            <ArrowRight className='text-white w-5 h-5 ml-2' />
            </Button>
          </div>
        </div>
        <div>
            <Image src={"/assets/hero-image.png"} width={500} height={500} alt={"Hero Image"}/>
        </div>
      </div>
    </div>
  )
}

export default Hero
