import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { watchChainId } from "@wagmi/core";
import { getConfig } from "../wagmi";
import Swal from "sweetalert2";

const Account = () => {
  const validChainIds = [1, 11155111, 1337];
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (account.chainId) {
      console.log("Detected chain ID change:", account.chainId);

      if (!validChainIds.includes(account.chainId)) {
        Swal.fire({
          text: "Please select a valid chain (Ethereum, Sepolia, or HH Local)",
          icon: "warning", // Show warning for invalid chain
        });
      } else {
        Swal.fire({
          text: "Compatible Chain",
          icon: "success", // Show success for valid chain
        });
      }
    }
  }, [account.chainId]);

  return (
    <div className="border-b-8">
      <h2 className="font-bold text-3xl">Account</h2>

      <div>
        status: {account.status}
        <br />
        addresses: {JSON.stringify(account.addresses)}
        <br />
        chainId: {account.chainId}
      </div>

      {account.status === "connected" && (
        <button
          className="bg-blue-500 text-black font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      )}
    </div>
  );
};

export default Account;
