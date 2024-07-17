"use client";

import React from "react";
import Title from "../components/Title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "./components/productTable";
import AddProductModal from "./components/AddProductModal";
import SellerOrders from "./components/orders";

function page() {
  return (
    <div>
      <div className="w-full pt-11 px-20">
        <div className=" flex justify-between">
          <Title>Orders</Title>
        </div>
        <div>
          <SellerOrders />
        </div>
      </div>
    </div>
  );
}

export default page;
