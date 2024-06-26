import CheckoutSteps from '@/components/comman/CheckoutSteps'
import React from 'react'

const Payment = () => {
  return (
    <div>
      <CheckoutSteps active={2} />
      <h2>Payment</h2>
    </div>
  )
}

export default Payment
