"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const QuintetteButton = () => {

  const [count,setCount] = useState(0)

    const incrementCount = () => {
        setCount(count + 1)
      }
    
      const decrementCount = () => {
        if(count > 0) {
          setCount(count - 1)
        }
      }

  return (
       <div className="flex items-center justify-start">
              <Button
                variant={"outline"}
                className="hover:bg-primary rounded-none hover:text-white"
                onClick={incrementCount}
              >
                +
              </Button>
              <Button
                variant={"outline"}
                className="px-4 rounded-none hover:bg-white cursor-default"
              >
                {count}
              </Button>
              <Button
                variant={"outline"}
                className=" hover:bg-primary rounded-none hover:text-white"
                onClick={decrementCount}
              >
                -
              </Button>
            </div>
  )
}

export default QuintetteButton
