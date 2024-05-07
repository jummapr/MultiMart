"use client"

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import Orders from "./Orders";

const OrdersPage = () => {

  useAuthRedirect()

  return (
    <Orders />
  );
};

export default OrdersPage;
