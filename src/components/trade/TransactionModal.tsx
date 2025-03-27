"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { fadeIn } from "@/utils/anim";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { AiFillWarning } from "react-icons/ai";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { parseEther } from "viem";

const TransactionModal = ({
	setTxModal,
	baseToken,
	quoteToken,
	txState,
	txErr,
	swapTxHarsh,
}: // status,
any) => {
	const [baseTokenVar] = useState(baseToken);
	const [quoteTokenVar] = useState(quoteToken);
	const modalRef = useRef<any | null>();

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setTxModal(false);
			}
		};

		addEventListener("mousedown", handleClickOutside);

		return () => removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<motion.main
			initial={fadeIn.initial}
			animate={fadeIn.animate}
			transition={fadeIn.transition}
			exit={fadeIn.initial}
			className=" w-dvw h-dvh bg-black bg-opacity-90 md:p-6 fixed top-0 z-50 flex items-center px-4 ">
			<section
				ref={modalRef}
				className=" z-10 w-full  md:w-[500px] border-[0.5px] bg-glass rounded-[15px] md:rounded-[30px] flex flex-col mx-auto p-4 ">
				{txState !== "success" && !txErr && (
					<section className=" flex flex-col items-center gap-4 my-[32px]">
						<AiOutlineLoading3Quarters className="text-4xl animate-spin duration-50 ease-linear" />
						<h2 className=" text-[20px] font-semibold text-foreground ">
							{txState == "pending" ? "Transaction pending" : "Confirm Swap"}
						</h2>

						<div className=" flex flex-col items-center gap-2 ">
							<div className=" flex items-center gap-1">
								<Image
									src={baseTokenVar.icon}
									alt="base"
									height={20}
									width={20}
									className="rounded-full"
								/>
								<p>
									{Number(baseTokenVar?.inputValue) < 0.00000001
										? " < 0.00000001"
										: Number(baseTokenVar?.inputValue).toFixed(8) +
										  " " +
										  baseTokenVar?.ticker}
								</p>
							</div>
							<FaArrowDown className="" />
							<div className=" flex items-center gap-1">
								<Image
									src={quoteToken.icon}
									alt="quote"
									height={20}
									width={20}
									className="rounded-full"
								/>
								<p>
									{Number(quoteTokenVar?.inputValue) < 0.00000001
										? " < 0.00000001"
										: Number(quoteTokenVar?.inputValue).toFixed(8) +
										  " " +
										  quoteTokenVar?.ticker}
								</p>
							</div>
						</div>

						{txState !== "pending" && (
							<p className=" font-extralight ">Approve wallet ransaction ...</p>
						)}
					</section>
				)}

				{txErr && (
					<div className=" my-[32px] mx-auto w-fit text-center">
						<AiFillWarning className=" text-[50px] my-2 mx-auto" />
						<p>Error in transaction!!!</p>

						<button
							onClick={() => setTxModal(false)}
							className=" hover:bg-secFG px-4 py-2 mt-4 bg-mainFG rounded-[10px] text-white ">
							try again
						</button>
					</div>
				)}

				{txState == "success" && !txErr && (
					<section className=" my-[32px] mx-auto w-fit text-center ">
						<GiCheckMark className=" text-[50px] mx-auto" />
						<p className=" text-[20px] font-semibold my-2 text-foreground ">
							Successfully swapped{" "}
						</p>
						<div className=" flex flex-col items-center gap-2 ">
							<div className=" flex items-center gap-1">
								<Image
									src={baseTokenVar.icon}
									alt="base"
									height={20}
									width={20}
									className="rounded-full"
								/>
								<p>
									{Number(baseTokenVar?.inputValue) < 0.00000001
										? " < 0.00000001"
										: Number(baseTokenVar?.inputValue).toFixed(8) +
										  " " +
										  baseTokenVar?.ticker}
								</p>
							</div>
							<p>to</p>
							<div className=" flex items-center gap-1">
								<Image
									src={quoteToken.icon}
									alt="quote"
									height={20}
									width={20}
									className="rounded-full"
								/>
								<p>
									{Number(quoteTokenVar?.inputValue) < 0.00000001
										? " < 0.00000001"
										: Number(quoteTokenVar?.inputValue).toFixed(8) +
										  " " +
										  quoteTokenVar?.ticker}
								</p>
							</div>
						</div>
						<div className="mt-2">
							<a
								href={`https://testnet.monadexplorer.com/tx/${swapTxHarsh}`}
								target="_blank"
								rel="noopener noreferrer"
								className=" underline  hover:text-mainFG ">
								View TX
							</a>
						</div>
					</section>
				)}
			</section>
		</motion.main>
	);
};

export default TransactionModal;
