import { StaticImageData } from "next/image";

export interface IToken {
	ca: string;
	name: string;
	ticker: string;
	icon: string;
	decimals: number;
}

export interface ITokenList {
	[chainId: number]: IToken[];
}

interface BalType {
	balance: BigInt;
}

export type TokenBalances = IToken & BalType;
