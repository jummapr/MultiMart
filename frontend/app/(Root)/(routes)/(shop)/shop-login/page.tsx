"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
    useLoginToShopMutation,
  useLoginUserMutation,
} from "@/redux/features/auth/authApi";
import { redirect } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { ShopLoginFormSchema } from "@/schema/shopLoginSchema";

const Login = () => {
  const [visible, setVisible] = useState(false);
  // const navigation = 
  const { isSeller } = useSelector((state: any) => state.seller);

  const { toast } = useToast();

  const [loginToShop, { isError, data, error, isSuccess, isLoading }] =
  useLoginToShopMutation();

  const ShopLogin = useForm<z.infer<typeof ShopLoginFormSchema>>({
    resolver: zodResolver(ShopLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("Data",data)

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      const message = data?.message;
      toast({
        description: message,
      });
      redirect("/")
    }
    if (error) {
      const errorData = error as any;
      console.log(errorData);
      toast({
        variant: "destructive",
        description: errorData.data.message,
      });
    }

    if(isSeller) {
      redirect("/")
    }
  }, [isSuccess, error,isSeller]);

  async function handleSubmit(values: z.infer<typeof ShopLoginFormSchema>) {
    await loginToShop(values);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form {...ShopLogin}>
        <form onSubmit={ShopLogin.handleSubmit(handleSubmit)} className="space-y-8">
          <Card className="w-[25rem] md:w-[30rem]  lg:w-[33rem] border">
            <CardHeader>
              <CardTitle>Welcome again to your shop!</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <FormField
                  control={ShopLogin.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="focus-visible:ring-1 focus-visible:ring-offset-0 "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={ShopLogin.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="input-field-group">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={visible ? "text" : "password"}
                            placeholder="Enter your password"
                            className="focus-visible:ring-1 focus-visible:ring-offset-0 "
                            {...field}
                          />
                          {visible ? (
                            <Eye
                              className="w-6 h-6 absolute top-2 right-3 cursor-pointer"
                              onClick={() => setVisible(!visible)}
                            />
                          ) : (
                            <EyeOff
                              className="w-6 h-6 absolute top-2 right-3 cursor-pointer"
                              onClick={() => setVisible(!visible)}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full flex justify-end">
                  <div>
                    <Button variant={"link"} className="text-primary">
                      Forget your password?
                    </Button>
                  </div>
                </div>

                <Button disabled={isLoading} type="submit" className="w-full text-lg py-5">
                  Login to shop
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-center">Don't have a shop?</p>
              <Link href={"/shop-create"}>
                <Button variant={"link"} className="text-primary">
                  Register 
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Login;
