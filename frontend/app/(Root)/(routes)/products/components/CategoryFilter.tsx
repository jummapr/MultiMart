import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CategoryFilterSchema from "@/schema/categoryFilterSchema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CategoryFilterData } from "@/static/data";
import { useSearchParams } from "next/navigation";

const CategoryFilter = () => {
    const searchParams = useSearchParams();
    const categoryParams = searchParams.get("category") as string
  const categoryFilterForm = useForm<z.infer<typeof CategoryFilterSchema>>({
    resolver: zodResolver(CategoryFilterSchema),
    defaultValues: {
      items: [categoryParams && categoryParams],
    },
  });

  function onSubmit(data: z.infer<typeof CategoryFilterSchema>) {
    console.log(data);
  }

  useEffect(() => {
    // categoryFilterForm.setValue("items",categoryParams)
  })

  return (
    <div>
      <Form {...categoryFilterForm}>
        <form
          onChange={categoryFilterForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={categoryFilterForm.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Category</FormLabel>
                </div>

                {CategoryFilterData.map((item) => (
                  <FormField
                    key={item.id}
                    control={categoryFilterForm.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>

                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CategoryFilter;
