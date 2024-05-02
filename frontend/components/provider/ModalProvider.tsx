"use client";

import { useEffect, useState } from "react";

import PreViewModal from "../modal/preview-product";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null;

  return (
    <>
        <PreViewModal />
    </>
  )
};
