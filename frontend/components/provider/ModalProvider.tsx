"use client";

import { useEffect, useState } from "react";

import PreViewModal from "../modal/preview-product";
import CouponCodeModel from "../modal/coupon-code";
import UpdateAvatar from "../modal/update-avatar";
import AddressModel from "../modal/address";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <PreViewModal />
      <CouponCodeModel />
      <UpdateAvatar />
      <AddressModel />
    </>
  );
};
