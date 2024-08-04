"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Orders = {
  id: string;
  name: string;
  status: "Pending" | "Processing" | "Success" | "Failed";
  itemQty: number;
  total: string;
};

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "id",
    header: "ID",
    // cell: (info) => info.getValue(),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "itemQty",
    header: "Item Qty",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "Actions",
    cell: (data) => {
      const orderId = data?.row?.getValue("id");

      return (
        <Link href={`/orders/track/${orderId}`}>
          <Button>Track</Button>
        </Link>
      );
    },
  },
];
