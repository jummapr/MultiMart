"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import React from "react";

const CustomUserLoad = ({ children }:Readonly<{
  children: React.ReactNode;
}>) => {
  // @ts-ignore
  const { isLoading } = useLoadUserQuery();
  return <div>{isLoading ? <h2>Loading...</h2> : children}</div>;
};

export default CustomUserLoad;
