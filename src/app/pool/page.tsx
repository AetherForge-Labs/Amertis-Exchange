"use client";
import { motion } from "motion/react";
import { pageIn } from "@/utils/anim";
import Link from "next/link";

const Pool = () => {
	const connected = true;

	return (
		<motion.main
			initial="hidden"
			variants={pageIn}
			animate="show"
			className="px-6 min-h-[calc(100dvh-90px)] md:min-h-[calc(100dvh-70px)] ">
			{connected && <Welcome />}
		</motion.main>
	);
};

export default Pool;

const Welcome = () => {
	return (
		<section className=" pt-[115px] md:min-w-[300px] max-w-[1000px] mx-auto ">
			<h1 className=" font-semibold text-2xl">Liquidity Pools</h1>
			<div className=" mt-5 bg-glass rounded-[30px] h-[400px] grid place-content-center text-center px-4 ">
				<h1 className=" font-semibold text-[25px] md:text-[30px]">
					Hold on <span className=" text-mainFG "> buddy!!!</span>
				</h1>
				<p className=" font-light text-[14px] mb-5 my-2">
					We are still building the pool interface ...
				</p>

				<Link
					href={"/"}
					className=" bg-mainFG lg:hover:bg-secFG w-fit px-8 py-2 mx-auto rounded-md ">
					Go to Swap
				</Link>
			</div>
		</section>
	);
};
