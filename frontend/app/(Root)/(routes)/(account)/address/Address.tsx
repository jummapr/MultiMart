"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useDeleteUserAddressMutation } from "@/redux/features/auth/authApi";
import { onOpen } from "@/redux/features/modal/addressModel";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Address = () => {
  const { user } = useSelector((state: any) => state.loadUser);
  const { isOpen } = useSelector((state: any) => state.addressModel);
  const [address, setAddress] = React.useState<any>([]);
  const {toast} = useToast();
  const dispatch = useDispatch();

  const [deleteUserAddress, { isLoading, isSuccess }] =
    useDeleteUserAddressMutation();

  const handleOpenAddressModel = () => {
    dispatch(onOpen());
  };

  const deleteAddressHandler = async(addresstype: string) => {
    console.log(addresstype);
    await deleteUserAddress(addresstype);
    toast({
      title: "Address deleted successfully",
    });
  };

  useEffect(() => {
    setAddress(user?.address);
  }, [isOpen]);
  return (
    <div className="px-10 xl:px-32 pt-24 h-screen w-full ">
      <div className="w-full flex items-center justify-between pb-16">
        <h3 className="font-semibold text-2xl">Addresses</h3>
        <Button onClick={handleOpenAddressModel}>Add new</Button>
      </div>
      <div className="w-full flex flex-col gap-4">
        {address?.map((item: any) => (
          <Card
            key={`${item?.zipCode}-${item?.addresstype}`}
            className="justify-center items-center shadow-md"
          >
            <CardContent className="flex items-center justify-center pt-5">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <h2 className="font-semibold text-sm lg:text-base ">
                    {item?.addresstype}
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <h3 className="font-semibold text-xs lg:text-base">
                    {item?.address1},{item?.address2},{item?.city},{item?.state}
                    ,{item?.country}
                  </h3>
                </div>
                <div>
                  <Button
                    variant={"ghost"}
                    onClick={() => deleteAddressHandler(item?.addresstype)}
                  >
                    <Trash className="text-red-500" size={15} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Address;
