"use client";

import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const ManualHeader = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="border-b-8 flex items-center">
      <h1 className="font-bold text-3xl flex-grow">Decentralised Lottery</h1>
      <div className="flex justify-end">
        {connectors.map((connector) => (
          <button
            className="bg-blue-500 text-black font-bold py-2 px-4 rounded ml-2"
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
      </div>

      <div>{error?.message}</div>
    </div>
  );
};

export default ManualHeader;
