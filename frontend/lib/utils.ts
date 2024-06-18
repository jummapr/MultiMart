import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge";
import { Country, State, City }  from 'country-state-city';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCountryByCode(code: string) {
  return Country.getCountryByCode(code);
}

export function getStateByCode(stateCode: string, countryCode: string) {
  return State.getStateByCodeAndCountry(stateCode,countryCode);
}