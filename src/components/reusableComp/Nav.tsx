"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import WalletConnectSection from "./WalletConnectSection";
import { AnimatePresence, motion } from "motion/react";

// icons
import { FiMenu } from "react-icons/fi";
import { BiWater } from "react-icons/bi";
import { HiArrowPath } from "react-icons/hi2";
import { MdDataUsage } from "react-icons/md";
import { SiGitbook } from "react-icons/si";
import { slideIn_variant, slideInChild_variant } from "@/utils/anim";

function Nav({}) {
	const path = usePathname();

	const [toggle, setToggle] = useState<boolean>(false);

	const toggleOff = () => {
		setToggle(false);
	};

	return (
		<div className=" backdrop-blur-md fixed top-0 w-full z-50">
			<div className=" bg-mainFG text-white h-[22px] text-xs flex items-center justify-center ">
				<p>Amertis on Monad testnet...</p>
			</div>

			<div className=" flex items-center gap-4 py-2 pr-3 pl-4 h-[58px] justify-between md:justify-start">
				<a href="https://amertis.exchange">
					<Image
						src={"/Images/Logo.svg"}
						alt="Logo"
						width={32}
						loading="eager"
						fetchPriority="high"
						priority
						height={32}
					/>
				</a>

				{/* Tab and PC Links */}
				<div className=" md:text-darkSlate md:flex flex-1 md:items-center md:gap-8 md:text-sm md:ml-8 hidden">
					{links.map((_link: any) => (
						<Link
							key={_link.name}
							href={_link.href}
							onClick={toggleOff}
							className={` ${
								_link.href === path
									? "text-mainFG font-semibold "
									: "hover:text-slate-400"
							} flex items-center w-fit h-10 gap-4`}>
							{_link.name}
						</Link>
					))}
				</div>

				{/* ------wallet connect section */}
				<WalletConnectSection />

				{/* HAMBURGER BUTTON FOR MOBILE */}
				<button
					className=" md:hidden"
					onClick={() => setToggle(!toggle)}>
					<FiMenu className=" text-2xl text-darkBG font-extrabold " />
				</button>
			</div>
			<AnimatePresence>
				{toggle && <MobileNav toggleOff={toggleOff} />}
			</AnimatePresence>
		</div>
	);
}

export default Nav;

const MobileNav = ({ toggleOff }: any) => {
	const path = usePathname();

	return (
		<div className=" h-dvh w-dvw fixed inset-0 z-50 overflow-hidden ">
			<div
				onClick={toggleOff}
				className=" h-dvh w-dvw inset-0 absolute "></div>

			<motion.div
				initial="hidden"
				animate="show"
				variants={slideIn_variant}
				className="bg-background h-full flex flex-col justify-between pt-12 pb-8 pl-8 pr-4 drop-shadow-2xl ">
				<motion.div
					variants={slideInChild_variant}
					className=" flex flex-col gap-5 font-medium text-darkBG">
					{links.map((_link: any) => (
						<Link
							key={_link.name}
							href={_link.href}
							onClick={toggleOff}
							className={` ${
								_link.href === path
									? "text-mainFG font-bold "
									: "hover:text-slate-400"
							} flex items-center w-fit h-10 gap-4`}>
							{_link.icon}
							<h1 className=" font-normal">{_link.name}</h1>
						</Link>
					))}
				</motion.div>
			</motion.div>
		</div>
	);
};

const links = [
	{
		name: "Swap",
		href: "/",
		icon: <HiArrowPath className=" font-medium text-xl rotate-90" />,
	},
	{
		name: "Portfolio",
		href: "/portfolio",
		icon: <MdDataUsage className=" text-xl" />,
	},

	{
		name: "Bridge",
		href: "/bridge",
		icon: <SiGitbook className=" text-xl" />,
	},
	{
		name: "Pool",
		href: "/pool",
		icon: <BiWater className=" text-xl" />,
	},
];
