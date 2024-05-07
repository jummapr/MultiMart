"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import Address from "./Address";

const AddressPage = () => {
  useAuthRedirect()
  return (
    <Address />
  );
};

export default AddressPage;
