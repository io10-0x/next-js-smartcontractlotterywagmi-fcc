import { defineChain } from "viem";

export const hhlocal = defineChain({
  id: 1337,
  name: "HH Local",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545/"],
    },
  },
});
