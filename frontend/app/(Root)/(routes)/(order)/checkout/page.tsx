"use client";

import checkoutSchema from "@/schema/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { City, Country, State } from "country-state-city";
import {useRouter} from "next/navigation"

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ApplyCoupon from "@/components/ApplyCoupon";
import UserSavedAddress from "@/components/UserSavedAddress";

const Checkout = () => {
  const { cart } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.loadUser);
  const { seller } = useSelector((state: any) => state.seller);

  const { push } = useRouter();

  const { discountPrice, couponCodeData } = useSelector(
    (state: any) => state.coupon
  );

  console.log(discountPrice, couponCodeData, "Coupon Code data");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [checked, setChecked] = useState(false);

  console.log("Checked", checked);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name,
      email: user?.email,
      phone: String(user?.phoneNumber),
      country: country,
      city: city,
      state: state,
      address1: "",
      address2: "",
      zipCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof checkoutSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const getAllCountry = () => {
    return Country.getAllCountries();
  };

  const handleSelectCountry = (e: any) => {
    console.log(e);
    setCountry(e);
    form.setValue("country", e);
  };
  const handleSelectState = (e: any) => {
    console.log(e);
    setState(e);
    form.setValue("state", e);
  };
  const handleSelectCity = (e: any) => {
    console.log(e);
    setCity(e);
    form.setValue("city", e);
  };

  const subTotalPrice = cart.reduce((acc: number, item: any) => {
    return acc + item.qty * item.discountPrice;
  }, 0);

  const shipping = subTotalPrice * 0.1;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPrice).toFixed(2)
    : subTotalPrice + shipping;

    const handlePaymentSubmit = () => {
      const shippingAddress = {
        country: form.getValues(
          "country"
        ),
        state: form.getValues("state"),
        city: form.getValues("city"),
        zipCode: form.getValues("zipCode"),
        address1: form.getValues("address1"),
        address2: form.getValues("address2")
      }

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user
      }

      // update the localStorage with the updated arrays
      localStorage.setItem("latestOrder",JSON.stringify(orderData))
      push("/payment")
    } 

  return (
    <div className=" h-full">
      <div className="pt-20 px-20">
        <h1 className="text-[24px] font-[600] text-[#000]">Billing Details</h1>

        <div className="w-full flex flex-row  gap-32 pt-16 pb-16 px-4">
          <div className="w-full h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Full Name <span className="text-[#e75670]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          value={form.getValues("fullName")}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-[#e75670]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@doe.com"
                          {...field}
                          value={form.getValues("email")}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone <span className="text-[#e75670]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+91 9876543210"
                          {...field}
                          value={form.getValues("phone")}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={handleSelectCountry}
                        value={country}
                      >
                        <SelectTrigger className="w-full border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Country</SelectLabel>
                            {getAllCountry().map((item) => (
                              <SelectItem
                                key={item.isoCode}
                                value={item.isoCode}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        {checked ? (
                          <>
                            <Input
                              placeholder="State"
                              onChange={handleSelectState}
                              value={state}
                              className="bg-accent rounded-sm border-none w-full"
                            />
                          </>
                        ) : (
                          <>
                            <Select
                              onValueChange={handleSelectState}
                              value={state}
                              disabled={!country}
                            >
                              <SelectTrigger className="w-full border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0">
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent {...field}>
                                <SelectGroup>
                                  <SelectLabel>State</SelectLabel>
                                  {State.getStatesOfCountry(country) &&
                                    State.getStatesOfCountry(country).map(
                                      (item) => (
                                        <SelectItem value={item.isoCode}>
                                          {item.name}
                                        </SelectItem>
                                      )
                                    )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        {checked ? (
                          <>
                            <Input
                              placeholder="City"
                              onChange={handleSelectCity}
                              value={city}
                              className="bg-accent rounded-sm border-none w-full"
                            />
                          </>
                        ) : (
                          <>
                            <Select
                              onValueChange={handleSelectCity}
                              value={city}
                              disabled={!state}
                            >
                              <SelectTrigger className="w-full border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0">
                                <SelectValue placeholder="Select a city" />
                              </SelectTrigger>
                              <SelectContent {...field}>
                                <SelectGroup>
                                  <SelectLabel>City</SelectLabel>
                                  {City.getCitiesOfState(country, state) &&
                                    City.getCitiesOfState(country, state).map(
                                      (item) => (
                                        <SelectItem value={item.name}>
                                          {item.name}
                                        </SelectItem>
                                      )
                                    )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        zip Code <span className="text-[#e75670]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your zipCode"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Address 1 <span className="text-[#e75670]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Address 2 <span className="text-[#e75670]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          {...field}
                          className="bg-accent rounded-sm border-none w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div
                  className="pt-2 cursor-pointer"
                  onClick={() => setUserInfo(!userInfo)}
                >
                  <h4>Choose from saved addresses</h4>
                </div>

                <div>
                  {userInfo && (
                    <UserSavedAddress
                      country={setCountry}
                      city={setCity}
                      state={setState}
                      form={form}
                      userInfo={userInfo}
                      user={user}
                      setChecked={setChecked}
                    />
                  )}
                </div>

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <div className="w-full h-full">
            <Card>
              <CardContent className="py-4">
                {cart &&
                  cart.map((item: any) => (
                    <div className="flex justify-between items-center">
                      <div className="flex gap-6 items-center justify-center">
                        <Image
                          src={item?.images[0]?.url}
                          alt="productImage"
                          width={80}
                          height={80}
                        />
                        <h2>{item?.name}</h2>
                      </div>
                      <h4>
                        {" "}
                        $
                        {item?.discountPrice
                          ? item?.discountPrice * item?.qty
                          : item?.originalPrice * item?.qty}
                      </h4>
                    </div>
                  ))}

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center pt-9">
                    <h3>SubTotal: </h3>
                    <h3>${subTotalPrice}</h3>
                  </div>
                  <Separator />

                  <div className="flex justify-between items-center">
                    <h3>Shipping: </h3>
                    <h3>${shipping}</h3>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <h3>Discount: </h3>
                    <h3>- ${discountPrice}</h3>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <h3>Total: </h3>
                    <h3>
                      $
                      {totalPrice}
                    </h3>
                  </div>
                </div>

                <div className="flex w-full items-center pt-9">
                  <ApplyCoupon />
                </div>

                <div className="pt-10 w-full">
                  <Button type="submit" onClick={handlePaymentSubmit}>Place Order</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
