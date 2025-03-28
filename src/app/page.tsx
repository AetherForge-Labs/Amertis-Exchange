"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
	TopSwap,
	BottomSwap,
	TokensModal,
	SettingModal,
	Info,
	TransactionModal,
} from "../components/trade";

// REACT ICONS
import { FiSettings } from "react-icons/fi";
import { RxReload } from "react-icons/rx";
import { GrFormNext } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { RiArrowUpDownFill } from "react-icons/ri";

import useFetchBalance from "@/hooks/useFetchBalance";
import { useAccount, useTransactionConfirmations, useChainId } from "wagmi";
import { formatUnits } from "viem";
import UseSwap from "@/hooks/useSwap";
import { getTokensByChainId } from "@/lib/utils";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { toast } from "react-toastify";
import { fadeIn, pageIn } from "@/utils/anim";

export default function Home() {
	const chainId = useChainId();
	const tokenList = getTokensByChainId(chainId);
	const { open } = useWeb3Modal();

	const [txModal, setTxModal] = useState<boolean>(false);
	const [txState, setTxState] = useState<string>("");
	const [txErr, setTxErr] = useState("");
	const [ToggleModal, setToggleModal] = useState<any>({
		mainToggle: false,
		forBase: true,
	});
	const { address, isConnected, isDisconnected } = useAccount();
	const [settingToggle, setSettingToggle] = useState<boolean>(false);
	const [baseToken, setBaseToken] = useState({
		...tokenList[0],
		tokenBalance: BigInt(0),
		inputValue: "",
		price: "",
	});
	const [quoteToken, setQuoteToken] = useState({
		tokenBalance: BigInt(0),
		inputValue: "",
		ca: "",
		name: "",
		ticker: "",
		icon: "",
		price: "",
		decimals: 0,
	});
	const {
		swapData,
		approval,
		checkAllowanceAndSwap,
		swapTxHarsh,
		isGottenSwapData,
	} = UseSwap(baseToken, quoteToken, setTxModal, setTxErr);

	const {
		data: baseTokenBalance,
		isloading: baseisloading,
		refetch: refetchBase,
	} = useFetchBalance(
		address!,
		`${baseToken.ca}-${baseToken.ticker}`,
		baseToken.ca
	);

	const {
		data: quoteTokenBalance,
		isloading: quoteisloading,
		refetch: refetchQuote,
	} = useFetchBalance(
		address!,
		`${quoteToken.ca}-${quoteToken.ticker}`,
		quoteToken.ca
	);

	const { status } = useTransactionConfirmations({
		chainId: chainId,
		hash: swapTxHarsh,
	});

	useEffect(() => {
		setTxState(status);

		if (swapTxHarsh && status == "success") {
			setBaseToken({
				...baseToken,
				inputValue: "",
				tokenBalance: baseTokenBalance as bigint,
			});
			setQuoteToken({
				...quoteToken,
				inputValue: "",
				tokenBalance: quoteTokenBalance as bigint,
			});
		}
	}, [status, swapTxHarsh]);

	const ReverseTrade = useCallback(() => {
		setBaseToken((prevBaseToken) => ({
			...quoteToken,
			inputValue: prevBaseToken.inputValue,
		}));
		setQuoteToken((prevQuoteToken) => ({
			...baseToken,
			inputValue: prevQuoteToken.inputValue,
		}));
	}, [baseToken.ca, quoteToken.ca]);

	useEffect(() => {
		if (baseTokenBalance !== undefined) {
			setBaseToken((prevBaseToken) => ({
				...prevBaseToken,
				tokenBalance: baseTokenBalance,
			}));
		}
	}, [baseTokenBalance]);

	useEffect(() => {
		if (quoteTokenBalance !== undefined) {
			setQuoteToken((prevQuoteToken) => ({
				...prevQuoteToken,
				tokenBalance: quoteTokenBalance,
			}));
		}
	}, [quoteTokenBalance]);

	useEffect(() => {
		if (swapData?.amountOut && quoteToken.ca)
			setQuoteToken((prevQuoteToken) => ({
				...prevQuoteToken,
				inputValue: swapData?.amountOut || "0.0",
			}));

		if (baseToken.inputValue.length === 0)
			setQuoteToken((prevQuoteToken) => ({
				...prevQuoteToken,
				inputValue: "0.0",
			}));
	}, [quoteToken.ca, swapData?.amountOut, baseToken.inputValue]);

	useEffect(() => {
		document.body.style.overflow = ToggleModal.mainToggle ? "hidden" : "auto";
	}, [ToggleModal.mainToggle]);

	const isInsufficient = useMemo(() => {
		return (
			Number(baseToken.inputValue) >
			Number(formatUnits(BigInt(baseToken.tokenBalance), baseToken.decimals))
		);
	}, [baseToken.inputValue, baseToken.tokenBalance]);

	const refetchAll = () => {
		refetchBase();
		refetchQuote();
	};

	const handleSwap = () => {
		const toastOptions = {
			pauseOnHover: false,
			toastId: "warnToastID",
			autoClose: 2000,
		};
		setTxState("");
		setTxErr("");

		if (!baseToken.inputValue) {
			return toast.warn("Input amount to swap", toastOptions);
		}

		if (quoteToken.inputValue == "0.00" || !quoteToken.ca) {
			return toast.warn("Select Quote token to swap", toastOptions);
		}

		if (quoteToken?.inputValue) {
			checkAllowanceAndSwap(swapData, approval, refetchAll);
		}
	};

	return (
		<main className="min-h-[calc(100dvh-90px)] md:min-h-[calc(100dvh-70px)] ">
			<motion.main
				initial="hidden"
				variants={pageIn}
				animate="show"
				className="  mb-80px px-4 py-4 pt-[150px] mt-5 md:w-[462.41px] md:pt-[136px] md:m-auto md:px-0 ">
				<TopIconSection setSettingToggle={setSettingToggle} />
				<TopSwap
					setToggleModal={setToggleModal}
					ToggleModal={ToggleModal}
					baseToken={baseToken}
					setBaseToken={setBaseToken}
					isloading={baseisloading}
				/>
				<RotateTokens ReverseTrade={ReverseTrade} />
				<BottomSwap
					setToggleModal={setToggleModal}
					ToggleModal={ToggleModal}
					quoteToken={quoteToken}
					setQuoteToken={setQuoteToken}
					isloading={quoteisloading}
				/>
				<AnimatePresence>
					{isGottenSwapData && (
						<Info
							swapData={swapData}
							baseToken={baseToken}
							quoteToken={quoteToken}
						/>
					)}
				</AnimatePresence>

				{isConnected && (
					<button
						disabled={isInsufficient}
						onClick={handleSwap}
						className=" flex items-center justify-center h-[54px] w-full mt-3 py-4 px-[18px] bg-[#8F199B] rounded-[10px] shadow- text-darkBG hover:text-darkSlate disabled:opacity-75">
						{isInsufficient
							? `Insufficient ${baseToken.ticker} balance`.toUpperCase()
							: approval
								? "Approve " + baseToken?.ticker
								: baseToken.inputValue
									? "Swap"
									: "ENTER AMOUNT"}
					</button>
				)}
				{isDisconnected && (
					<button
						onClick={() => open()}
						className=" flex items-center justify-between gap-4 h-[100px] md:h-[79px] w-full mt-3 py-4 px-[18px] bg-[#8F199B] rounded-[10px] shadow- text-darkBG hover:text-darkSlate">
						<div className=" flex items-center gap-4 text-left">
							<IoWalletOutline className=" text-2xl" />
							<div>
								<h1 className=" font-medium mb-1">Getting Started</h1>
								<p className=" text-sm font-normal">
									Connect wallet to trade and explore more
								</p>
							</div>
						</div>
						<GrFormNext className=" text-lg justify-items-end " />
					</button>
				)}
			</motion.main>
			<AnimatePresence>
				{ToggleModal.mainToggle && (
					<TokensModal
						setToggleModal={setToggleModal}
						ToggleModal={ToggleModal}
						ReverseTrade={ReverseTrade}
						baseToken={baseToken}
						quoteToken={quoteToken}
						setBaseToken={setBaseToken}
						setQuoteToken={setQuoteToken}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{settingToggle && <SettingModal setSettingToggle={setSettingToggle} />}
			</AnimatePresence>
			<AnimatePresence>
				{txModal && (
					<TransactionModal
						setTxModal={setTxModal}
						baseToken={baseToken}
						quoteToken={quoteToken}
						swapData={swapData}
						txState={txState}
						txModal={txModal}
						txErr={txErr}
						swapTxHarsh={swapTxHarsh}
					/>
				)}
			</AnimatePresence>
		</main>
	);
}

// -------------------------------------------JUST ICONS SECTION----------
const TopIconSection = ({ setSettingToggle }: any) => {
	return (
		<div className=" flex items-center justify-between text-xl text-darkBG h-[34px] pr-1 pl-2 mb-2 ">
			<div className="font-light cursor-default ">Swap</div>
			<div className=" flex items-center gap-4 W-[72px] mr-2 ">
				<RxReload className=" hover:rotate-180 transition-all duration-300 cursor-pointer " />

				<FiSettings
					onClick={() => setSettingToggle((prev: boolean) => !prev)}
					className=" hover:rotate-180 transition-all duration-300 cursor-pointer "
				/>
			</div>
		</div>
	);
};

// ------------------------------THIS IS TO ROTATE THE TOKENS -------------
const RotateTokens = ({ ReverseTrade }: any) => {
	return (
		<section className=" h-[10px] grid place-content-center">
			<div
				onClick={ReverseTrade}
				className=" border border-[#8F199B] bg-[#140123] w-fit p-1 rounded-full m-auto z-10 relative group cursor-pointer ">
				<div className=" bg-[#8F199B] text-white rounded-full h-full w-full p-1 group-active:bg-secFG lg:group-hover:rotate-180 ease-in-out transition-all duration-200 ">
					<RiArrowUpDownFill />
				</div>
			</div>
		</section>
	);
};
