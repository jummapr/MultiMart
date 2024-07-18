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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { useToast } from "@/components/ui/use-toast";
import {useRouter} from "next/navigation"
import { onOpen } from "@/redux/features/modal/commentModel";

const OrderDetailComponents = () => {
  const [status, setStatus] = useState("");

  const {push} = useRouter()

  const { sellerOrders } = useSelector((state: any) => state.order);
  const dispatch = useDispatch();

  const { toast } = useToast();

  const [updateOrderStatus, { isLoading, isSuccess, isError, error }] =
    useUpdateOrderStatusMutation();

  const { productId } = useParams();

  const data =
    sellerOrders && sellerOrders.find((item: any) => item._id === productId);


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

  const Status = [
    "Processing",
    "Transfer to delivery partner",
    "Shipping",
    "Receiving",
    "On the way",
    "Delivered",
  ].slice(
    [
      "Processing",
      "Transfer to delivery partner",
      "Shipping",
      "Receiving",
      "On the way",
      "Delivered",
    ].indexOf(data?.status)
  );

  const updateOrder = async () => {
    const OrderData: {
      orderId: string;
      data: string;
    } = {
      orderId: data?._id,
      data: status,
    };

    await updateOrderStatus({
      orderId: OrderData?.orderId,
      status: OrderData?.data,
    });
    push("/shop/orders")  
  };

  const onCommentModel = () => {
    dispatch(onOpen())
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Order status updated successful.",
        variant: "default",
      });
    }

    if (isError) {
      toast({
        title: "Order status updated failed.",
        variant: "destructive",
      });
    }
  },[isSuccess, isError]);

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
          <div className="pt-12 flex justify-end gap-3">
            <div>
              <Select value={status} onValueChange={(e) => setStatus(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Status.map((item: any) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button onClick={updateOrder}>Submit</Button>
            </div>
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

export default OrderDetailComponents;
