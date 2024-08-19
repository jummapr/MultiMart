"use client";

import React, {useEffect, useState} from "react";
import Modal from "../ui/modal";
import {useDispatch, useSelector} from "react-redux";
import {onClose} from "@/redux/features/modal/ShopUpdateModel";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import shopUpdateSchema from "@/schema/shopEditSchema";
import {Textarea} from "@/components/ui/textarea";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Label} from "@/components/ui/label";
import {Camera} from "lucide-react";
import {useUpdateShopAvatarMutation, useUpdateShopInfoMutation} from "@/redux/features/shop/shopApi";
import {useToast} from "@/components/ui/use-toast";

const shopEditModel = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isOpen} = useSelector((state: any) => state.shopUpdateModel);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {seller, shop} = useSelector((state: any) => state.seller);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [avatar, setAvatar] = useState<File | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {toast} = useToast();
    // console.log("Seller Data", seller);

    // TODO: Intergate Update shop Api

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [updateShopAvatar, {isSuccess: AvatarLoading}] = useUpdateShopAvatarMutation();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [updateShopInfo, {isSuccess}] = useUpdateShopInfoMutation();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const shopUpdateForm = useForm<z.infer<typeof shopUpdateSchema>>({
        resolver: zodResolver(shopUpdateSchema),
        defaultValues: {
            shopName: "",
            email: "",
            phoneNumber: "",
            shopDescription: "",
            shopAddress: "",
            zipcode: "",
        },
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(onClose());
    };

    const ShopUpdateSubmit = async (values: z.infer<typeof shopUpdateSchema>) => {
        const data = {
            shopName: values.shopName,
            email: values.email,
            phoneNumber: Number(values.phoneNumber),
            description: values.shopDescription,
            address: values.shopAddress,
            zipcode: Number(values.zipcode)
        }
        await updateShopInfo(data);

        shopUpdateForm.reset();
        onCloseModal();
    }

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
        }

        const formData = new FormData();
        // @ts-ignore
        formData.append("file", file);

        await updateShopAvatar(formData);
        onCloseModal();
    }

    useEffect(() => {
        shopUpdateForm.setValue("shopName", seller?.data?.shopName);
        shopUpdateForm.setValue("email", seller?.data?.email);
        shopUpdateForm.setValue("shopAddress", seller?.data?.address);
        shopUpdateForm.setValue("phoneNumber", String(seller?.data?.phoneNumber));
        shopUpdateForm.setValue("shopDescription", seller?.data?.description);
        shopUpdateForm.setValue("zipcode", String(seller?.data?.zipcode));
    }, [isOpen]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (AvatarLoading) {
            toast({
                variant: "default",
                title: "Avatar updated successfully."
            });
        }
        if (isSuccess) {
            toast({
                variant: "default",
                title: "Shop Information updated successfully."
            })
        }
    }, [AvatarLoading, isSuccess]);

    // @ts-ignore
    return (
        <Modal
            className="max-w-[40rem]"
            title="Create the discount coupon"
            isOpen={isOpen}
            onClose={onCloseModal}
        >
            <Form {...shopUpdateForm}>
                <form onSubmit={shopUpdateForm.handleSubmit(ShopUpdateSubmit)} className="space-y-4">
                    <div className={"flex flex-row items-center gap-4"}>

                        <div className={"relative"}>
                            <Avatar className="w-20 h-20">
                                <AvatarImage
                                    src={avatar ? URL?.createObjectURL(avatar) : seller?.data?.avatar?.url}
                                    alt="avatar"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className={"absolute bottom-[5px] right-[3px]"}>
                                <Input type={"file"} id={"avatar"} className={"hidden"} accept="image/*"
                                       onChange={onImageChange}/>
                                <Label htmlFor={"avatar"}>
                                    <Camera size={20}/>
                                </Label>
                            </div>
                        </div>

                        <FormField
                            control={shopUpdateForm.control}
                            name="shopName"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Shop Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter the shop name"
                                            {...field}
                                            className="bg-accent rounded-sm border-none w-full"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={shopUpdateForm.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email Address"
                                            {...field}
                                            className="bg-accent rounded-sm border-none w-full"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={shopUpdateForm.control}
                        name="shopDescription"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Shop Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter the shop description."
                                        {...field}
                                        className="bg-accent rounded-sm border-none w-full"
                                        rows={5}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className={"flex flex-row items-center gap-4"}>
                        <FormField
                            control={shopUpdateForm.control}
                            name="phoneNumber"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Mobile Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter the number"
                                            {...field}
                                            className="bg-accent rounded-sm border-none w-full"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={shopUpdateForm.control}
                            name="shopAddress"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Shop Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter the shop address"
                                            {...field}
                                            className="bg-accent rounded-sm border-none w-full"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={shopUpdateForm.control}
                        name="zipcode"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input

                                        placeholder="Enter the zip code"
                                        {...field}
                                        className="bg-accent rounded-sm border-none w-full"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={AvatarLoading ? AvatarLoading : isSuccess ? isSuccess : false}>Update
                        Shop Information</Button>
                </form>
            </Form>
        </Modal>
    );
};

export default shopEditModel;
