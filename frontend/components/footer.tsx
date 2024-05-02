import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full flex md:items-center md:justify-center bg-[#000000] px-6 py-16 lg:py-16">
      <div className="h-full flex flex-col sm:flex-row md:flex-row flex-wrap sm:gap-14 md:gap-14 lg:flex-row gap-y-12 lg:gap-32">

        <div className="flex flex-col w-auto">
          <h2 className="text-white text-2xl">Exclusive</h2>
          <div className="flex flex-col pt-6">
            <h4 className="text-white">Get 10% off your first order</h4>

            <div className="relative pt-4">
              <Input
                className="w-56 bg-[#F5F5F5] border-none focus:ring-0 focus:border-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                placeholder="Search"
              />
              <Search className="w-6 h-6 absolute top-6 right-4" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl font-medium">Support</h2>

          <div className="flex flex-col pt-4 gap-3">
            <h3 className="text-white text-sm w-52">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </h3>
            <h3 className="text-white">exclusive@gmail.com</h3>
            <h3 className="text-white">+88015-88888-9999</h3>
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl font-medium">Account</h2>

          <div className="flex flex-col pt-4">
            <ul className="flex flex-col gap-4 text-white">
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">My Account</li>
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">Login / Register</li>
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">Cart</li>
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">Wishlist</li>
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">Shop</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl font-medium">Quick Link</h2>

          <div className="flex flex-col pt-4">
            <ul className="flex flex-col gap-4 text-white">
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">Privacy Policy</li>
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">Terms Of Use</li>
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">FAQ</li>
              <li className="text-sm cursor-pointer hover:text-primary transition-colors">Contact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
