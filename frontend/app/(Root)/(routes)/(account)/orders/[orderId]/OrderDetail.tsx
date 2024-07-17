"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Country, State, City } from "country-state-city";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const UserOrderDetail = () => {
  const [status, setStatus] = useState("");

  const { userOrders } = useSelector((state: any) => state.order);

  const { orderId } = useParams();

  console.log("Order Id", orderId);

  const data =
    userOrders && userOrders.find((item: any) => item._id === orderId);

  console.log("Data is", data);

  const formattedDate = data?.createdAt
    ? new Date(data?.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const country = Country.getCountryByCode(
    data?.shippingAddress?.country
  )?.name;
  const state = State.getStateByCodeAndCountry(
    data?.shippingAddress?.state,
    data?.shippingAddress?.country
  )?.name;
  const city = data?.shippingAddress?.city;

  const subTotalPrice = data?.cart.reduce((acc: number, item: any) => {
    return acc + item.qty * item.discountPrice;
  }, 0);

  const subTotal = data?.cart.map(
    (item: any) => item?.discountPrice * item?.qty
  );

  const shipping = subTotalPrice * 0.1;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center min-h-[calc(100vh_-_theme(spacing.8))]">
      <div className="grid gap-8 w-full max-w-4xl">
        <div className="bg-background rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="grid gap-1">
              <h1 className="text-xl font-bold">{data?._id}</h1>
              <div className="text-sm text-muted-foreground">
                Placed on {formattedDate}
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              {data?.status}
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] hidden md:table-cell">
                    Image
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data?.cart.map((item: any) => (
                    <TableRow>
                      <TableCell className="hidden md:table-cell">
                        <img
                          src={item?.images[0]?.url}
                          width={64}
                          height={64}
                          alt="Product Image"
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell>${item?.discountPrice}</TableCell>
                      <TableCell className="text-right">
                        ${item?.discountPrice * item?.qty}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic">
                <div className="font-medium">{data?.user?.data}</div>
                <div>
                  {data?.shippingAddress?.address1 +
                    data?.shippingAddress?.address2}
                </div>
                <div>
                  {city}, {state}, {country} {data?.shippingAddress?.zipCode}
                </div>

                <div className="flex items-center gap-4 pt-11">
                    <Button>Send Message to seller</Button>
                </div>
              </address>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-muted-foreground">Payment Status</div>
                <div>
                  <Badge variant={"default"}>
                    {data?.paymentInfo?.status
                      ? data?.paymentInfo?.status
                      : "Not Paid"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Subtotal</div>
                <div>${subTotal}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Shipping</div>
                <div>${shipping.toFixed()}</div>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <div>Total</div>
                <div>${data?.totalPrice.toFixed()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserOrderDetail;
