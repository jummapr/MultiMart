import React from "react";
import { Button } from "./ui/button";
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
import Link from "next/link";
import { Input } from "./ui/input";
import {
  BookUser,
  CircleDollarSign,
  Heart,
  ListRestart,
  LogOut,
  MessageCircleMore,
  Radar,
  Search,
  ShoppingBag,
  ShoppingCart,
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

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-center lg:justify-between w-full h-10 bg-[#000000] px-28">
        <div className="flex flex-row pl-52 text-center  items-center">
          <h2 className="text-white text-center hidden lg:flex">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </h2>
          <Button variant={"link"} className="text-white hidden lg:flex">
            Shop now
          </Button>
        </div>
        <div className="flex justify-end">
          <Select>
            <SelectTrigger className="w-[130px] border-none ring-offset-0 focus:ring-0 focus:ring-offset-0 bg-inherit text-white">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {languages.map((language) => (
                  <SelectItem value={language.code} key={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-between items-center px-28 w-full h-16 border border-b">
        <div className="flex flex-row">
          <h2 className="text-[#000000] font-semibold text-2xl">Exclusive</h2>
        </div>
        <div className="relative">
          <Input
            className="w-96 bg-[#F5F5F5] border-none focus:ring-0 focus:border-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
            placeholder="Search"
          />
          <Search className="w-5 h-5 absolute top-2 right-4" />
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
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
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
