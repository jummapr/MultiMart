import { apiSlice } from "../api/apiSlice";
import { setStripeApiKey } from "./paymentSlice";

export const PaymentAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  }),
});

export const {
} = PaymentAPi;
