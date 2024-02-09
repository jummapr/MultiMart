"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTableData } from "@/constent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const ProductTable = () => {
  return (
    <div className="pt-11">
      <div className="w-96 pb-6">
        <Input type="search" className="rounded-md" placeholder="Filter by name" />
      </div>
      <Table>
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableHead>Photo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
        </TableHeader>
        <TableBody>
          {ProductTableData.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.photo}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer">
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <h2 className="text-red-500">Delete</h2>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
