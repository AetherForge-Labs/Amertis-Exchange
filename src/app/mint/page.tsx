import MintSection from "./components/MintSection";
import NftCard from "./components/NftCard";

const Mint = () => {
    return (
        <div className="flex items-center justify-center h-dvh pt-[125px] lg:p-10 p-4 ">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-[1200px]  ">
                <MintSection />
                <NftCard />
            </div>
        </div>
    );
};

export default Mint;