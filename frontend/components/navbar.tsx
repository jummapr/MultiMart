"use client";

import React, { use, useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constent";
import { Input } from "./ui/input";
import {
  BookUser,
  CircleDollarSign,
  Heart,
  ListRestart,
  LogOut,
  Menu,
  MessageCircleMore,
  Radar,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { productData } from "@/static/data";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { usePathname } from "next/navigation";
import {
  useLogoutShopMutation,
  useLogoutUserMutation,
} from "@/redux/features/auth/authApi";
import { useToast } from "./ui/use-toast";
import { redirect } from "next/navigation";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state: any) => state.loadUser);
  const { isSeller, seller } = useSelector((state: any) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any>(null);
  const { allProduct: products } = useSelector((state: any) => state.product);
  console.log("seller", seller);

  const [logoutUser, { isLoading: isLogoutLoading, isSuccess, data }] =
    useLogoutUserMutation();
  const [
    logoutShop,
    { isLoading: isShopLogoutLoadingSuccess, isSuccess: isLogoutSuccess },
  ] = useLogoutShopMutation();

  const { toast } = useToast();
  console.log(data);

  const handleSearchChange = (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterProducts =
    products &&
    products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setSearchData(filterProducts);
  };

  const handleLogout = async () => {
    await logoutUser();
    toast({ title: "User logged out successfully" });
    redirect("/login");
  };

  const handleShopLogout = async () => {
    await logoutShop();
    redirect("/shop-login");
  };

  return (
    <div>
      <div className="hidden md:flex md:justify-between items-center px-28 w-full h-16 border border-b">
        <div className="flex flex-row">
          <h2 className="text-primaryBlack font-semibold text-2xl">
            Exclusive
          </h2>
        </div>
        <div className="relative">
          <Input
            className="w-[20rem] lg:w-[30rem]  bg-[#F5F5F5] border-none focus:ring-0 focus:border-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="w-5 h-5 absolute top-2 right-4" />
          {searchData && searchData.length !== 0 ? (
            // <ScrollArea>

            <div className="absolute w-full max-h-96 bg-[#F5F5F5] shadow-sm-2 overflow-y-auto rounded-sm z-[9] p-4">
              {searchData &&
                searchData.map((i: any, index: any): any => {
                  return (
                    <Link href={`/product/${i._id}`} className="">
                      <div className="w-full py-3 px-4 flex hover:bg-gray-200 rounded-sm">
                        <Image
                          src={`${i.images[0]?.url}`}
                          alt=""
                          width={40}
                          height={40}
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : // </ScrollArea>
          null}
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="relative">
            <Heart className="w-7 h-7" />
            <div className=" absolute -top-1 -right-1 text-[10px] rounded-full text-center  bg-black text-white w-4 h-4">
              10
            </div>
          </div>
          <div className="relative">
            <ShoppingCart className="w-7 h-7" />
            <div className=" absolute -top-1 -right-1 text-[10px] rounded-full text-center  bg-black text-white w-4 h-4">
              10
            </div>
          </div>
          <div>
            {isSeller && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={seller?.data.avatar?.url} />
                    <AvatarFallback>JR</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>My Shop</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={`/shop/${seller?.data?._id}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        <Store className="mr-2 w-4 h-4" />
                        <span>My Shop</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user?.avatar?.url} />
                    <AvatarFallback>JR</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={"/profile"}>
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 w-4 h-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href={"/orders"}>
                      <DropdownMenuItem className="cursor-pointer">
                        <ShoppingBag className="mr-2 w-4 h-4" />
                        <span>Orders</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href={"/refund"}>
                      <DropdownMenuItem className="cursor-pointer">
                        <ListRestart className="mr-2 w-4 h-4" />
                        <span>Refund</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer">
                      <MessageCircleMore className="mr-2 w-4 h-4" />
                      <span>Inbox</span>
                    </DropdownMenuItem>
                    <Link href={"/trackorders"}>
                      <DropdownMenuItem className="cursor-pointer">
                        <Radar className="mr-2 w-4 h-4" />
                        <span>Track Order</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href={"/payment/method"}>
                      <DropdownMenuItem className="cursor-pointer">
                        <CircleDollarSign className="mr-2 w-4 h-4" />
                        <span>Payment Method</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href={"/address"}>
                      <DropdownMenuItem className="cursor-pointer">
                        <BookUser className="mr-2 w-4 h-4" />
                        <span>Address</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!isSeller && !isAuthenticated ? (
              <Link href="/login">
                <Button className="px-6">Login</Button>
              </Link>
            ) : null}
          </div>
          <Link href={"/shop-create"} className={buttonVariants()}>
            Become seller
          </Link>
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between px-6 sm:px-7 w-full h-16 border border-b">
        <div className="flex flex-row">
          <h2 className="text-primaryBlack font-semibold text-2xl">
            Exclusive
          </h2>
        </div>

        <div>
          <Sheet>
            <SheetTrigger>
              <Menu size={35} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <div className="relative">
                  <Input
                    className="w-[20rem] lg:w-[30rem]  bg-[#F5F5F5] border-none focus:ring-0 focus:border-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                    placeholder="Search"
                  />
                  <Search className="w-5 h-5 absolute top-2 right-10" />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <div className="relative">
                    <Heart className="w-7 h-7" />
                    <div className=" absolute -top-1 -right-1 text-[10px] rounded-full text-center  bg-black text-white w-4 h-4">
                      10
                    </div>
                  </div>
                  <div className="relative">
                    <ShoppingCart className="w-7 h-7" />
                    <div className=" absolute -top-1 -right-1 text-[10px] rounded-full text-center  bg-black text-white w-4 h-4">
                      20
                    </div>
                  </div>
                  <div>
                    {isAuthenticated ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Avatar>
                            <AvatarImage src={user?.avatar?.url} />
                            <AvatarFallback>JR</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                              <User className="mr-2 w-4 h-4" />
                              <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <ShoppingBag className="mr-2 w-4 h-4" />
                              <span>Orders</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <ListRestart className="mr-2 w-4 h-4" />
                              <span>Refund</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <MessageCircleMore className="mr-2 w-4 h-4" />
                              <span>Inbox</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Radar className="mr-2 w-4 h-4" />
                              <span>Track Order</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <CircleDollarSign className="mr-2 w-4 h-4" />
                              <span>Payment order</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <BookUser className="mr-2 w-4 h-4" />
                              <span>Address</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={handleLogout}
                              className="cursor-pointer"
                            >
                              <LogOut className="mr-2 w-4 h-4" />
                              <span>Logout</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link href="/login">
                        <Button className="px-6">Login</Button>
                      </Link>
                    )}
                  </div>
                  <Link href={"/becomeseller"} className={buttonVariants()}>
                    Become seller
                  </Link>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
