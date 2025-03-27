"use client";
import { useEffect, useRef, useState } from "react";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { TokenBalances } from "@/lib/interface";
import { createContext } from "react";
import { TokenList } from "@/lib/TokenList";
import { config } from "@/config";
import { erc20Abi } from "viem";

export const BalProvider = createContext<null | object>(null);

const ProvideBal = ({ children }: { children: React.ReactNode }) => {
	const { address } = useAccount();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const [tokenBalances, setTokenBalances] = useState<TokenBalances[] | []>([]);
	const [tokenList, setTokenList] = useState();

	const tokens = TokenList[config.chains[0].id];

	const calls = tokens.map((token) => ({
		address: token.ca as `0x${string}`,
		abi: erc20Abi,
		functionName: "balanceOf",
		args: [address],
	}));

	const { data: tokenBals } = useReadContracts({
		config: config,
		batchSize: 0,
		contracts: calls,
		multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11" as `0x${string}`,
		query: {
			staleTime: 10_000,
			refetchInterval: 10_000,
			enabled: !!address,
		},
	});

	const { data: monBal } = useBalance({
		config: config,
		address: address as `0x${string}`,
		query: {
			staleTime: 10_000,
			refetchInterval: 10_000,
			enabled: !!address,
		},
	});

	useEffect(() => {
		setTokenBalances(
			tokens
				.map((token, index) => ({
					...token,
					balance:
						token.ticker.toUpperCase() === "MON"
							? (monBal?.value as bigint)
							: (tokenBals?.[index]?.result as bigint),
				}))
				.sort((a, b) => Number(b.balance) - Number(a.balance))
		);
	}, [monBal, tokenBals]);

	const refetch = () => { };

	return (
		<BalProvider.Provider value={{ tokenBalances, refetch }}>
			{children}
		</BalProvider.Provider>
	);
};

export default ProvideBal;
