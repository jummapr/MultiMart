"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StripePaymentSchema } from "@/schema/stripe-paymentSchema";
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

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function PaymentCard() {
  const [activeTab, setActiveTab] = useState("card");
  const [orderData, setOrderData] = useState<any>([]);
  const { user } = useSelector((state: any) => state.loadUser);
  const { push } = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const form = useForm<z.infer<typeof StripePaymentSchema>>({
    resolver: zodResolver(StripePaymentSchema),
    defaultValues: {
      nameOnCard: "",
      CardNumber: "",
      expires: "",
      cvc: "",
    },
  });

  console.log("Expires", form.getValues("expires"));

  function onSubmit(values: z.infer<typeof StripePaymentSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const paypalPaymentHandler = async (data: any, action: any) => {};

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  useEffect(() => {
    const orderdata = localStorage.getItem("latestOrder") as string;
    setOrderData(JSON.parse(orderdata));
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Select your preferred payment method to complete your purchase.
          </CardDescription>
        </CardHeader>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsContent value="card">
            <CardContent className="grid gap-6">
              <RadioGroup
                defaultValue="card"
                className="grid grid-cols-3 gap-4 cursor-pointer"
                onChange={(e) => console.log(e)}
              >
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                    onClick={() => setActiveTab("card")}
                  />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCardIcon className="mb-3 h-6 w-6" />
                    <span>Card</span>
                  </Label>
                </div>
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="peer sr-only"
                    onClick={() => setActiveTab("paypal")}
                  />
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <WalletCardsIcon className="mb-3 h-6 w-6" />
                    <span>PayPal</span>
                  </Label>
                </div>
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="cash"
                    id="cash"
                    className="peer sr-only"
                    onClick={() => setActiveTab("cash")}
                  />
                  <Label
                    htmlFor="cash"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <DollarSignIcon className="mb-3 h-6 w-6" />
                    <span>Cash</span>
                  </Label>
                </div>
              </RadioGroup>
              <div className="grid gap-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="nameOnCard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name on card</FormLabel>
                          <FormControl>
                            <Input placeholder={user && user.name} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="CardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <CardNumberElement
                              className="rounded-md border border-input px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-ring focus-visible:ring-offset-1"
                              options={{
                                style: {
                                  base: {
                                    fontSize: "15px",
                                    lineHeight: "1.5",
                                    color: "#444",
                                  },
                                  empty: {
                                    color: "#9CA3AF",
                                    backgroundColor: "transparent",
                                    "::placeholder": {
                                      color: "#444",
                                      backgroundColor: "transparent",
                                    },
                                  },
                                },
                              }}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="expires"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expires</FormLabel>
                              <FormControl>
                                {/* className={
                                  cn(
                                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  )
                                } */}
                                <CardExpiryElement
                                  className="rounded-md border border-input px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-ring focus-visible:ring-offset-1"
                                  options={{
                                    style: {
                                      base: {
                                        fontSize: "15px",
                                        lineHeight: "1.5",
                                        color: "#444",
                                      },
                                      empty: {
                                        color: "#9CA3AF",
                                        backgroundColor: "transparent",
                                        "::placeholder": {
                                          color: "#444",
                                          backgroundColor: "transparent",
                                        },
                                      },
                                    },
                                  }}
                                  {...field}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="cvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                              <CardCvcElement 
                                  className="rounded-md border border-input px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-ring focus-visible:ring-offset-1"
                                  options={{
                                    style: {
                                      base: {
                                        fontSize: "15px",
                                        lineHeight: "1.5",
                                        color: "#444"
                                      },
                                      empty: {
                                        color: "#9CA3AF",
                                        backgroundColor: "transparent",
                                        "::placeholder" : {
                                          color: "#444",
                                          backgroundColor: "transparent"
                                        }
                                      }
                                    }
                                  }}
                                  {...field}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end items-center">
                      <Button type="submit">Pay Now</Button>
                    </div>
                  </form>
                </Form>
                {/* <div className="grid gap-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="First Last" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="number">Card Number</Label>
                  <Input id="number" placeholder="0000 0000 0000 0000" />
                </div> */}
                {/* <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="month">Expires</Label>
                    <Select>
                      <SelectTrigger id="month">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">01</SelectItem>
                        <SelectItem value="2">02</SelectItem>
                        <SelectItem value="3">03</SelectItem>
                        <SelectItem value="4">04</SelectItem>
                        <SelectItem value="5">05</SelectItem>
                        <SelectItem value="6">06</SelectItem>
                        <SelectItem value="7">07</SelectItem>
                        <SelectItem value="8">08</SelectItem>
                        <SelectItem value="9">09</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                        <SelectItem value="2029">2029</SelectItem>
                        <SelectItem value="2030">2030</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="CVC" />
                  </div>
                </div> */}

                {/* <div className="flex justify-end items-center">
                  <Button>Pay Now</Button>
                </div> */}
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="paypal">
            <CardContent className="grid gap-6">
              <RadioGroup
                defaultValue="paypal"
                className="grid grid-cols-3 gap-4 cursor-pointer"
                onChange={(e) => console.log(e)}
              >
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                    onClick={() => setActiveTab("card")}
                  />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCardIcon className="mb-3 h-6 w-6" />
                    <span>Card</span>
                  </Label>
                </div>
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className={cn(
                      "peer sr-only",
                      activeTab === "paypal" ? "border-primary" : ""
                    )}
                    onClick={() => setActiveTab("paypal")}
                  />
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <WalletCardsIcon className="mb-3 h-6 w-6" />
                    <span>PayPal</span>
                  </Label>
                </div>
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="cash"
                    id="cash"
                    className="peer sr-only"
                    onClick={() => setActiveTab("cash")}
                  />
                  <Label
                    htmlFor="cash"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <DollarSignIcon className="mb-3 h-6 w-6" />
                    <span>Cash</span>
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex flex-col items-center justify-center">
                <WalletCardsIcon className="mb-3 h-12 w-12" />
                <div className="text-lg font-medium">Pay with PayPal</div>
                <p className="text-muted-foreground">
                  Securely checkout with your PayPal account.
                </p>
              </div>
              <div className="flex justify-end items-center">
                <Button>Pay Now</Button>
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="cash">
            <CardContent className="grid gap-6">
              <RadioGroup
                defaultValue="cash"
                className="grid grid-cols-3 gap-4 cursor-pointer"
                onChange={(e) => console.log(e)}
              >
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                    onClick={() => setActiveTab("card")}
                  />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCardIcon className="mb-3 h-6 w-6" />
                    <span>Card</span>
                  </Label>
                </div>
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="peer sr-only"
                    onClick={() => setActiveTab("paypal")}
                  />
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <WalletCardsIcon className="mb-3 h-6 w-6" />
                    <span>PayPal</span>
                  </Label>
                </div>
                <div className="cursor-pointer">
                  <RadioGroupItem
                    value="cash"
                    id="cash"
                    className="peer sr-only"
                    onClick={() => setActiveTab("cash")}
                  />
                  <Label
                    htmlFor="cash"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <DollarSignIcon className="mb-3 h-6 w-6" />
                    <span>Cash</span>
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex flex-col items-center justify-center">
                <DollarSignIcon className="mb-3 h-12 w-12" />
                <div className="text-lg font-medium">Pay with Cash</div>
                <p className="text-muted-foreground">
                  Select cash as your payment method to pay in person.
                </p>
              </div>

              <div className="flex justify-end items-center">
                <Button>Pay Now</Button>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        {/* <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Pay Now</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function WalletCardsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  );
}
