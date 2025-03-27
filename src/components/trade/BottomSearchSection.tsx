import Image from "next/image";
import { formatUnits, parseUnits } from "viem";

const BottomSearchSection = ({
	handleTokenSelect,
	quoteToken,
	baseToken,
	newTokenList,
	balLoading,
}: any) => {
	return (
		<ul className="flex-1 overflow-auto rounded-b-[30px] py-4 no-scrollbar ">
			{balLoading ? (
				<div className=" w-full h-full grid place-content-center">
					<p>Loading...</p>
				</div>
			) : (
				newTokenList.map((_tokens: any, index: any) => {
					return (
						<li
							key={index}
							onClick={() => handleTokenSelect(_tokens)}
							className={` ${
								baseToken.ticker === _tokens.ticker ||
								quoteToken.ticker === _tokens.ticker
									? "opacity-40"
									: "lg:hover:bg-mainLight"
							} h-[60px] px-6 cursor-pointer  grid grid-cols-[10%_60%_30%] items-center overflow-hidden `}>
							{_tokens.icon ? (
								<Image
									src={_tokens.icon}
									alt="token"
									width={32}
									height={32}
									className="rounded-full"
								/>
							) : (
								<div className=" h-8 w-8 rounded-full bg-mainLight border-[0.5px] border-secFG "></div>
							)}
							<div className="ml-2 md:ml-0">
								<h1 className="">{_tokens.ticker}</h1>
								<p className=" text-[12px] text-slate-400 font-semibold">
									{_tokens.name}
								</p>
							</div>

							{_tokens.balance ? (
								<p className="text-right truncate">
									{`
									${
										_tokens.balance == 0 || !_tokens.balance
											? "0.00"
											: _tokens.balance > parseUnits("0.001", _tokens.decimals)
											? Number(
													formatUnits(_tokens.balance, _tokens?.decimals)
											  )?.toFixed(3)
											: " < 0.001 "
									}`}{" "}
								</p>
							) : (
								<p className="text-right truncate"></p>
							)}
						</li>
					);
				})
			)}
		</ul>
	);
};

export default BottomSearchSection;
