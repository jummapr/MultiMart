"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { onOpen } from "@/redux/features/modal/couponCode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteCouponMutation,
  useGetAllCouponMutation,
} from "@/redux/features/coupon/couponApi";

const CreateCoupon = () => {
  const { isOpen } = useSelector((state: any) => state.couponModel);
  const { allCoupon } = useSelector((state: any) => state.coupon);
  const { createCoupon } = useSelector((state: any) => state.coupon);
  const { seller } = useSelector((state: any) => state.seller);

  const [getAllCoupon, { isError, data, error, isSuccess, isLoading }] =
    useGetAllCouponMutation();

  const [
    deleteCoupon,
    {
      isError: isDeleteError,
      error: deleteCouponError,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
    },
  ] = useDeleteCouponMutation();

  const id = seller?.data?._id;

  const dispatch = useDispatch();
  console.log(allCoupon);

  console.log(isOpen);

  const onOpenModel = () => {
    dispatch(onOpen());
  };

  const fetchAllCoupon = async (id: string) => {
    await getAllCoupon(id);
  };

  const deleteCouponDiscount = async (id: string) => {
    await deleteCoupon(id);
  };

  useEffect(() => {
    fetchAllCoupon(id);
  }, [seller, createCoupon, isDeleteSuccess]);

  return (
    <div className="h-full w-full flex items-center flex-col gap-10">
      <div className="w-full px-12 flex justify-end  pt-20">
        <Button onClick={onOpenModel} className="font-semibold flex gap-2">
          <Plus />
          Add Coupon
        </Button>
      </div>
      <div>
        <Card className="w-[80rem] ">
          <CardHeader>
            <CardTitle>All Product</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Discount Percentage</TableHead>
                  <TableHead>minAmount</TableHead>
                  <TableHead>maxAmount</TableHead>
                  <TableHead>selectedProducts</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {!allCoupon && <h2>No Coupon Code</h2>}
                {allCoupon &&
                  allCoupon.map((item: any) => (
                    <TableRow>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.value}%</TableCell>
                      <TableCell>{item.minAmount}</TableCell>
                      <TableCell>{item.maxAmount}</TableCell>
                      <TableCell>{item.selectedProducts}</TableCell>
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
                              onClick={() => deleteCouponDiscount(item._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateCoupon;
