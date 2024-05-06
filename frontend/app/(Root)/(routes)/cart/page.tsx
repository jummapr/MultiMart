"use client"

import React, { useState } from "react";
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

const CartPage = () => {

    const [count,setCount] = useState(0)

    const incrementCount = () => {
        setCount(count + 1)
      }
    
      const decrementCount = () => {
        if(count > 0) {
          setCount(count - 1)
        }
      }

  return (
    <div className="h-screen w-full">
      <div className="px-7 lg:px-36 py-24">
        <div className="flex w-full justify-start">
          <h2>Items (2)</h2>
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
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={"/product/chaiimage.png"}
                    alt="productImage"
                    width={80}
                    height={80}
                  />
                  <h2>HAVIT HV-G92 Gamepad </h2>
                </TableCell>
                <TableCell >
                  <h2>$2276</h2>
                </TableCell>
                <TableCell >
                  <div className="flex items-center justify-start">
                    <Button
                      variant={"outline"}
                      className="hover:bg-primary rounded-none hover:text-white"
                      onClick={incrementCount}
                    >
                      +
                    </Button>
                    <Button
                      variant={"outline"}
                      className="px-4 rounded-none hover:bg-white cursor-default"
                    >
                      {count}
                    </Button>
                    <Button
                      variant={"outline"}
                      className=" hover:bg-primary rounded-none hover:text-white"
                      onClick={decrementCount}
                    >
                      -
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                    $650
                </TableCell>
              </TableRow>
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
                  <h3>$1750</h3>
                </div>

                <Button>Process to checkout</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
