"use client"

import ProductCard from '@/components/comman/ProductCard';
import { productData } from '@/static/data';
import React, { useEffect, useState } from 'react'

const BestSelling = () => {
    const [data,setData] = useState<any>();

    useEffect(() => {
        const sortedData = productData && productData.sort((a,b) => a.total_sell - b.total_sell)
        setData(sortedData)
    },[])

  return (
    <div>

<div className='w-full flex flex-wrap gap-10 py-20 px-24 '>
{
    data && data.map((item: any,index: any) => <ProductCard />)
}
</div>

      {
        data && data.length === 0 ? (
            <div className='w-full h-screen flex items-center justify-center'>
                <h2>Product not found.</h2>
            </div>
        ): null
      }
    </div>
  )
}

export default BestSelling
