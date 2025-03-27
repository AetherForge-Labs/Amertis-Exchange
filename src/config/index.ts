export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

import { defineChain } from "viem";
import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia, base, blast } from "wagmi/chains";

export const monad = defineChain({
	id: 10143,
	name: "Monad Testnet",
	nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
	rpcUrls: {
		default: {
			http: ["https://testnet-rpc.monad.xyz/"],
		},
	},
	blockExplorers: {
		default: {
			name: "Monad Explorer",
			url: "http://testnet.monadexplorer.com/",
		},
	},
});

export const config = createConfig({
	chains: [monad],
	transports: {
		[monad.id]: http(),
	},
	ssr: true,
	storage: createStorage({
		storage: cookieStorage,
	}),
});
