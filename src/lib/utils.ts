import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TokenList } from "./TokenList";
import { IToken } from "./interface";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const getTokensByChainId = (chainId: number): IToken[] => {
	return TokenList[chainId] || [];
};

