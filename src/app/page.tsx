"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import ManualHeader from "../components/ManualHeader";
import Account from "../components/Account";
import LotteryEnter from "../components/LotteryEnter";

function App() {
  return (
    <div>
      <ManualHeader />
      <Account />
      <LotteryEnter />
    </div>
  );
}

export default App;
