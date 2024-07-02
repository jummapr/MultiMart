"use client";

import React from "react";
import PaymentInfo from "./PaymentInfo";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PaymentCard from "./paymentCard";
import { useSelector } from "react-redux";
import StripeProvider from "@/components/provider/stripe-provider";

const page = () => {
  const paymentData = localStorage.getItem("latestOrder") as string;
  const { stripeApiKey } = useSelector((state: any) => state.payment);

  const cart = JSON.parse(paymentData)?.cart;
  const subTotalPrice = JSON.parse(paymentData)?.subTotalPrice;
  const totalPrice = JSON.parse(paymentData)?.totalPrice;
  const discountPrice = JSON.parse(paymentData)?.discountPrice;
  const shipping = JSON.parse(paymentData)?.shipping;

  const handlePaymentSubmit = () => {};

  return (
    <div className="w-full h-full flex justify-center items-center">
      <StripeProvider>
        <PaymentCard />
      </StripeProvider>
    </div>
  );
};

export default page;
