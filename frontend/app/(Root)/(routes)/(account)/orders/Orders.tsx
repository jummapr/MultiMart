"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useSelector } from "react-redux";
import { useGetAllUserOrdersQuery } from "@/redux/features/order/orderApi";
import UserOrderLoading from "@/components/loaders/user-order-loading";

const Orders = () => {
  const { user } = useSelector((state: any) => state.loadUser);

  const {
    data: orders,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetAllUserOrdersQuery(user?._id);

  const dataTable = orders?.data.map((item: any) => {
    return {
      id: item._id,
      name: item?.user?.name,
      status: item?.status,
      itemQty: item?.cart?.length,
      total: item?.totalPrice,
    };
  });

  // console.log(dataTable, "Data Table ");

  const TableData = [
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 300",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "John Doe",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      name: "Jumma",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      id: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
  ];

  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="w-[70rem] pt-20 pb-10">
        {/* @ts-ignore */}
        {isSuccess ? (
          <DataTable  searchKey="name" columns={columns} data={dataTable} />
        ) : (
          <h2>Loading</h2>
          // <UserOrderLoading />
        )}
      </div>
    </div>
  );
};

export default Orders;
