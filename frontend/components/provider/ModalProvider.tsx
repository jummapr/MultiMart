"use client";

import { useEffect, useState } from "react";

import PreViewModal from "../modal/preview-product";
import CouponCodeModel from "../modal/coupon-code";

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
    </>
  );
};
