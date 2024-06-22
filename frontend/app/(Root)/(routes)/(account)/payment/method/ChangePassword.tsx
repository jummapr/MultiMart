"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateChangePasswordSchema } from "@/schema/updatePassword";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";
import { useToast } from "@/components/ui/use-toast";

const ChangePassword = () => {

  const {toast} = useToast()
  const [updatePassword, {isLoading,isSuccess, isError, error}] = useUpdatePasswordMutation()

  const changePasswordForm = useForm<z.infer<typeof updateChangePasswordSchema>>({
    resolver: zodResolver(updateChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof updateChangePasswordSchema>) {
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    }
    await updatePassword(data);

    changePasswordForm.reset();
    console.log(values);
  }

  useEffect(() => {
    if(isSuccess){
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      })
    }

    if(isError){
      toast({
        title: "Error",
        description: error?.data.message,
        variant: "destructive",
      })
    }
  }, [isSuccess, isError])

  return (
    <div className="px-24 lg:px-32 pt-24 h-screen w-full ">
      <div className="w-full flex items-center justify-between pb-16">
        <h3 className="font-semibold text-2xl">Update Password</h3>
      </div>
      <div className="w-full flex justify-center items-center">
      <Form {...changePasswordForm}>
        <form onSubmit={changePasswordForm.handleSubmit(onSubmit)} className="space-y-5 w-1/2 lg:w-1/3">
          <FormField
            control={changePasswordForm.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Old Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={changePasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="New Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={changePasswordForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
