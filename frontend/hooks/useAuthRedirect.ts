"use client"

import { useEffect } from "react";
import { UseSelector, useSelector } from "react-redux";
import { redirect } from "next/navigation";



const useAuthRedirect = () => {
    const { isAuthenticated } = useSelector((state: any) => state.loadUser);

    useEffect(() => {
        if(!isAuthenticated) {
            redirect("/login")
        }
    },[isAuthenticated])


    return isAuthenticated
}

export default useAuthRedirect;