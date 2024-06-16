import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { onOpen } from "@/redux/features/modal/addressModel";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const Address = () => {
  const dispatch = useDispatch();

  const handleOpenAddressModel = () => {
    dispatch(onOpen())
  }
  return (
    <div className="px-32 pt-24 h-screen w-full ">
      <div className="w-full flex items-center justify-between pb-16">
        <h3 className="font-semibold text-2xl">Addresses</h3>
        <Button onClick={handleOpenAddressModel}>Add new</Button>
      </div>
      <Card className="justify-center items-center shadow-md">
        <CardContent className="flex items-center justify-center pt-5">
          <div className="w-full flex items-center justify-between ">
            <div className="flex gap-4 items-center">
              <h2 className="font-semibold">Default</h2>
            </div>
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">
                +91 8846647555
              </h3>
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

export default Address;
