"use client";

import React, { ReactNode } from "react";
import { config, projectId } from "@/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();
// const config = getConfig();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
	wagmiConfig: config,
	projectId,

	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: true, // Optional - false as default
	themeMode: "dark",
	themeVariables: {
		"--w3m-color-mix": "#661a6e",
		// "--w3m-color-mix": "#8F199B",
		"--w3m-color-mix-strength": 40,
		"--w3m-accent": "#fff",
	},
	allWallets: "ONLY_MOBILE",
	includeWalletIds: [
		"c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
	],
});

export default function Web3ModalProvider({
	children,
	initialState,
}: {
	children: ReactNode;
	initialState?: State;
}) {
	return (
		<WagmiProvider
			config={config}
			initialState={initialState}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
