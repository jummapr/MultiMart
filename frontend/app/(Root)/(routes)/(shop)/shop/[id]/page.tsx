"use client"

import useSellerProtected from '@/hooks/useSellerProtected'
import React from 'react'
import Shop from './Shop'

const ShopPage = () => {

    useSellerProtected()

  return (
    <div>
      <Shop />
    </div>
  )
}

export default ShopPage
