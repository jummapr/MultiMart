"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Orders = {
    orderId: string,
    status: "Pending" | "Processing" | "Success" | "Failed",
    itemQty: number,
    total: string
}

export const columns: ColumnDef<Orders>[] = [
    {
      accessorKey: "orderId",
      header: "Order ID",
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
  ]