"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CreateProductSchema from "@/schema/createProduct";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoriesData } from "@/static/data";
import Image from "next/image";
import { useCreateNewProductMutation } from "@/redux/features/product/productApi";
import createEventFormSchema from "@/schema/createEvent";
import { DatePicker } from "@/components/ui/date-picker";
import { useCreateNewEventMutation } from "@/redux/features/event/eventApi";

const CreateEvent = () => {
  const { seller } = useSelector((state: any) => state.seller);
  const [images, setImages] = useState<File[]>([]);

  const [createNewEvent, { isError, data, error, isSuccess, isLoading }] =
    useCreateNewEventMutation();

  const createEventForm = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
  });

  async function onSubmit(values: z.infer<typeof createEventFormSchema>) {
    console.log(values);
    const formData: any = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("start_date", values.start_date);
    formData.append("finish_date", values.finish_date);
    formData.append("status", values.status);
    formData.append("tags", values.tags);
    formData.append("originalPrice", Number(values.originalPrice));
    formData.append("discountPrice", Number(values.discountPrice));
    formData.append("stock", Number(values.stock));
    formData.append("shopId", seller?.data?._id);
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    await createNewEvent(formData);

    setImages([]);
    createEventForm.reset();
  }

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setImages(files);
    }
  };

  return (
    <div className="w-full h-full py-16 flex justify-center items-center">
      <Card className="w-[40rem]">
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...createEventForm}>
            <form
              onSubmit={createEventForm.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={createEventForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the product name.."
                        {...field}
                        className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createEventForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="write your description..."
                        className="min-h-32 border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createEventForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-primary">*</span>
                    </FormLabel>
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
                            <SelectLabel>Categories</SelectLabel>
                            {categoriesData &&
                              categoriesData.map((item) => (
                                <SelectItem value={item.title}>
                                  {item.title}
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

              <FormField
                control={createEventForm.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex gap-1 flex-col">
                    <FormLabel>
                      Start Date <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        setValue={field.onChange}
                        className="bg-accent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createEventForm.control}
                name="finish_date"
                render={({ field }) => (
                  <FormItem className="flex gap-1 flex-col">
                    <FormLabel>
                      Finish Date <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        setValue={field.onChange}
                        className="bg-accent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createEventForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex gap-1 flex-col">
                    <FormLabel>
                      Status <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the product status.."
                        {...field}
                        className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createEventForm.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the product tags"
                        {...field}
                        className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createEventForm.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Original Price</FormLabel>
                    <FormControl>
                      {/* @ts-ignore */}
                      <Input
                        type="number"
                        placeholder="Enter your shop name"
                        className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createEventForm.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price (With Discount){" "}
                      <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Discount price"
                        {...field}
                        className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createEventForm.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Stock <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your product stock..."
                        {...field}
                        className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createEventForm.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload Images <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Enter your product stock..."
                        onChange={(e) => onImageChange(e)}
                        multiple
                        className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full h-full flex items-center gap-5">
                {images &&
                  images.map((i: any) => (
                    <div className="w-40">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src={URL.createObjectURL(i)}
                        width="84"
                      />
                    </div>
                  ))}
              </div>
              <div className="w-full">
                <Button type="submit" className="w-full">
                  Create{" "}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvent;
