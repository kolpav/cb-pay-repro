"use client";

import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  InitOnRampParams,
  initOnRamp,
  type CBPayInstanceType,
} from "@coinbase/cbpay-js";

import { CoinbaseButton } from "../CoinbaseButton/CoinbaseButton";

export interface CoinbasePayProps extends PropsWithChildren {
  id?: string;
  appId: string;
  address: string;
  amount?: number;
  onSuccess?: InitOnRampParams["onSuccess"];
  onError?: (error: Error) => void;
  onExit?: InitOnRampParams["onExit"];
  onEvent?: InitOnRampParams["onEvent"];
  className?: string;
}

type InitOnRampCallback = (
  error: Error | null,
  instance: CBPayInstanceType | null
) => void;

export const CoinbasePay: FunctionComponent<CoinbasePayProps> = (props) => {
  const [error, setError] = useState<Error | null>();
  const [loading, setLoading] = useState(false);
  const onRampInstance = useRef<CBPayInstanceType | null>(null);
  const buttonId = props.id || "cbpay-button-id";
  const containerId = `${buttonId}-container`;

  const onRampCallback = useCallback<InitOnRampCallback>(
    (error, instance) => {
      setError(error);
      onRampInstance.current = instance;
      setLoading(false);
      error && props.onError?.(error);
    },
    [props]
  );

  const handleOnClick = useCallback(() => {
    onRampInstance.current?.open();
  }, [onRampInstance]);

  useEffect(() => {
    setLoading(true);
    initOnRamp(
      {
        appId: props.appId,
        target: `#${buttonId}`,
        widgetParameters: {
          presetCryptoAmount: props.amount || 500,
          destinationWallets: [
            {
              address: props.address,
              assets: ["ACS"],
              supportedNetworks: ["solana"],
            },
          ],
        },
        onSuccess: () => {
          props.onSuccess?.();
        },
        onExit: (error) => {
          props.onExit?.(error);
        },
        onEvent: (event) => {
          props.onEvent?.(event);
        },
        experienceLoggedIn: "embedded",
        experienceLoggedOut: "popup",
        closeOnExit: true,
        closeOnSuccess: true,
        embeddedContentStyles: {
          target: containerId,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
        },
      },
      onRampCallback
    );
    return () => {
      onRampInstance.current?.destroy();
      onRampInstance.current = null;
    };
  }, [containerId, buttonId, onRampCallback, onRampInstance, props]);

  return (
    <div id={containerId} className={props.className}>
      <CoinbaseButton
        id={buttonId}
        onClick={handleOnClick}
        disabled={loading || !!error}
        loading={loading}
      >
        {error ? "Error" : props.children || "Buy ACS"}
      </CoinbaseButton>
    </div>
  );
};
