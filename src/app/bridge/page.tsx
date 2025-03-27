"use client";
import { motion } from "motion/react";

import Image from "next/image";
import axelar from "../../../public/Images/bridges/axelar.svg";
import wormhole from "../../../public/Images/bridges/wormhole.svg";
import { pageIn } from "@/utils/anim";

const Bridge = () => {
	return (
		<motion.main
			initial="hidden"
			variants={pageIn}
			animate="show"
			className=" min-h-[calc(100dvh-90px)] md:min-h-[calc(100dvh-70px)] pt-[100px] md:pt-[135px] px-4 md:px-6 lg:px-10 ">
			<h1 className=" font-semibold text-2xl md:text-[38px] text-center ">
				Move your funds in and out of Monad
			</h1>
			<p className=" font-light my-2 md:my-4 text-[13px] text-center ">
				Experience quicker, more cost-effective transactions with zkEVM,
				ensuring Ethereum&apos;s security and principles are upheld while
				enhancing efficiency.
			</p>

			<ul className=" flex items-center flex-col md:flex-row justify-center gap-5 my-10 md:my-16 ">
				{bridgesData.map((_bridge) => (
					<BridgeCard
						_bridge={_bridge}
						key={_bridge.name}
					/>
				))}
			</ul>
		</motion.main>
	);
};

export default Bridge;

const BridgeCard = ({ _bridge }: any) => {
	return (
		<a
			href={_bridge.url}
			target="_blank"
			className=" cursor-pointer border-[0.5px] border-[rgba(255,255,255,0.2)] rounded-[10px] md:rounded-[20px] bg-glass h-[200px] md:h-[250px] max-w-[600px] lg:hover:outline outline-mainFG duration-200 ease-linear transition-all flex flex-col items-start p-4 md:py-6">
			<Image
				src={_bridge.icon}
				alt=""
				className=" shrink-0 h-[30px] w-fit mb-2 "
			/>
			<div className=" flex-1 my-2">
				{/* <h3 className=" font-semibold ">{_bridge.name}</h3> */}
				<p className=" font-light ">{_bridge.description}</p>
			</div>
			<div className="">
				<ul className=" border border-secFG py-1 px-4 rounded-md text-slate-400 text-[14px] ">
					Cheap
				</ul>
			</div>
		</a>
	);
};

const bridgesData = [
	{
		name: "Axelar",
		icon: axelar,
		url: "https://axelar.network/",
		description:
			"The lightning-fast secure bridge for seamless cross-chain transactions.",
	},
	{
		name: "Wormhole",
		icon: wormhole,
		url: "https://wormhole.com/",
		description:
			"Decentralized cross-rollup bridge offers low cost and almost instant transfers.",
	},
];
