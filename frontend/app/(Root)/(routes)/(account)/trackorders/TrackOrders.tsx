import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const TrackOrder = () => {

  const TableData = [
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 300",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
    {
      orderId: "88787adhtfkkdgftbfhg",
      status: "Processing",
      itemQty: 1,
      total: "us$ 200",
    },
  ];
  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <div className="w-[70rem]">
        {/* @ts-ignore */}
        <DataTable columns={columns} data={TableData} />
      </div>
    </div>
  );
};

export default TrackOrder;
