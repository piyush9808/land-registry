import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import Header from "../components/Header";
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
  sepolia,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { RoleProvider } from "/context/RoleContext";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    sepolia,
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [alchemyProvider({ apiKey: "w1lbYSF3qXolRQSgEC3Z7bbsH44JZq2l" })]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "b9350b26279a2e1a303dbd833b75a485",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <RoleProvider>
          <Component {...pageProps} />
        </RoleProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
