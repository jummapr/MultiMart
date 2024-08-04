"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const { userOrders } = useSelector((state: any) => state.order);
  const { orderId } = useParams();

  console.log("OrderId", orderId);

  const data =
    userOrders && userOrders.find((item: any) => item._id === orderId);

  console.log("Data", data);
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {data && data?.status === "Processing" ? (
        <h2 className="text-[20px]">Your order is processing in shop.</h2>
      ) : data?.status === "Transfer to delivery partner" ? (
        <h2 className="text-[20px]">
          Your order is on the for delivery partner.
        </h2>
      ) : data?.status === "Shipping" ? (
        <h2 className="text-[20px]">
          Your order is coming with our delivery partner!.
        </h2>
      ) : data?.status === "Receiving" ? (
        <h2 className="text-[20px]">
          Your order is in your city. Our delivery man will deliver it.
        </h2>
      ) : data?.status === "On the way" ? (
        <h2 className="text-[20px]">
          Our Delivery man going to deliver your order.
        </h2>
      ) : data?.status === "Delivered" ? (
        <h2 className="text-[20px]">Your order is delivered.</h2>
      ) : null}
    </div>
  );
};

export default page;
