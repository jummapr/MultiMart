"use client";

import "../login.css";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormSchema } from "../Schema";
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

const Login = () => {
  const [visible, setVisible] = useState(false);
  // 1. Define your form.
  const Login = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(values: z.infer<typeof LoginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <Card className="w-[25rem] md:w-[30rem]  lg:w-[33rem] border">
        <CardHeader>
          <CardTitle>Welcome again!</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...Login}>
              <form
                onSubmit={Login.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={Login.control}
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
                  control={Login.control}
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

                <Button type="submit" className="w-full text-lg py-5">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center">Don't have an account?</p>
          <Link href={"/register"}>
            <Button variant={"link"} className="text-primary">
              Register
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
