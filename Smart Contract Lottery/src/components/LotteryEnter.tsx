//@ts-nocheck
import React from "react";
import { useWriteContract } from "wagmi";
import abi from "../constants/abi";
import contractaddress from "../constants/addresses";
import { useState, useEffect } from "react";
import { readContract } from "@wagmi/core";
import {
  createPublicClient,
  http,
  createWalletClient,
  custom,
  WalletClient,
} from "viem";
import { hhlocal } from "../constants/customchain";
import { getConfig } from "../wagmi";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { Chain } from "viem";

const accountgenerate = async () => {
  const [accounts] = await window.ethereum!.request({
    method: "eth_requestAccounts",
  });
  return accounts;
};

const LotteryEnter = () => {
  const { writeContract } = useWriteContract();
  const [entrancefee, setentrancefee] = useState("0.0");
  const [numplayers, setnumplayers] = useState("0.0");
  const [winner, setwinner] = useState("0.0");
  const [showNotification, setshowNotification] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const config = getConfig();

  const client = createPublicClient({
    chain: hhlocal,
    transport: http(),
  });

  async function updateUI() {
    async function entrancefeeQuery() {
      try {
        const entrancefeeval = (await client.readContract({
          address: contractaddress,
          abi: abi,
          functionName: "getentrancefee",
        })) as BigInt;

        setentrancefee(entrancefeeval.toString());
      } catch (error) {
        console.error("Error fetching entrance fee:", error);
        // Handle the error here, such as displaying an error message to the user
      }
    }

    async function numplayersQuery() {
      try {
        const numplayers = (await client.readContract({
          address: contractaddress,
          abi: abi,
          functionName: "getnumplayers",
        })) as BigInt;

        setnumplayers(numplayers.toString());
      } catch (error) {
        console.error("Error fetching entrance fee:", error);
        // Handle the error here, such as displaying an error message to the user
      }
    }
    async function getWinnerQuery() {
      try {
        const winneraddy = (await client.readContract({
          address: contractaddress,
          abi: abi,
          functionName: "getwinner",
        })) as string;

        setwinner(winneraddy);
      } catch (error) {
        console.error("Error fetching entrance fee:", error);
        // Handle the error here, such as displaying an error message to the user
      }
    }
    entrancefeeQuery();
    numplayersQuery();
    getWinnerQuery();
  }
  updateUI();

  useEffect(() => {
    const unwatch = client.watchContractEvent({
      address: contractaddress,
      abi: abi,
      eventName: "WinnerPicked",
      onLogs: (logs) => {
        updateUI();
        console.log(logs);
      },
    });
  }, []);

  useEffect(() => {
    showNotification
      ? Swal.fire({
          text: "Lottery entered successfully",
          icon: "success", // Show warning for invalid chain
        })
      : null;
    setshowNotification(false);
  }, [showNotification]);

  async function enterlottery(walletclient: WalletClient) {
    const hash = await walletclient.writeContract({
      abi: abi,
      address: contractaddress,
      functionName: "enterlottery",
      args: [],
      value: BigInt(entrancefee),
    });
    console.log(hash);

    const transaction = await client.waitForTransactionReceipt({
      hash: hash,
    });
    console.log(transaction);
    transaction.status == "success"
      ? setshowNotification(true) && updateUI()
      : null;
  }

  const mutation = useMutation({
    mutationFn: (walletclient) => enterlottery(walletclient),
  });

  return (
    <div>
      <button
        className="bg-blue-500 text-black font-bold py-2 px-4 rounded"
        onClick={() =>
          accountgenerate().then((account) => {
            const walletclient = createWalletClient({
              account: account,
              chain: hhlocal,
              transport: custom(window.ethereum!),
            });
            mutation.mutate(walletclient);
          })
        }
      >
        {mutation.isPending ? (
          <div className="spinner border-t-transparent border-solid border-black border-4 rounded-full w-4 h-4 animate-spin mr-2"></div>
        ) : (
          <div>Enter Lottery</div>
        )}
      </button>
      <p>Entrance Fee: {entrancefee}</p>
      <p>Number Of Players: {numplayers}</p>
      <p>Winner: {winner}</p>
    </div>
  );
};
export default LotteryEnter;
