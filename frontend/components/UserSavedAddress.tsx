"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Checkbox } from "./ui/checkbox";
import { getStateByCode } from "@/lib/utils";

interface UserSavedAddress {
  country: Dispatch<SetStateAction<string>>;
  city: Dispatch<SetStateAction<string>>;
  state: Dispatch<SetStateAction<string>>;
  form: any;
  userInfo: boolean;
  user: any;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

const UserSavedAddress = (data: UserSavedAddress) => {
  const { city, country, form, state, userInfo, user, setChecked } = data;

  const handleAddress = (
    index: number,
    i: any,
    setCountry: any,
    setState: any,
    setCity: any,
    zipCode: any,
    address1: any,
    address2: any
  ) => {
    setChecked(i);
    if (i === true) {
      country(user?.address[index]?.country || "");
      state(user?.address[index]?.state || "");
      city(user?.address[index]?.city || "");
      form.setValue("address1", address1);
      form.setValue("zipCode", zipCode);
      form.setValue("address2", address2);
    } else {
      country("");
      state("");
      city("");
      form.setValue("address1", "");
      form.setValue("zipCode", "");
      form.setValue("address2", "");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        {user?.address?.map((item: any, index: number) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id={item?.addresstype}
              onCheckedChange={(i) =>
                handleAddress(
                  index,
                  i,
                  item.country,
                  item.state,
                  item.city,
                  item.zipCode,
                  item.address1,
                  item.address2
                )
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item?.addresstype}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSavedAddress;
