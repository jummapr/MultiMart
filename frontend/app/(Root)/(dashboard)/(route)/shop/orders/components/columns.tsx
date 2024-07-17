"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Orders = {
  productId: string;
  name: string;
  price: number;
  stocks: number;
  sold_out: number;
};

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "productId",
    header: "Product Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "stocks",
    header: "Stocks",
  },
  {
    accessorKey: "sold_out",
    header: "Sold Out",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: (data) => {
      const productId = data?.row?.getValue("productId");
      return (
        <Link href={`/shop/orders/${productId}`}>
          <Button>View</Button>
        </Link>
      );
    },
  },
];
