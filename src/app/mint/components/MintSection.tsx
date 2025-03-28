import { Montserrat } from "next/font/google";
import MintButton from "./MintButton";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const MintSection = () => {
    return (
        <div className={`${montserrat.className} max-w-[600px]`}>
            <h2 className="text-2xl font-bold mb-4">Mert Special NFT</h2>
            <p className="text-sm mb-4">Upon Monad&apos;s chain, a vision takes flight, MertNFT glows, a beacon of light For those who saw when the path was dim, And held their faith when chances were slim.   Amertis whispers, a tide yet to rise, Pooling the streams where liquidity lies. Bound by code, yet free to create, A future shaped by those who wait. Early believers, your trust won&apos;t fade, You lit the spark, the groundwork laid. Through trials and tests, the strong remain, MertNFT—your mark on the chain. 🚀✨</p>

            <p className="text-sm mb-4">Early believers, your trust won&apos;t fade, You lit the spark, the groundwork laid. Through trials and tests, the strong remain, MertNFT—your mark on the chain. 🚀✨</p>

            <MintButton />
        </div>
    )
}

export default MintSection