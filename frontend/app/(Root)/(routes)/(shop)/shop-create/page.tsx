"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
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
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import {redirect} from "next/navigation"
import ShopCreateSchema from "@/schema/shopCreate";
import { useShopCreateApiMutation } from "@/redux/features/auth/authApi";

const ShopCreate = () => {
  const [visible, setVisible] = useState(false);

  const { isAuthenticated } = useSelector((state: any) => state.loadUser);

  const [avatar, setAvatar] = useState(null);
  const [shopCreateApi, { isError, data, error, isSuccess, isLoading }] =
    useShopCreateApiMutation();
  const {toast}= useToast();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Email sent to you." as string;
      toast({
        description: message,
      });
    }
    if (error) {
        const errorData = error as any;
        toast({
          variant: "destructive",
          description: errorData?.data?.message,
        });
    }
  }, [isSuccess, error,isAuthenticated]);


  const ShopCreateionState = useForm<z.infer<typeof ShopCreateSchema>>({
    resolver: zodResolver(ShopCreateSchema),
    // @ts-ignore
    defaultValues: {
      shopName: '',
      // @ts-ignore
      address: '',
      file: "", 
      email: '',
      password: '',
    },
  });


  async function handleSubmit(values: z.infer<typeof ShopCreateSchema>) {
    try {
      const formData: any = new FormData();
      formData.append("shopName", values.shopName);
      formData.append("phonenumber", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("zipcode", values.zipcode);
      formData.append("password", values.password);
      formData.append("file", avatar);
      await shopCreateApi(formData);

      console.log(formData)

      ShopCreateionState.reset();
    } catch (error) {
      console.log(error);
    }
  }


  const onImageChange = async(e: any) => {
    const file = e.target.files[0];
    console.log("File",file)
    await ShopCreateionState.setValue("file", file.name);
    setAvatar(file);
  };

  return (
    <div className="w-full flex items-center justify-center mt-12 mb-32">
      <Form {...ShopCreateionState}>
      <form
        onSubmit={ShopCreateionState.handleSubmit(handleSubmit)}
        className="space-y-12"
      >
        <Card className="w-[33rem] border">
          <CardHeader>
            <CardDescription>Register as seller</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              {avatar && (
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={URL?.createObjectURL(avatar)}
                    alt="avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <FormField
                control={ShopCreateionState.control}
                name="shopName"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Shop Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your shop name"
                        className="focus-visible:ring-1 focus-visible:ring-offset-0 "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ShopCreateionState.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                      type="number"
                        placeholder="Enter your shop name"
                        className="focus-visible:ring-1 focus-visible:ring-offset-0 "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ShopCreateionState.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Email"
                        className="focus-visible:ring-1 focus-visible:ring-offset-0 "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ShopCreateionState.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Shop Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Email"
                        className="focus-visible:ring-1 focus-visible:ring-offset-0 "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ShopCreateionState.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input
                      type="number"
                        placeholder="Enter your Email"
                        className="focus-visible:ring-1 focus-visible:ring-offset-0 "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              
              <FormField
                control={ShopCreateionState.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={visible ? "text" : "password"}
                          {...field}
                          placeholder="Enter your password"
                          className="focus-visible:ring-1 focus-visible:ring-offset-0 "
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
              <FormField
                control={ShopCreateionState.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="input-field-group pb-9">
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        onChange={(e) => {
                          field.onChange(e)
                          onImageChange(e)
                        }}
                        // {...field}
                        accept=".jpg,.jpeg,.png"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              // disabled={isLoading}
              type="submit"
              // onClick={() => handleSubmit(ShopCreateionState.getValues())}
              className="w-full text-lg py-5"
            >
              Register
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-center">Already have an account?</p>
            <Link href={"/login"}>
              <Button variant={"link"} className="text-primary">
                Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </Form>
    </div>
  );
};

export default ShopCreate;
