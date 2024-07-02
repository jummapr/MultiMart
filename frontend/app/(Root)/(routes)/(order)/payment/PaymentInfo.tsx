"use client"

import styles from "@/styles";
import { useState } from "react";
import { useSelector } from "react-redux";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./custom-accordion"
import { Checkbox } from "@/components/ui/checkbox";

const PaymentInfo = () => {
    const [select, setSelect] = useState(1);
    const {user} = useSelector((state: any) => state.loadUser)

    const paymentHandler = () => {

    }
  
    return (
      <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
        {/* select buttons */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(1)}
            >
              {select === 1 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1] transition-all">
              Pay with Debit/credit card
            </h4>
          </div>
  
          {/* pay with card */}
          {select === 1 ? (
            <div className="w-full flex border-b transition-all">
              <h1>Pay with Debit/credit card</h1>
            </div>
          ) : null}
        </div>
  
        <br />
        {/* paypal payment */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative transition-all flex items-center justify-center"
              onClick={() => setSelect(2)}
            >
              {select === 2 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full transition-all" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1] transition-all">
              Pay with Paypal
            </h4>
          </div>
  
          {/* pay with payement */}
          {select === 2 ? (
            <div className="w-full flex border-b transition-all">
              <div
                className={`${styles.button} transition-all !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                // onClick={() => setOpen(true)}
              >
                Pay Now
              </div>
            </div>
          ) : null}
        </div>
  
        <br />
        {/* cash on delivery */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(3)}
            >
              {select === 3 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Cash on Delivery
            </h4>
          </div>
  
          {/* cash on delivery */}
          {select === 3 ? (
            <div className="w-full flex">
              <form className="w-full" >
                <input
                  type="submit"
                  value="Confirm"
                  className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>
      </div>
    );
  
    // return (
    //   <Accordion type="single" collapsible className="w-full">
    //   <AccordionItem value="item-1">
    //     <AccordionTrigger >Is it accessible?</AccordionTrigger>
    //     <AccordionContent>
    //       Yes. It adheres to the WAI-ARIA design pattern.
    //     </AccordionContent>
    //   </AccordionItem>
    //   <AccordionItem value="item-2">
    //     <AccordionTrigger >Is it styled?</AccordionTrigger>
    //     <AccordionContent>
    //       Yes. It comes with default styles that matches the other
    //       components&apos; aesthetic.
    //     </AccordionContent>
    //   </AccordionItem>
    //   <AccordionItem value="item-3">
    //     <AccordionTrigger >Is it animated?</AccordionTrigger>
    //     <AccordionContent>
    //       Yes. It&apos;s animated by default, but you can disable it if you
    //       prefer.
    //     </AccordionContent>
    //   </AccordionItem>
    // </Accordion>
    // );
};

export default PaymentInfo