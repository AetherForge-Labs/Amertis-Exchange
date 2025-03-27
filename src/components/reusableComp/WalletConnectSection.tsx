import { BsEggFill } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Fragment } from "react";

const WalletConnectSection = () => {
	return (
		<div className=" hidden md:flex items-center gap-2">
			<div className=" group relative ">
				<BsEggFill className=" shrink-0 text-2xl  " />

				{/* <p className=" bg-mainLight p-1 absolute mx-auto top-[120%] left-[-100px] w-[200px] text-center hidden group-hover:block ">
					Mainnet Switch will be available in due time
				</p> */}
			</div>

			<ConnectButton />
		</div>
	);
};

export default WalletConnectSection;

export const ConnectButton = () => {
	const { isConnected, address } = useAccount();
	const { open, close } = useWeb3Modal();
	return (
		<Fragment>
			{isConnected ? (
				<button
					onClick={() => open()}
					className=" py-2 px-6 rounded-md bg-glass ">{`${address?.slice(
					0,
					4
				)}...${address?.slice(-4)}`}</button>
			) : (
				// <p>CONNECTED</p>
				<button
					onClick={() => open({ view: "Connect" })}
					className="rounded-xl bg-mainFG py-2 px-4 flex items-center gap-2 justify-center mx-auto lg:hover:bg-secFG">
					<>
						<IoWalletOutline className=" text-2xl" />
						Connect Wallet
					</>
				</button>
			)}
		</Fragment>
	);
};
