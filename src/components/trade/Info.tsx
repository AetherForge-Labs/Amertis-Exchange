"use client";
import { Fragment, useEffect, useState } from "react";
import {
	fadeIn,
	slideDown_big,
	slideDown_small,
	slideDownChildren,
} from "@/utils/anim";
import { AnimatePresence, motion } from "motion/react";

// icons
import { FaGasPump } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { MdRoute } from "react-icons/md";
import { useChainId } from "wagmi";
import { TokenList } from "@/lib/TokenList";
import Image from "next/image";
import { parseEther } from "viem";

type SwapData = {
	adapters: string[];
	amounts: bigint[];
	amountOut: string;
	baseForQuote: string;
	gasEstimate: bigint;
	path: string[];
	status: string;
};

type IInfo = {
	swapData: SwapData;
	baseToken: any;
	quoteToken: any;
};

const Info = ({ swapData, baseToken, quoteToken }: IInfo) => {
	const [showRoutes, setShowRoutes] = useState<boolean>(false);

	if (!swapData || !swapData?.adapters?.length) {
		return (
			<MotionWrapper>
				<div className=" h-[50px] rounded-xl border border-white/20 bg-[#f1c1311a] backdrop-blur-xl my-4 flex justify-center items-center px-2 cursor-pointer text-[14px] text-red-500  ">
					🚫 No routes found, check other pairs
				</div>
			</MotionWrapper>
		);
	}

	return (
		<>
			<MotionWrapper>
				<section
					onClick={() => setShowRoutes(!showRoutes)}
					className=" h-[50px] rounded-xl border bg-glass my-4 flex justify-between items-center px-2 cursor-pointer lg:hover:border-mainFG text-[14px]">
					<div className=" flex items-center gap-2 ">
						<span className=" flex items-center gap-1">
							<Image
								src={baseToken.icon}
								alt="base"
								width={20}
								height={20}
								className="rounded-full"
							/>
							<p>{"1 " + baseToken.ticker}</p>
						</span>
						<span>=</span>
						<span className=" flex items-center gap-1">
							<Image
								src={quoteToken.icon}
								alt="base"
								width={20}
								height={20}
								className="rounded-full"
							/>

							<p>
								{Number(swapData.baseForQuote) < 0.00000001
									? ` < 0.00000001 ${quoteToken.ticker} `
									: Number(swapData.baseForQuote).toFixed(8) +
									  " " +
									  quoteToken.ticker}
							</p>
						</span>
					</div>
					<div className=" flex items-center gap-1 font-light ">
						<FaGasPump />
						<p>$0.06</p>
						<FaChevronDown className={` ${showRoutes ? "" : ""}  ml-2`} />
					</div>
				</section>
			</MotionWrapper>
			<AnimatePresence>
				{showRoutes && (
					<SwapRoutes
						swapData={swapData}
						baseToken={baseToken}
						quoteToken={quoteToken}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Info;

const SwapRoutes = ({ swapData }: IInfo) => {
	const [adapter, setAdapter] = useState<{
		name: string;
		image: string;
	} | null>();

	const chainId = useChainId();
	const tokenList = TokenList[chainId];

	useEffect(() => {
		if (swapData.adapters[0] === "0x83520cA482a1C3bC1CcF73Ceb58F6fEE8a590Da7") {
			setAdapter({
				name: "Uniswap",
				image: "/icons/uniswap.svg",
			});
		} else {
			setAdapter(null);
		}
	}, [swapData]);

	return (
		<MotionWrapper isBig>
			<div className="  border bg-glass rounded-xl p-2 md:p-4 text-[14px] ">
				<span className="flex items-center ease-linear gap-2 mb-6">
					<div className=" p-2 bg-mainFG rounded-full text-center w-fit gap-2 animate-spin duration-1000 ">
						<MdRoute />
					</div>{" "}
					<p>Best Route</p>
				</span>

				<section className=" flex items-center justify-between my-2 rounded-full gap-2 ">
					<div
						style={{
							backgroundImage: `url('${
								tokenList.find(
									(p, i) =>
										p.ca.toLowerCase() === swapData.path[0].toLowerCase()
								)?.icon ??
								"https://via.placeholder.com/100x100/8F199B/FFFFFF?text=?"
							}')`,
						}}
						className=" h-6 w-6 rounded-full bg-contain bg-center b"></div>

					<div className=" flex-1 relative ">
						<div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
							<div className="line-shine-effect"></div>
						</div>
						<div className="absolute inset-0 grid place-content-center ">
							{adapter && (
								<div className=" bg-slate-100 text-black px-5 py-2 rounded-xl flex items-center gap-2">
									<Image
										src={adapter.image}
										alt="adt"
										width={16}
										height={16}
										className="rounded-full"
									/>
									<p>{adapter?.name}</p>
								</div>
							)}
						</div>
					</div>
					<div
						style={{
							backgroundImage: `url('${
								tokenList.find(
									(p, i) =>
										p.ca.toLowerCase() === swapData.path[1].toLowerCase()
								)?.icon ??
								"https://via.placeholder.com/100x100/8F199B/FFFFFF?text=?"
							}')`,
						}}
						className=" h-6 w-6 rounded-full bg-contain bg-center b"></div>
				</section>
			</div>
		</MotionWrapper>
	);
};

const MotionWrapper = ({
	children,
	isBig,
}: {
	children: React.ReactNode;
	isBig?: boolean;
}) => {
	return (
		<motion.div
			variants={isBig ? slideDown_big : slideDown_small}
			initial="hidden"
			exit="exit"
			animate="show">
			<motion.div
				variants={slideDownChildren}
				initial="hidden"
				animate="show"
				exit="hidden">
				{children}
			</motion.div>
		</motion.div>
	);
};
