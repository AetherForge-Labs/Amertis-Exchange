import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { TokenList } from "@/lib/TokenList";
import { zoomIn } from "@/utils/anim";
import { useChainId, useAccount } from "wagmi";

import BottomSearchSection from "./BottomSearchSection";

import { BalProvider } from "@/context/provideBal";
import { useContext } from "react";

type tokenData = {
	icon: string;
	name: string;
	ca: string;
	ticker: string;
	tokenBalance: bigint | undefined;
	inputValue: string;
	price: string;
	decimals: number;
};
interface IProps {
	setToggleModal: (val: any) => void;
	ToggleModal: any;
	baseToken?: tokenData;
	ReverseTrade: any;
	quoteToken?: tokenData;
	setBaseToken?: any;
	setQuoteToken?: any;
}
const TokensModal = ({
	baseToken,
	quoteToken,
	setToggleModal,
	ReverseTrade,
	ToggleModal,
	setBaseToken,
	setQuoteToken,
}: IProps) => {
	const chainId = useChainId();
	const modalRef = useRef<any | null>();
	const { address } = useAccount();
	const { tokenBalances }: any = useContext(BalProvider);

	const [searchText, setSearchText] = useState<string>("");
	const [tokenList, setTokenList] = useState([]);
	const [balLoading, setBalLoading] = useState<boolean>(true);




	useEffect(() => {
		if (!tokenBalances.length) {
			setBalLoading(true);
		} else {
			setBalLoading(false);
			setTokenList(tokenBalances);
		}
	}, [tokenBalances]);

	const newTokenList = useMemo(() => {
		if (searchText === "") return tokenList;

		return tokenList?.filter(
			(_tokens: any) =>
				_tokens.name.toLowerCase().includes(searchText.toLowerCase()) ||
				_tokens.ticker.toLowerCase().includes(searchText.toLowerCase()) ||
				_tokens.ca.toLowerCase() === searchText.toLowerCase()
		);
	}, [searchText, tokenList]);

	const closeModal = () => {
		setToggleModal({ ...ToggleModal, mainToggle: false });
	};

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setToggleModal({ ...ToggleModal, mainToggle: false });
			}
		};

		addEventListener("mousedown", handleClickOutside);

		return () => {
			removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleTokenSelect = (selectedToken: any) => {
		if (
			selectedToken.ticker === quoteToken?.ticker ||
			selectedToken.ticker === baseToken?.ticker
		) {
			ReverseTrade();
		} else {
			const tokenToUpdate = ToggleModal.forBase ? setBaseToken : setQuoteToken;
			tokenToUpdate({
				name: selectedToken.name,
				ticker: selectedToken.ticker,
				icon: selectedToken.icon,
				inputValue: "",
				tokenBalance: selectedToken.balance ? selectedToken.balance : 0,
				ca: selectedToken.ca,
				price: selectedToken?.price,
				decimals: selectedToken.decimals,
			});
		}

		closeModal();
	};

	return (
		<main className=" w-dvw h-dvh  md:p-6 fixed top-0 z-50 ">
			<motion.section
				initial={zoomIn.initial}
				animate={zoomIn.animate}
				transition={zoomIn.transition}
				ref={modalRef}
				className=" w-dvw h-dvh  md:mt-[75px] md:h-[500px] md:w-[500px] md:border-[0.5px] md:border-mainFG bg-mainDark md:rounded-[30px] flex flex-col mx-auto">
				<TopSearchSection
					closeModal={closeModal}
					setSearchText={setSearchText}
					baseToken={baseToken}
					handleTokenSelect={handleTokenSelect}
				/>
				<BottomSearchSection
					handleTokenSelect={handleTokenSelect}
					baseToken={baseToken}
					quoteToken={quoteToken}
					newTokenList={newTokenList}
					chainID={chainId}
					address={address}
					balLoading={balLoading}
				/>
			</motion.section>
		</main>
	);
};

export default TokensModal;

// ------------------------------------------------------------------THE TOP SEARCH SECTION -----------------------------
const TopSearchSection = ({
	closeModal,
	baseToken,
	handleTokenSelect,
	setSearchText,
}: any) => {
	const chainId = useChainId();
	const tokenList = TokenList[chainId];
	const HistoryList = tokenList?.slice(0, 4);

	return (
		<div className=" border-b-[0.5px] border-mainFG p-5">
			<div className=" flex items-center justify-between gap-2 ">
				<div className=" flex items-center gap-4 bg-mainLight h-[40px] rounded-md flex-1 px-4">
					<BiSearch className=" shrink-0" />
					<input
						onChange={(e: any) => setSearchText(e.target.value)}
						type={"text"}
						className="focus:outline-none bg-transparent flex-1 placeholder:text-slate-300 placeholder:text-sm"
						placeholder="Search by name or Contract address"
					/>
				</div>
				<button
					onClick={closeModal}
					className=" bg-mainLight w-[40px] hover:bg-mainFG transition-colors duration-200 ease-linear h-[40px] rounded-md ">
					<IoClose className=" mx-auto" />
				</button>
			</div>
			<div className=" mt-4 flex flex-wrap gap-2">
				{HistoryList?.map((_tokens) => (
					<button
						key={_tokens.ticker}
						onClick={(e: any) => handleTokenSelect(_tokens)}
						className={` ${_tokens.ticker === baseToken.tokenName
							? "bg-mainFG"
							: "lg:hover:bg-mainLight"
							} flex items-center justify-center gap-1  transition-colors ease-linear duration-200 w-fit px-2 py-1 shadow-lg h-full rounded-3xl `}>
						<Image
							src={_tokens.icon}
							alt="icons"
							height={20}
							width={20}
							className="rounded-full"
						/>
						<div className=" flex items-center gap-2 ">
							<h2 className=" ">{_tokens.ticker}</h2>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};
