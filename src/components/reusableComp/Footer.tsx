import Image from "next/image";
import { BsTwitterX, BsGithub, BsDiscord } from "react-icons/bs";
// import { FaTelegramPlane } from "react-icons/fa";

function Footer() {
	return (
		<footer className=" border-t-[0.5px] bg-background border-[rgba(255,255,255,0.2)] h-[70px] p-2 flex items-center justify-center gap-4 md:gap-7 text-2xl">
			<div className=" items-center hidden md:flex gap-2">
				<Image
					src="/Images/Logo.svg"
					alt="logo"
					width={28}
					height={28}
				/>
				<h1 className=" font-bold ">AMERTIS</h1>
			</div>
			{footerLinks.map((_link) => (
				<a
					key={_link.linkName}
					href={_link.linkHref}
					target="_blank"
					className=" hover:bg-mainFG duration-200 ease-linear transition-colors h-[40px] w-[40px] bg-mainLight rounded-full grid place-content-center p-1">
					{_link.linkIcon}
				</a>
			))}
		</footer>
	);
}

export default Footer;

const footerLinks = [
	{
		linkName: "Twitter",
		linkIcon: <BsTwitterX />,
		linkHref: "https://x.com/AmertisExchange",
	},
	// {
	// 	linkName: "Telegram",
	// 	linkIcon: <FaTelegramPlane />,
	// 	linkHref: "#",
	// },
	{
		linkName: "GitHub",
		linkIcon: <BsGithub />,
		linkHref: "https://github.com/AetherForge-Labs",
	},
	{
		linkName: "Discord",
		linkIcon: <BsDiscord />,
		linkHref: "https://discord.gg/AEwRjGT3T8",
	},
];
