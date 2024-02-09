"use client";

import React from "react";
import Title from "../components/Title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "./components/productTable";
import AddProductModal from "./components/AddProductModal";

function page() {
  return (
    <div>
      <div className="w-full pt-11 px-20">
        <div className=" flex justify-between">
          <Title>Products</Title>
          <AddProductModal />
        </div>
        <div>
          <ProductTable />
        </div>
      </div>
    </div>
  );
}

export default page;
