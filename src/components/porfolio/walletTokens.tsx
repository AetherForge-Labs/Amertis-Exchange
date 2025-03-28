import { IToken } from "@/lib/interface";
import { getBalance, readContract } from "@wagmi/core";
import { config } from "@/config";
import { abi } from "@/config/basicTokenAbi";
import { TokenList } from "@/lib/TokenList";
import { TokenBalances } from "@/lib/interface";
import { Config } from "wagmi";
const getWalletTokens = async (
	_chainId: number,
	address: `0x${string}` | undefined
): Promise<TokenBalances[]> => {
	try {
		const _promise = (_token: IToken) =>
			new Promise<any>(async (res, rej) => {
				try {
					if (_token.ticker.toUpperCase() === "MON") {
						const bal = await getBalance(config as Config, {
							address: `0x${address?.replace("0x", "")}`,
						});
						const newToken = { ..._token, bal: bal.value };
						return res(newToken);
					}
					const bal = await readContract(config as Config, {
						abi: abi,
						address: `0x${_token.ca.replace("0x", "")}`,
						functionName: "balanceOf",
						args: [address],
					});
					const newToken = { ..._token, bal: bal };
					return res(newToken);
				} catch (error) {
					console.error("ERRO FROM WALLET TOKENS ", error);
					rej(error);
				}
			});

		const newTokenList = await Promise.all(
			TokenList[_chainId].map((_token: IToken) => _promise(_token))
		);
		return newTokenList;
	} catch (error) {
		console.error("ERROR FROM WALLET TOKENS (PROMISE.ALL) --- ", error);
		return [];
	}
};

export default getWalletTokens;
