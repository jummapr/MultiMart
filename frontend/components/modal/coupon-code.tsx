"use client";

import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "@/redux/features/modal/couponCode";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import couponCodeSchema from "@/schema/createCouponSchema";

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
import { useAllProductMutation } from "@/redux/features/product/productApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCreateNewCouponMutation } from "@/redux/features/coupon/couponApi";

const CouponCodeModel = () => {
  const { isOpen } = useSelector((state: any) => state.couponModel);
  const { seller } = useSelector((state: any) => state.seller);
  const { allProduct: products } = useSelector((state: any) => state.product);
  const [allProduct, { isError, data, error, isSuccess, isLoading }] =
    useAllProductMutation();

  console.log(seller, "Seller");

  const [
    createNewCoupon,
    {
      isError: isCreateCouponError,
      error: createCouponError,
      isSuccess: isCreateCouponSuccess,
      isLoading: isCreateCouponLoading,
    },
  ] = useCreateNewCouponMutation();

  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(onClose());
  };

  const id = seller?.data?._id;

  const getAllProduct = async () => {
    await allProduct();
  };

  const CouponCodeForm = useForm<z.infer<typeof couponCodeSchema>>({
    resolver: zodResolver(couponCodeSchema),
    defaultValues: {
      name: "",
      value: "",
      maxAmount: "",
      minAmount: "",
      selectedProducts: "",
    },
  });

  async function onSubmit(values: z.infer<typeof couponCodeSchema>) {
    const couponData = {
      name: values.name,
      value: Number(values.value),
      minAmount: Number(values.minAmount),
      maxAmount: Number(values.maxAmount),
      selectedProducts: values.selectedProducts,
      shopId: seller?.data?._id,
    };
    await createNewCoupon(couponData);

    CouponCodeForm.reset();
    console.log(values);
    onCloseModal();
  }

  useEffect(() => {
    getAllProduct();
  }, [seller]);

  return (
    <Modal
      className="max-w-[30rem]"
      title="Create the discount coupon"
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <div>
        <Form {...CouponCodeForm}>
          <form
            onSubmit={CouponCodeForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={CouponCodeForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the coupon name.."
                      {...field}
                      className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={CouponCodeForm.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Discount Percentage <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the coupon name.."
                      {...field}
                      className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={CouponCodeForm.control}
              name="minAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the coupon min amount.."
                      {...field}
                      className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={CouponCodeForm.control}
              name="maxAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the coupon max amount.."
                      {...field}
                      className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={CouponCodeForm.control}
              name="selectedProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Product</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select a product category" />
                      </SelectTrigger>
                      <SelectContent {...field}>
                        <SelectGroup>
                          <SelectLabel>Product</SelectLabel>
                          {products &&
                            products.map((item: any) => (
                              <SelectItem value={item._id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CouponCodeModel;
