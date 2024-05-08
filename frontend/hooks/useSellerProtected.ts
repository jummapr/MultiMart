"use client"

import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { redirect } from "next/navigation";



const useSellerProtected = () => {
    const { isSeller } = useSelector((state: any) => state.seller);
    console.log("isSeller",isSeller)

    useEffect(() => {
        if(!isSeller) {
            redirect("/shop-login")
        }
    },[isSeller])


    return isSeller
}

export default useSellerProtected;