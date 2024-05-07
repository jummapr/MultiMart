"use client"

import React from "react";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import Refund from "./Refund";

const RefundPage = () => {

  useAuthRedirect()
  return (
      <Refund />
  );
};

export default RefundPage;
