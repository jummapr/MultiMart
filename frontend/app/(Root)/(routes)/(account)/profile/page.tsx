"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import profileSchema from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

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
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useUpdateUserInfoMutation } from "@/redux/features/auth/authApi";
import { onOpen } from "@/redux/features/modal/authModel";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

const ProfilePage = () => {

  // useAuthRedirect()

  const [ updateUserInfo,{isLoading} ] = useUpdateUserInfoMutation();
  const dispatch  = useDispatch();
  const { user } = useSelector((state: any) => state.loadUser);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: "",
      phoneNumber: user?.phoneNumber ? user?.phoneNumber : Number(""),
      address1: user?.address1 ? user?.address1 : "",
      address2: user?.address2 ? user?.address : "",
      zipcode: user?.zipcode ? user?.zipcode : null,
    },
  });

  const onProfileSubmit = async(values: z.infer<typeof profileSchema>) => {
    console.log(values);
    await updateUserInfo(values)
  };

  const handleAuthModel = () => {
    console.log("clicked")
    dispatch(onOpen())
  }


  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[45rem] flex flex-col justify-center items-center">
        <div className="w-full flex items-center flex-col justify-center gap-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.avatar?.url}></AvatarImage>
          </Avatar>
          <Button variant={"ghost"} onClick={() => handleAuthModel()}>Change Avatar</Button>
        </div>
        <div className="w-full pt-5">
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-8 w-full "
            >
              <div className="flex flex-col px-8 lg:flex-row gap-6 items-center w-full">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex px-8 lg:flex-row gap-5 items-center w-full">
                <FormField
                  control={profileForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        {/* @ts-ignore */}
                        <Input
                        type="number"
                          placeholder="Phone Number"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        {/* @ts-ignore */}
                        <Input
                          placeholder="Password"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <div className="flex px-8 flex-col lg:flex-row gap-5 items-center w-full">
                <FormField
                  control={profileForm.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address 1"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address 2"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
              <div className="w-full flex items-center justify-center">
                <Button type="submit" disabled={isLoading}>Update</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
