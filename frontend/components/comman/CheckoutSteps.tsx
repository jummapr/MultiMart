"use client"

import styles from "@/styles";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation'

const CheckoutSteps = ({ active }: { active: number }) => {
  const pathname = usePathname()

  console.log(pathname,"PathName")

  const data = [
    {
      id: 1,
      title: "Shipping",
      href: "/shipping",
    },
    {
      id: 2,
      title: "Payment",
      href: "/payment",
    },
    {
      id: 3,
      title: "Success",
      href: "/success",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
        <div className={`flex items-center`}>
          <div className={`px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer`}>
            <span className={`text-[#fff] text-[16px] font-[600]`}>1.Shipping</span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
            }`}
          />
        </div>

        <div className={`flex items-center`}>
          <div
            className={`${
              active > 1
                ? `px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer`
                : `px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer !bg-[#FDE1E6]`
            }`}
          >
            <span
              className={`${
                active > 1
                  ? `text-[#fff] text-[16px] font-[600]`
                  : `text-[#fff] text-[16px] font-[600] `
              }`}
            >
              2.Payment
            </span>
          </div>
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 3
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
            }`}
          />
          <div
            className={`${
              active > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#FDE1E6]`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#f63b60]`
              }`}
            >
              3.Success
            </span>
          </div>
        </div>
        {data.map((item) => (
          <div className={`flex items-center`}>
          <div className={`px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer`}>
            <span className={`text-[#fff] text-[16px] font-[600]`}>{item.id}.{item.title}</span>
          </div>
          <div
            className={`${
              active > item.id
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
            }`}
          />
        </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
