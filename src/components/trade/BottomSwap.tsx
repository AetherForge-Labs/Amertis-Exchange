import { StaticImageData } from "next/image";
import TokenButton from "./TokenButton";
import { formatEther, formatUnits } from "viem";
import { useCallback } from "react";
import { useAccount } from "wagmi";

type tokenData = {
	icon: string;
	name: string;
	ticker: string;
	ca: string;
	tokenBalance: number | undefined;
	inputValue: string;
	decimals: number;
};
interface IProps {
	setToggleModal: (val: any) => void;
	ToggleModal: boolean;
	quoteToken?: tokenData;
	setQuoteToken?: any;
	isLoading: boolean;
}
const BottomSwap = ({
	setToggleModal,
	quoteToken,
	setQuoteToken,
	isLoading,
}: IProps) => {
	const { isConnected } = useAccount();

	// -------toggle on modal and set "false" as
	const handleModal = useCallback(() => {
		setToggleModal({ mainToggle: true, forBase: false });
	}, [setToggleModal]);

	// this is to input basequote typed in by user
	const hanldeQuoteInput = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = Number(event.target.value);
			if (quoteToken) {
				setQuoteToken((prev: any) => ({
					...prev,
					inputValue: newValue,
				}));
			}
		},
		[setQuoteToken]
	);

	return (
		<div className=" h-[104px] py-4 px-[14px] backdrop-blur-xl bg-white/[0.07] border border-white/[0.1] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-8">
			<div className=" flex justify-between items-center h-[40px]">
				{" "}
				{/* this is the bottom input */}
				<input
					type="text"
					placeholder="0"
					disabled
					value={quoteToken?.inputValue ?? ""}
					onChange={hanldeQuoteInput}
					className=" bg-inherit h-full text-3xl w-[70%] focus:outline-none web "
				/>
				<TokenButton
					logo={quoteToken?.icon}
					token={quoteToken?.ticker}
					handleModal={handleModal}
				/>
			</div>

			<div className="mt-3 text-[13px] flex justify-between items-center text-textFaint">
				{/* this shows the dollar value of the bottom token */}
				{quoteToken?.inputValue ? <p></p> : <p></p>}

				{/* this shows the balances of the bottom token */}
				<div className=" flex gap-2 items-center">
					{isConnected && quoteToken?.name ? (
						<>
							<p>Balance</p>
							<p>
								{isLoading
									? ""
									: quoteToken?.tokenBalance
									? Number(
											formatUnits(
												BigInt(quoteToken?.tokenBalance),
												quoteToken.decimals
											)
									  )?.toFixed(3)
									: "0.000"}
							</p>
						</>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default BottomSwap;
