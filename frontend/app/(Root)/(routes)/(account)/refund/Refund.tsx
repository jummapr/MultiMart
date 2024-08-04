"use client";

import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useGetAllUserOrdersQuery } from "@/redux/features/order/orderApi";
import { useSelector } from "react-redux";

const Refund = () => {
  const { user } = useSelector((state: any) => state.loadUser);

  const {
    data: orders,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetAllUserOrdersQuery(user?._id);

  const refundData =
    orders &&
    orders?.data.filter((item: any) => item.status === "Processing refund");


  const dataTable = refundData?.map((item: any) => {
    return {
      id: item._id,
      name: item?.user?.name,
      status: item?.status,
      itemQty: item?.cart?.length,
      total: item?.totalPrice,
    };
  });

  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="w-[70rem] pt-20 pb-10">
        {/* @ts-ignore */}
        {isSuccess ? (
          <DataTable searchKey="name" columns={columns} data={dataTable} />
        ) : (
          <h2>Loading</h2>
          // <UserOrderLoading />
        )}
      </div>
    </div>
  );
};

export default Refund;
