import React from 'react'
import Title from '../components/Title'
import SellerRefund from './components/sellerRefund'

const page = () => {
  return (
    <div>
      <div className="w-full pt-11 px-20">
        <div className=" flex justify-between">
          <Title>Orders</Title>
        </div>
        <div>
          <SellerRefund />
        </div>
      </div>
    </div>
  )
}

export default page
