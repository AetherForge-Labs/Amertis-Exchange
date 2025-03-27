"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { fadeIn, zoomIn } from "@/utils/anim";
import { IoClose, IoWarning } from "react-icons/io5";

const SettingModal = ({ setSettingToggle }: any) => {
	const [customSlippage, setCustomSlippage] = useState<string>("");
	const [info, setInfo] = useState<string | undefined>(undefined);
	const inputRef = useRef<HTMLInputElement>(null);

	// this gives disclaimers for custom slippages where necessary
	useEffect(() => {
		if (Number(customSlippage) < 0) {
			setInfo("SLIPPAGE THAN ZERO, SET VALUE WITHIN 0 - 15");
		} else if (Number(customSlippage) > 15) {
			setInfo("SLIPPAGE TOO HIGH, SET VALUE WITHIN 0 - 15");
		} else {
			setInfo(undefined);
		}
	}, [customSlippage]);

	// this handles the slippage clicks
	const handleSlipClick = (arg: number) => {
		if (arg <= 0 || arg > 50) {
			inputRef.current?.focus();
		} else {
			setSettingToggle(false);
		}
	};

	const slipButStyle =
		"  bg-mainBG border-[0.5px] border-mainLight rounded-md lg:hover:border-mainFG border-red py-2 px-1  ";

	return (
		<main className=" w-dvw h-dvh md:p-6 fixed inset-0 z-50 flex items-center ">
			<motion.div
				initial={fadeIn.initial}
				animate={fadeIn.animate}
				transition={fadeIn.transition}
				exit={fadeIn.initial}
				onClick={() => setSettingToggle(false)}
				className=" w-dvw h-dvh inset-0 flex items-center px-4 backdrop-blur-md absolute "></motion.div>
			<motion.section
				initial={zoomIn.initial}
				animate={zoomIn.animate}
				transition={zoomIn.transition}
				exit={zoomIn.initial}
				className="  w-full  md:w-[500px] border-[0.5px] border-mainFG bg-mainDark rounded-[15px] md:rounded-[30px] flex flex-col mx-auto p-4 relative ">
				<div className=" flex items-center justify-between border-mainFG ">
					<h2 className=" font-semibold text-[20px] ">Slippage Settings</h2>
					<button
						onClick={() => setSettingToggle(false)}
						className=" bg-mainLight py-2 px-4 rounded-md lg:hover:bg-mainFG ease-linear duration-200 transition-colors ">
						<IoClose />
					</button>
				</div>

				<div className="">
					<div className=" grid grid-cols-[15%_15%_15%_auto] gap-2 my-4">
						<button
							onClick={() => handleSlipClick(0.5)}
							className={slipButStyle}>
							0.5%
						</button>
						<button
							onClick={() => handleSlipClick(1)}
							className={slipButStyle}>
							1%
						</button>
						<button
							onClick={() => handleSlipClick(2)}
							className={slipButStyle}>
							2%
						</button>
						<div
							className={`${slipButStyle} flex items-center justify-between px-4`}>
							<input
								ref={inputRef}
								type="number"
								onChange={(e) => setCustomSlippage(e.target.value)}
								placeholder="Custom"
								className=" outline-none bg-transparent w-[50%] pl-2"
								id="slip"
							/>
							<p className=" px-2">%</p>
						</div>
					</div>
				</div>

				{info && (
					<div className=" bg-yellow-100 p-2 px-4 my-4 text-black flex items-center gap-4 ">
						<IoWarning className="text-2xl shrink-0 " />
						<p>{info && info}</p>
					</div>
				)}

				<button
					onClick={() => handleSlipClick(Number(customSlippage))}
					className=" bg-mainFG p-2 rounded-md ">
					Save Custom
				</button>
			</motion.section>
		</main>
	);
};

export default SettingModal;
