import Link from "next/link";

const Modal = () => {
    return (
        <div className="fixed inset-0 grid place-items-center z-50">
            <div className="fixed inset-0 backdrop-blur-sm">
            </div>
            <div className="size-[300px] bg-black text-white border-[0.5px] border-foreground relative grid place-items-center">
                <div className="flex flex-col gap-3 justify-center items-center">
                    <p className="font-bold">Your NFT has been minted!</p>
                    <Link href="/" className="mint-button grid place-items-center">
                        Explore our DApp
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Modal;