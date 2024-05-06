import ProductCard from '@/components/comman/ProductCard'
import { Button } from '@/components/ui/button'
import React from 'react'

const WishList = () => {
    const product = [1,2,3,4]
  return (
    <div className='h-screen w-full'>
      <div className='px-7 lg:px-36 py-24'>
        <div className='flex w-full items-center justify-between'>
            <h2>Wishlist (2)</h2>
            <Button variant={"outline"} className=''>Move All to Cart</Button>
        </div>

        <div className='flex w-full gap-14 py-16 flex-col lg:flex-row md:flex-wrap'>
            {
                product.map((item) => (
                    <ProductCard />
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default WishList
