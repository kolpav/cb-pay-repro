"use client";

import { ButtonHTMLAttributes, FunctionComponent } from "react";

import { twMerge } from "tailwind-merge";

export interface CoinbaseButtonProps
  extends ButtonHTMLAttributes<HTMLAnchorElement> {
  loading?: boolean;
  innerClassName?: string;
}

export const CoinbaseButton: FunctionComponent<CoinbaseButtonProps> = ({
  className,
  innerClassName,
  children,
  loading,
  ...props
}) => {
  const buttonClassName = twMerge("hover:cursor-pointer", className);

  return (
    <a className={buttonClassName} {...props}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="coinbase pay" src="/button-cbPay-normal-generic.png" />
    </a>
  );
};
