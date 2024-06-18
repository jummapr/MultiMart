import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { City, Country, State } from "country-state-city";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useToast } from "../ui/use-toast";
import Modal from "../ui/modal";
import { onClose } from "@/redux/features/modal/addressModel";
import addressSchema from "@/schema/addressSchema";
import {
  useUpdateUserAddressMutation,
  useUpdateUserAvatarMutation,
} from "@/redux/features/auth/authApi";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ClipboardType } from "lucide-react";
import { getCountryByCode, getStateByCode } from "@/lib/utils";

interface AddressDataType {
  name: string;
}

const AddressModel = () => {
  const { isOpen } = useSelector((state: any) => state.addressModel);
  const [avatar, setAvatar] = useState(null);

  const [updateUserAddress, { isLoading }] = useUpdateUserAddressMutation();

  const { toast } = useToast();
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [addressType, setAddressType] = useState("home");

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),

    defaultValues: {
      country: "",
      city: "",
      state: "",
      zipCode: "",
      address1: "",
      address2: "",
      addresstype: "",
    },
  });

  const addressData: AddressDataType[] = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const getAllCountry = () => {
    return Country.getAllCountries();
  };

  const onCloseModal = () => {
    dispatch(onClose());
  };

  async function handleAddress(values: z.infer<typeof addressSchema>) {
    const countryByCode = getCountryByCode(values.country);
    const stateByCode = getStateByCode(values.state, values.country);

    const addressData = {
      country: countryByCode?.name,
      state: stateByCode?.name,
      city: values.city,
      zipCode: values.zipCode,
      address1: values.address1,
      address2: values.address2,
      addresstype: values.addresstype,
    }

    await updateUserAddress(addressData);
    onCloseModal();
    console.log(values);
  }

  const handleSelectCountry = (e: any) => {
    console.log(e);
    setCountry(e);
    form.setValue("country", e);
  };
  const handleSelectState = (e: any) => {
    console.log(e);
    setState(e);
    form.setValue("state", e);
  };
  const handleSelectCity = (e: any) => {
    console.log(e);
    setCity(e);
    form.setValue("city", e);
  };

  const handleSelectAddressType = (e: any) => {
    console.log(e);
    setAddressType(e);
    form.setValue("addresstype", e);
  };
  

  return (
    <Modal className="max-w-[40rem]" isOpen={isOpen} onClose={onCloseModal}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddress)} className="space-y-4">
          <div className="w-full flex flex-row items-center gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select onValueChange={handleSelectCountry} value={country}>
                      <SelectTrigger className="w-full border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Country</SelectLabel>
                          {getAllCountry().map((item) => (
                            <SelectItem key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={handleSelectState}
                      value={state}
                      disabled={!country}
                    >
                      <SelectTrigger className="w-full border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent {...field}>
                        <SelectGroup>
                          <SelectLabel>State</SelectLabel>
                          {State.getStatesOfCountry(country) &&
                            State.getStatesOfCountry(country).map((item) => (
                              <SelectItem value={item.isoCode}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-row items-center gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={handleSelectCity}
                      value={city}
                      disabled={!state}
                    >
                      <SelectTrigger className="w-full border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent {...field}>
                        <SelectGroup>
                          <SelectLabel>City</SelectLabel>
                          {City.getCitiesOfState(country, state) &&
                            City.getCitiesOfState(country, state).map(
                              (item) => (
                                <SelectItem value={item.name}>
                                  {item.name}
                                </SelectItem>
                              )
                            )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the zip code..."
                      {...field}
                      className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-row items-center gap-4">
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Address 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the address 1"
                      {...field}
                      className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Address 2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the address 2"
                      {...field}
                      className="focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="addresstype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={handleSelectAddressType}
                    defaultValue="Home"
                    value={addressType}
                  >
                    <SelectTrigger className="w-full border-none focus-visible:ring-1 bg-accent rounded-sm focus-visible:ring-offset-0">
                      <SelectValue placeholder="Select a address type" />
                    </SelectTrigger>
                    <SelectContent {...field}>
                      <SelectGroup>
                        <SelectLabel>Address Type</SelectLabel>
                        {addressData &&
                          addressData.map((item) => (
                            <SelectItem value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/80 text-white"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddressModel;
