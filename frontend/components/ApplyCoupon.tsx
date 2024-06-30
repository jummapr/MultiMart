"use client";

import discountCouponCode from "@/schema/DiscountCouponCode";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLazyGetCouponByNameQuery } from "@/redux/features/coupon/couponApi";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { couponDiscountPrice } from "@/redux/features/coupon/couponSlice";

const ApplyCoupon = () => {
  const { cart } = useSelector((state: any) => state.cart);

  const [discountPrice, setDiscountPrice] = useState<number>();

  const [trigger, { isLoading, isSuccess, data, error }] =
    useLazyGetCouponByNameQuery();
  
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof discountCouponCode>>({
    resolver: zodResolver(discountCouponCode),
    defaultValues: {
      code: "",
    },
  });

  const { toast } = useToast();

  console.log("Coupon Data", data);

  async function onSubmit(values: z.infer<typeof discountCouponCode>) {
    console.log(values);
    await trigger(values.code);
    form.reset();
  }

  useEffect(() => {
    const shopId = data?.data[0]?.shopId;
    const couponValue = data?.data[0]?.value

    if (isSuccess) {
      if (data?.data[0]?.name !== "") {
        const isCouponValid =
          cart && cart.filter((item: any) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast({
            title: "Invalid Coupon",
            description: "Coupon is not valid",
            variant: "destructive",
          });
        } else {
          const eligibleProducts = isCouponValid.reduce(
            (acc: any, item: any) => {
              return acc + item.qty * item.discountPrice;
            },
            0
          );

          const discountPrice = ((eligibleProducts * couponValue) / 100);
          dispatch(couponDiscountPrice(discountPrice));
        }
      } else {
        toast({
          title: "Coupon code does not exist",
          variant: "destructive",
        });
      }
    }
  }, [isSuccess, data]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-row items-center gap-6"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Apply Coupon Code"
                    {...field}
                    className="bg-accent rounded-sm border-none w-[24rem]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Apply Coupon</Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplyCoupon;
