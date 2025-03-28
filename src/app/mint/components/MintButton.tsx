"use client"
import { Config, useAccount, useReadContract, useWriteContract } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { keccak256 } from "viem";
import { useState, useEffect } from "react";
import { config } from "@/config";
import { waitForTransactionReceipt } from "@wagmi/core";
import dynamic from 'next/dynamic';
import Modal from "./Modal";

const mekletree = require("./Merkletree.json");
const abi = require("./abi.json");

const mertNFTAddress = "0x8870Fc3A430a84ef19483958786BC2792c57Ad6b";

const MintButton = () => {
    const { address } = useAccount();
    const { open } = useWeb3Modal();

    if (!address) {
        return (
            <button className="mint-button" onClick={() => open()}>Connect Wallet</button>
        )
    }

    const proof = mekletree.proofs[keccak256(address)];

    if (!proof) {
        return (
            <button disabled={true} className="mint-button">Not whitelisted</button>
        )
    }

    return (
        <Mint address={address} proof={proof} />
    )
}

export default MintButton

const Mint = ({ address, proof }: { address: `0x${string}`; proof: any }) => {
    const [isMinting, setIsMinting] = useState<boolean | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(false);

    const { writeContractAsync } = useWriteContract();

    const handleMint = async () => {
        try {
            setIsMinting(true);
            const tx = await writeContractAsync({
                address: mertNFTAddress,
                abi: abi,
                functionName: "mint",
                args: [proof],
            });

            await waitForTransactionReceipt(config as Config, {
                hash: tx as `0x${string}`,
            });
            console.log(tx);
            setIsMinting(false);
            setShowModal(true);
        } catch (error) {
            console.error(error);
            setIsMinting(undefined);
        }
    }

    const { data: hasMinted, isLoading: isLoadingHasMinted } = useReadContract({
        address: mertNFTAddress,
        abi: abi,
        functionName: "hasMinted",
        args: [address],
        query: {
            enabled: !!address,
            refetchInterval: 5_000,
        }
    });

    if (isLoadingHasMinted) {
        return (
            <button disabled={true} className="mint-button">Checking...</button>
        )
    }

    return (
        <div className="relative">
            {showModal && <Modal />}
            {hasMinted || isMinting === false ? (
                <button disabled={true} className="mint-button">Already minted</button>
            ) : (
                <button
                    className="mint-button"
                    onClick={handleMint}
                    disabled={isMinting}
                >
                    {isMinting ? "Minting..." : "Mint"}
                </button>
            )}
        </div>
    )
}
