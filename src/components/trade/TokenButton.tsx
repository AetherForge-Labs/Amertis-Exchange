import Image from "next/image";
import { GrDown } from "react-icons/gr";

const TokenButton = ({ logo, token, handleModal }: any) => {
	return (
		<button
			onClick={handleModal}
			className=" flex items-center justify-center gap-3 bg-mainFG lg:hover:bg-secFG active:bg-secFG transition-colors ease-linear duration-200 w-fit px-3 shadow-lg h-full rounded-3xl ">
			{token ? (
				<>
					{logo ? (
						<Image
							src={logo}
							alt="logo"
							width={24}
							height={24}
							className=" rounded-full"
						/>
					) : (
						<div className=" h-6 w-6 rounded-full bg-mainLight border-[0.5px] border-secFG "></div>
					)}

					<div className=" flex items-center gap-2">
						<h2 className=" ">{token}</h2>
						<GrDown className=" text-sm" />
					</div>
				</>
			) : (
				<div className="w-full flex items-center gap-2">
					<h2 className="font-sm text-nowrap">Select token</h2>
					<GrDown className=" text-sm" />
				</div>
			)}
		</button>
	);
};

export default TokenButton;
