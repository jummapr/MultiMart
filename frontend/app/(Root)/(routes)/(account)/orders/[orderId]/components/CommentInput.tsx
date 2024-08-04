"use client";

import commentSchema from "@/schema/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
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
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { useReviewProductMutation } from "@/redux/features/product/productApi";

const CommentInput = () => {
  const [review, setReview] = useState<number>(0);
  const { productId } = useSelector((state: any) => state.commentModel);
  const { user } = useSelector((state: any) => state.loadUser);

  console.log("Product Id", productId);

  const [reviewProduct, { isLoading, isSuccess }] = useReviewProductMutation();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = {
      user: {
        name: user?.name,
        email: user?.email,
        _id: user?._id,
        avatar: user?.avatar,
        role: user?.role,
      },
      ratting: review,
      comment: values.comment,
      productId: productId,
    };
    await reviewProduct(data);
  }
  return (
    <div>
      <h3>Write a review</h3>

      <div className="w-full pt-3">
        <div className="pb-3">
          {/* @ts-ignore */}
          <Rating
            initialRating={0}
            onChange={(e) => setReview(e)}
            emptySymbol={
              <Image
                src={"/icons/Vector.png"}
                alt="rattingStarIcons"
                width={21}
                height={21}
              />
            }
            fullSymbol={
              <Image
                src={"/icons/fieldstar.png"}
                alt="rattingStarIcons"
                width={21}
                height={21}
              />
            }
          />
        </div>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write a review"
                        cols={10}
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end gap-3">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
