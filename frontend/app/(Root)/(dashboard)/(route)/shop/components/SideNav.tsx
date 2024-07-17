"use client";

import React from "react";
import {
  LayoutDashboard,
  ShoppingBasket,
  Users,
  Receipt,
  Ticket,
  ShoppingBag,
  FolderPlus,
  CalendarPlus,
  Settings,
  Gift,
  CircleDollarSign,
  MessageSquareMore,
  Banknote,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

function SideNav() {
  const pathname = usePathname();
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/shop/dashboard",
    },
    {
      label: "All Orders",
      icon: ShoppingBasket,
      href: "/shop/orders",
    },
    {
      label: "All Products",
      icon: ShoppingBag,
      href: "/shop/all-product",
    },
    {
      label: "Create Product",
      icon: FolderPlus,
      href: "/shop/create-product",
    },
    {
      label: "All Event",
      icon: CalendarPlus,
      href: "/shop/all-event",
    },
    {
      label: "Create Event",
      icon: CalendarPlus,
      href: "/shop/create-event",
    },
    {
      label: "Withdraw Money",
      icon: Banknote,
      href: "/shop/transaction",
    },
    {
      label: "Shop Inbox",
      icon: MessageSquareMore,
      href: "/shop/transaction",
    },
    {
      label: "Discount Coupon",
      icon: Gift,
      href: "/shop/create-coupon",
    },
    {
      label: "Refunds",
      icon: CircleDollarSign,
      href: "/shop/transaction",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/shop/transaction",
    },
  ];

  return (
    <div className="w-full h-full px-6 py-14 border-r border-y-2 border-gray-200">
      <div className="">
        <h3 className="font-semibold text-gray-400">DashBoard</h3>
      </div>

      <div className="pt-4">
        <div className="space-y-3">
          {routes.map((item) => (
            <>
              {/* <Link href={item.href} className="space-x-7"> */}
              <Link
                href={item.href}
                key={item.label}
                className={cn(
                  "text-sm group flex p-3 cursor-pointer rounded-lg  hover:bg-primary-foreground transition w-full",
                  pathname === item.href ? "button-selected-color " : ""
                )}
              >
                <div className="flex flex-row items-center space-x-3">
                  <item.icon size={20} />
                  <h3 className="font-medium text-sm">{item.label}</h3>
                </div>
              </Link>
              {/* </Link> */}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideNav;
