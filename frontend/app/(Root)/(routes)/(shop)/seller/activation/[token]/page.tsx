"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useActivateShopMutation } from "@/redux/features/auth/authApi";


const page = () => {
  const params = useParams();
  const [activateShop, { isError, isSuccess, isLoading }] =
  useActivateShopMutation();

  useEffect(() => {
    if (params.token) {
      const activationToken = async () => {
        await activateShop(params.token);
      };
      
      activationToken();
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        {isError && <h2>Your token is Expired</h2>}
        {isSuccess && <h2>Your shop creation has been activated.</h2>}
      </div>
    </>
  );
};

export default page;
