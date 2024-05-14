"use client";

import {
  useAllProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/product/productApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteEventMutation,
  useGetallEventsMutation,
} from "@/redux/features/event/eventApi";

const AllEvents = () => {
  const [open, setOpen] = useState(false);
  const { seller } = useSelector((state: any) => state.seller);
  const events = useSelector((state: any) => state.event);
  console.log(events);
  const [getallEvents, { isError, data, error, isSuccess, isLoading }] =
    useGetallEventsMutation();

  const [
    deleteEvent,
    {
      error: deleteProductError,
      isSuccess: deleteProductIsSuccess,
      isLoading: deleteProductIsLoading,
    },
  ] = useDeleteEventMutation();

  const id = seller?.data?._id;

  const getAllProduct = async () => {
    await getallEvents(id);
  };

  const DeleteProduct = (id: string) => {
    deleteEvent(id);
  };

  const onModelOpenChange = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllProduct();
  }, [deleteProductIsSuccess]);

  return (
    <div className="w-full h-full px-10 flex justify-center py-20">
      <Card className="w-[80rem] ">
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="hidden md:table-cell">Sold Out</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            {events?.allEvents &&
              events?.allEvents?.map((item: any) => (
                <TableBody>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={item?.images[0].url}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item?.name}</TableCell>
                    <TableCell>${item?.originalPrice}.00</TableCell>
                    <TableCell>{item?.stock}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item?.sold_out}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => DeleteProduct(item?._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </CardContent>
      </Card>
      {/* <DeleteAlertModel /> */}
    </div>
  );
};

// const DeleteAlertModel = () => (
//   <Dialog open={open} onOpenChange={onModelOpenChange}>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Are you absolutely sure?</DialogTitle>
//         <DialogDescription>
//           This action cannot be undone. This will permanently delete your
//           account and remove your data from our servers.
//         </DialogDescription>
//       </DialogHeader>
//     </DialogContent>
//   </Dialog>
// );

export default AllEvents;
