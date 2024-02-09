import Image from 'next/image'
import React from 'react'

const OurFeatures = () => {
  return (
    <div className='w-full flex flex-row space-x-20 gap-7 justify-center items-center py-24'>
     <div className='flex flex-col gap-1 items-center'>
        <Image src={"/product/Services.png"} alt="Services" width={100} height={100}/>
        <h3 className='text-lg font-semibold'>FREE AND FAST DELIVERY</h3>
        <p className='text-sm font-normal'>Free delivery for all orders over $140</p>
     </div>
     <div className='flex flex-col gap-y-2 items-center'>
        <Image src={"/product/customre.png"} alt="Services" width={100} height={100}/>
        <h3 className='text-lg font-semibold'>FREE AND FAST DELIVERY</h3>
        <p className='text-sm font-normal'>Free delivery for all orders over $140</p>
     </div>
     <div className='flex flex-col  gap-y-2 items-center'>
        <Image src={"/product/moneyback.png"} alt="Services" width={100} height={100}/>
        <h3 className='text-lg font-semibold'>MONEY BACK GUARANTEE</h3>
        <p className='text-sm font-normal'>Free delivery for all orders over $140</p>
     </div>
    </div>
  )
}

export default OurFeatures
