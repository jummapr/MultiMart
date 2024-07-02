"use client";

import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";

const StripeProvider = ({ children }: {children: React.ReactNode}) => {
  const { stripeApiKey } = useSelector((state: any) => state.payment);
  return <Elements stripe={loadStripe(stripeApiKey)}>{children}</Elements>;
};

export default StripeProvider;
