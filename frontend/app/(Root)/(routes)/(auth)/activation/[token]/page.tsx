"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useActivateAccountMutation } from "@/redux/features/auth/authApiSlice";
import LottieFiles from "@/assets/Animation - 1708317901234.json";
import Lottie from "react-lottie";


const page = () => {
  const params = useParams();
  const [activateAccount, { isError, isSuccess, isLoading }] =
    useActivateAccountMutation();

  useEffect(() => {
    if (params.token) {
      const activationToken = async () => {
        await activateAccount(params.token);
      };

      activationToken();
    }
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: LottieFiles,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        {isError && <h2>Your token is Expired</h2>}
        {isSuccess && <h2>Your account has been activated.</h2>}
      </div>
    </>
  );
};

export default page;
