"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import {  Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import ChangePassword from "./ChangePassword";

const UpdatePasswordPage = () => {
  useAuthRedirect()
  return (
    <ChangePassword />
  );
};

export default UpdatePasswordPage;
