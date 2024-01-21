import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const errMessage = (err: any) => {
  let message = err.message;
  if (err.code) {
    switch (err.code) {
      case "P2002":
        message = `${err?.meta?.modelName} Already Exists with this ${err?.meta?.target[0]} `;
        break;
      default:
        break;
    }
  }
  return message;
};
