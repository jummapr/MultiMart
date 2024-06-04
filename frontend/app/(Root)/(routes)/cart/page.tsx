"use client";

import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Trash } from "lucide-react";
import { addToCart, removeFromCart } from "@/redux/features/cart/cartSlice";
import { useToast } from "@/components/ui/use-toast";
import CustomBreadCrumb from "@/components/comman/BreadCrumb";

const CartPage = () => {
  const { cart } = useSelector((state: any) => state.cart);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [isRemoveFromCart, setIsRemoveFromCart] = useState(false);
  const { toast } = useToast();

  const totalPrice = cart.reduce((acc: any, item: any) => {
    return acc + item?.discountPrice * item.qty;
  }, 0);

  const quantityChangeHandler = (data: any) => {
    dispatch(addToCart(data));
  };

  const removeFromCartHandler = (data: any) => {
    setIsRemoveFromCart(true);
    dispatch(removeFromCart(data));
    localStorage.setItem("cartItems", JSON.stringify(cart));
  };

  const incrementCount = (data: any) => {
    if (data?.stock < count) {
      toast({
        variant: "destructive",
        description: "Product stock limited!",
      });
    } else {
      setCount(count + 1);
      const updateCartData = { ...data, qty: count + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrementCount = (data: any) => {
    if (count > 1) {
      setCount(count - 1);
      const updateCartData = { ...data, qty: count - 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  useEffect(() => {
    // if (isRemoveFromCart) {
    //   localStorage.setItem("cartItems", JSON.stringify(cart));
    // }

    if (isRemoveFromCart) {
      localStorage.setItem("cartItems", JSON.stringify(cart));
      setIsRemoveFromCart(false);
      // console.log("Remove From Cart", isRemoveFromCart);
    }
  }, [isRemoveFromCart]);

  return (
    <div className="h-screen w-full">
      {cart && cart.length > 0 ? (
        <>
          <div className="w-full flex px-32 pt-14">
            <CustomBreadCrumb name="Cart" />
          </div>
          <div className="px-7 lg:px-36 py-24">
            <div className="flex w-full justify-start">
              <h2>Items ({cart.length})</h2>
            </div>

            <div className="grid w-full pt-7">
              <Table>
                <TableHeader>
                  <TableHead className="w-[24rem]">Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableHeader>
                <TableBody>
                  {cart &&
                    cart.map((item: any, i: number) => (
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <Image
                            src={item?.images[0]?.url}
                            alt="productImage"
                            width={80}
                            height={80}
                          />
                          <h2>{item?.name}</h2>
                        </TableCell>
                        <TableCell>
                          <h2>
                            $
                            {item?.discountPrice
                              ? item?.discountPrice
                              : item?.originalPrice}
                          </h2>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-start">
                            <Button
                              variant={"outline"}
                              className="hover:bg-primary rounded-none hover:text-white"
                              onClick={() => incrementCount(item)}
                            >
                              +
                            </Button>
                            <Button
                              variant={"outline"}
                              className="px-4 rounded-none hover:bg-white cursor-default"
                            >
                              {item?.qty}
                            </Button>
                            <Button
                              variant={"outline"}
                              className=" hover:bg-primary rounded-none hover:text-white"
                              onClick={() => decrementCount(item)}
                            >
                              -
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          $
                          {item?.discountPrice
                            ? item?.discountPrice * item?.qty
                            : item?.originalPrice * item?.qty}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => removeFromCartHandler(item?._id)}
                            variant={"outline"}
                          >
                            <Trash size={17} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            <div className="pt-10 flex w-full justify-end">
              <Card className="w-[23rem]">
                <CardHeader>
                  <CardTitle className="text-lg">Cart Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full flex flex-col items-center justify-center gap-y-4">
                    <div className="w-full flex items-center justify-between ">
                      <h3>Subtotal:</h3>
                      <h3>$679</h3>
                    </div>
                    <Separator />
                    <div className="w-full flex items-center justify-between ">
                      <h3>Shipping:</h3>
                      <h3>Free</h3>
                    </div>
                    <Separator />
                    <div className="w-full flex items-center justify-between ">
                      <h3>Total:</h3>
                      <h3>${totalPrice}</h3>
                    </div>

                    <Button>Process to checkout</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <h2 className="text-3xl">No Items in Cart</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
