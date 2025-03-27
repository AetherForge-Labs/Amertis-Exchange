import { getBalance } from "viem/actions";
import { useAccount, useBalance } from "wagmi";
import { useChainId } from "wagmi";

const useFetchBalance = (
	walletAddress: `0x${string}`,
	scopeKey: string,
	tokenAddress?: string
) => {
	const { chainId } = useAccount();
	const chain = useChainId();
	const tokenTicker = scopeKey.split("-")[1];
	const isChainCorrect = chainId === chain;

	const {
		data: result,
		refetch,
		status,
		isLoading: isloading,
		isError,
		error,
	} = useBalance({
		address:
			isChainCorrect && tokenAddress
				? (walletAddress as `0x${string}`)
				: undefined,
		blockTag: "latest",
		token:
			tokenTicker?.toUpperCase() === "MON"
				? undefined
				: (tokenAddress as `0x${string}`),
	});

	return {
		data: result?.value,
		refetch: refetch,
		status: status,
		isloading,
		isError: isError,
		error: error,
	};
};

export default useFetchBalance;
