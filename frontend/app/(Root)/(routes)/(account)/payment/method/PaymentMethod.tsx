import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import {  Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const PaymentMethod = () => {
  return (
    <div className="px-32 pt-24 h-screen w-full ">
      <div className="w-full flex items-center justify-between pb-16">
        <h3 className="font-semibold text-2xl">Payment Methods</h3>
        <Button>Add new</Button>
      </div>
      <Card className="justify-center items-center shadow-md">
        <CardContent className="flex items-center justify-center pt-5">
          <div className="w-full flex items-center justify-between ">
            <div className="flex gap-4 items-center">
              <Image
                src="/icons/card.png"
                alt="Card Image"
                width={40}
                height={40}
              />
              <h2 className="font-semibold">Jumma Hingorja</h2>
            </div>
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">1234 **** *** ****</h3>
              <h3 className="font-semibold">08/2025</h3>
            </div>
            <div>
              <Button variant={"ghost"}>
                <Trash className="text-red-500" size={20} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethod;
