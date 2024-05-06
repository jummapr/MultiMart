"use client"


export type Orders = {
    id: string,
    status: "Pending" | "Processing" | "Success" | "Failed",
    itemQty: number,
    total: string
}

export const columns: ColumnDef<Orders>[] = [
    {
      accessorKey: "id",
      header: "Id",
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