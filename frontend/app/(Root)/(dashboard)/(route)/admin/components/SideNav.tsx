"use client";

import React from "react";
import { LayoutDashboard, ShoppingBasket, Users, Receipt,Ticket  } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

function SideNav() {
  const pathname = usePathname();
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      label: "Product",
      icon: ShoppingBasket,
      href: "/admin/product",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
    },

    {
      label: "Transaction",
      icon: Receipt,
      href: "/admin/transaction",
    },
    {
      label: "Coupon",
      icon: Ticket,
      href: "/admin/transaction",
    },
  ];

  return (
    <div className="w-full h-full px-6 py-16 border-r border-y-2 border-gray-200">
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
