"use client"

import React from "react";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import TrackOrder from "./TrackOrders";

const TrackOrderPage = () => {

  useAuthRedirect()

  return (
    <TrackOrder />
  );
};

export default TrackOrderPage;
