"use client"

import discountCouponCode from '@/schema/DiscountCouponCode';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const ApplyCoupon = () => {

    const form = useForm<z.infer<typeof discountCouponCode>>({
        resolver: zodResolver(discountCouponCode),
        defaultValues: {
          code: "",
        },
      });

      function onSubmit(values: z.infer<typeof discountCouponCode>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
      }

  return (
    <div className='w-full'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-row items-center gap-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Apply Coupon Code" {...field} className='bg-accent rounded-sm border-none w-[24rem]' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Apply Coupon</Button>
      </form>
    </Form>
    </div>
  )
}

export default ApplyCoupon
