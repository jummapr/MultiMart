"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, DollarSign, ShoppingBag } from "lucide-react";
import React, { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { useLazyGetAllSellerOrdersQuery } from "@/redux/features/order/orderApi";
import { Button } from "@/components/ui/button";

function DashBoard() {
  const { seller } = useSelector((state: any) => state.seller);
  const { allProduct: products } = useSelector((state: any) => state.product);

  const shopId = seller?.data?._id;

  // console.log(shopId, "Shop Id");

  const [triggerQuery, { data, isLoading, isSuccess }] =
    useLazyGetAllSellerOrdersQuery(shopId);

  const ordersData = data?.data.map((item: any) => {
    return {
      productId: item._id,
      name: item?.user?.name,
      email: item?.user?.email,
      status: item?.status,
      itemQty: item?.cart?.sold_out,
      totalPrice: item?.totalPrice.toFixed(2),
    };
  });

  let availableBalance: any;
  if (data) {
    const totalEarnigWithoutTex =
      data?.data &&
      data?.data?.reduce((acc: any, item: any) => acc + item.totalPrice, 0);
    const serviceCharge: any = totalEarnigWithoutTex * 0.1;

    availableBalance = totalEarnigWithoutTex - serviceCharge.toFixed(2);
  }

  useEffect(() => {
    triggerQuery(shopId);
  }, [shopId]);

  return (
    <div className="w-full pt-11 px-20">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${availableBalance}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data && data?.data.length}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Products</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products && products.length}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="pt-8 pb-10">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              {ordersData?.map((item: any) => (
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {item.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.totalPrice}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button>View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashBoard;
