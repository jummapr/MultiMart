"use clint";

import "./register.css";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterFormSchema } from "../Schema";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import {redirect} from "next/navigation"

const Register = () => {
  const [visible, setVisible] = useState(false);

  const { isAuthenticated } = useSelector((state: any) => state.loadUser);

  const [avatar, setAvatar] = useState(null);
  const [register, { isError, data, error, isSuccess, isLoading }] =
    useRegisterMutation();
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
          description: errorData.data.message,
        });
    }

    if(isAuthenticated) {
      redirect("/")
    }
    
  }, [isSuccess, error,isAuthenticated]);


  const RegisterState = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof RegisterFormSchema>) {
    try {
      const formData: any = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("file", avatar);
      await register(formData);

      RegisterState.reset();
    } catch (error) {
      console.log(error);
    }
  }

  const convert2Base24 = (file: any) => {};

  const onImageChange = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
    RegisterState.setValue("file", file.name);
  };

  return (
    <Form {...RegisterState}>
      <form
        onSubmit={RegisterState.handleSubmit(handleSubmit)}
        className="space-y-8"
      >
        <Card className="w-[33rem] border">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Register to your account</CardDescription>
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
            <div>
              <FormField
                control={RegisterState.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Full Name"
                        className="focus-visible:ring-1 focus-visible:ring-offset-0 "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RegisterState.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="input-field-group">
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
                control={RegisterState.control}
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
                control={RegisterState.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="input-field-group">
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        onChange={(e) => onImageChange(e)}
                        accept=".jpg,.jpeg,.png"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex justify-end">
              <div>
                <Button variant={"link"} className="text-primary">
                  Forget your password?
                </Button>
              </div>
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              // onClick={() => handleSubmit(RegisterState.getValues())}
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
  );
};

export default Register;
