"use client"

import ProductCard from '@/components/comman/ProductCard'
import ProductMainCard from '@/components/comman/ProductMainCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useSelector } from 'react-redux'

const WishList = () => {
    const {wishlist} = useSelector((state: any) => state.wishlist)
    const product = [1,2,3,4]
  return (
    <div className='h-screen w-full'>
      <div className='px-7 lg:px-36 py-24'>
        <div className='flex w-full items-center justify-between'>
            <h2>Wishlist ({wishlist.length})</h2>
            <Button variant={"outline"} className=''>Move All to Cart</Button>
        </div>

        <div className='flex w-full gap-14 py-16 flex-col lg:flex-row md:flex-wrap'>
            {
               wishlist &&  wishlist.map((item: any, index: number) => (
                    <ProductMainCard data={item} />
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default WishList
