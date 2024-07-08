"use client";

import React, { ReactNode } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PaypalProviderProps {
  children: ReactNode;
}

export const PayPalProvider = ({ children }: PaypalProviderProps) => {
  return (
    <PayPalScriptProvider
      options={{
        components: "buttons",
        clientId:
          "AZjWtYMMpVqcEUI9uwG9yI8TectnFqlPnSnknDlHWz4G6cHjEvVmJPt3RAMAu225NOAocOwZacwDKmiy",
        currency: "USD",
        intent: "capture",
      }}
    >
        {children}
    </PayPalScriptProvider>
  );
};
