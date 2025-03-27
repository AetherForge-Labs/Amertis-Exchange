import { useCallback } from "react";
import TokenButton from "./TokenButton";
import { formatUnits, parseEther, parseUnits } from "viem";
import { useAccount } from "wagmi";

type tokenData = {
	icon: string;
	name: string;
	ca: string;
	ticker: string;
	tokenBalance: bigint | undefined;
	inputValue: string;
	decimals: number;
};
interface IProps {
	setToggleModal: (val: any) => void;
	ToggleModal: boolean;
	baseToken?: tokenData;
	setBaseToken?: any;
	isloading: boolean;
}
const TopSwap = ({
	setToggleModal,
	baseToken,
	setBaseToken,
	isloading,
}: //   baseInputRef,
IProps) => {
	const { isConnected } = useAccount();

	const setPercentage = useCallback(
		(percent: number) => {
			setBaseToken((prev: { tokenBalance: any; decimals: number }) => {
				const balanceInEther =
					prev.tokenBalance > parseUnits("0.000000001", prev.decimals)
						? formatUnits(prev.tokenBalance, prev.decimals)
						: 0;
				if (prev) {
					return {
						...prev,
						inputValue:
							percent === 100
								? Number(+balanceInEther || 0)
								: Number(+balanceInEther) > 0.00000001
								? Number(((+balanceInEther || 0) * percent) / 100).toFixed(8)
								: Number(((+balanceInEther || 0) * percent) / 100),
					};
				}
				return prev;
			});
		},
		[setBaseToken]
	);

	// -------toggle on modal
	const handleModal = useCallback(() => {
		setToggleModal({ mainToggle: true, forBase: true });
	}, [setToggleModal]);

	// this is to input basequote typed in by user
	const hanldeBaseInput = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			// Regular expression to validate numbers with optional decimal point
			const regex = /^\d*\.?\d*$/;
			if (newValue === "" || regex.test(newValue)) {
				// If the input is a valid number or empty, update the state
				setBaseToken((prev: any) => ({
					...prev,
					inputValue: newValue,
				}));
			}
		},
		[setBaseToken]
	);

	return (
		<div className=" py-4 px-[14px] border-1-[#000000] cursor-default backdrop-blur-xl bg-white/[0.07] border border-white/[0.1] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-8 ">
			<div className=" flex justify-between items-center h-[40px]">
				<input
					//   ref={baseInputRef}
					type="text"
					placeholder="0.0"
					value={baseToken?.inputValue ?? ""}
					onChange={hanldeBaseInput}
					className=" bg-inherit h-full text-3xl w-[70%] focus:outline-none"
				/>
				<TokenButton
					logo={baseToken?.icon}
					token={baseToken?.ticker}
					handleModal={handleModal}
				/>
			</div>

			<div className=" my-3 text-[13px] flex justify-between items-center text-textFaint">
				{/* this renders dollar value  */}
				{baseToken?.inputValue ? <p></p> : <p></p>}

				{/* this renders balance */}
				<div className=" flex gap-2 items-center">
					{isConnected && baseToken?.name ? (
						<>
							<p>Balance</p>
							<p>
								{isloading
									? "loading ..."
									: !baseToken.tokenBalance
									? "0.000"
									: baseToken.tokenBalance >
									  parseUnits("0.001", baseToken.decimals)
									? Number(
											formatUnits(
												BigInt(baseToken?.tokenBalance),
												baseToken.decimals
											)
									  ).toFixed(3)
									: " < 0.001"}
							</p>
						</>
					) : (
						""
					)}
				</div>
			</div>

			{isConnected && <PercentSection setPercentage={setPercentage} />}
		</div>
	);
};

export default TopSwap;

const PercentSection = ({ setPercentage }: any) => {
	return (
		<div className=" flex justify-between h-[30.75px]">
			{[25, 50, 75, 100].map((_percent) => (
				<button
					key={_percent}
					onClick={() => setPercentage(_percent)}
					className="w-[75px] border-darkBG px-[9px] py-[3px] md:w-[97px] text-slate-400 hover:text-white hover:border-white  ease-linear group flex items-center justify-between p-4 rounded-lg backdrop-blur-md bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300 ">
					{_percent + "%"}
				</button>
			))}
		</div>
	);
};
