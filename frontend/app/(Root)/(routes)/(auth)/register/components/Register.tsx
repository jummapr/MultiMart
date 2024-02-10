"use clint";

import "./register.css";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const Register = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  function handleSubmit(values: z.infer<typeof RegisterFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const convert2Base24 = (file: any) => {};

  const onImageChange = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <Card className="w-[33rem] border">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Register to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          {avatar && (
            <Avatar className="w-20 h-20">
              <AvatarImage src={URL?.createObjectURL(avatar)} alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </div>
        <div>
          <Form {...Register}>
            <form
              onSubmit={Register.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={Register.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem  className="input-field-group">
                    <FormLabel>Full name</FormLabel>
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
                control={Register.control}
                name="email"
                render={({ field }) => (
                  <FormItem  className="input-field-group">
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
                control={Register.control}
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
                control={Register.control}
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
            </form>
          </Form>
        </div>

        <div className="w-full flex justify-end">
          <div>
            <Button variant={"link"} className="text-primary">
              Forget your password?
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          onClick={() => handleSubmit(Register.getValues())}
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
  );
};

export default Register;
