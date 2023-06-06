"use client";

import { FunctionComponent, useCallback, useState } from "react";

import { CoinbasePay } from "../CoinbasePay/CoinbasePay";

export const CoinbaseDebug: FunctionComponent = () => {
  const [address, setAddress] = useState<string>(
    "GRQ6CKvYkA5zToPerRq79bdmrqvvky7zL271NCPKPxbB"
  );
  const [appId, setAppId] = useState<string>(
    "9ca47f07-32cc-4bbd-9bc0-d72625b5dada"
  );
  const [amount, setAmount] = useState<number>(1.0);

  const handleAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value),
    []
  );
  const handleAppIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setAppId(e.target.value),
    []
  );
  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setAmount(Number.parseFloat(e.target.value)),
    []
  );

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="address">Address:</label>
          <input
            className="w-full border border-black"
            name="address"
            type="text"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label htmlFor="appId">AppId:</label>
          <input
            className="w-full border border-black"
            name="appId"
            type="text"
            value={appId}
            onChange={handleAppIdChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            className="w-full border border-black"
            name="amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      <CoinbasePay
        className="relative flex items-center justify-center border-2 border-dashed border-sky-500 py-52"
        onSuccess={console.log}
        onError={console.log}
        onExit={console.log}
        onEvent={console.log}
        amount={amount}
        address={address}
        appId={appId}
      />
    </div>
  );
};
