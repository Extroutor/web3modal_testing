import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import {useState} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "f0102c9b956543429c139968c35ec718"
        }
    }
};

export default function Home() {
    const [address, setAddress] = useState()
    async function connectWallet() {
        try {
            let web3Modal = new Web3Modal({
                cacheProvider: false,
                providerOptions,
            })
            const instance = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(instance)
            console.log(provider)
            // @ts-ignore
            setAddress(provider.provider.selectedAddress)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.container}
        style={{height: '100vh', display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
            <button onClick={connectWallet}>push me</button>
            <div>My address is {address}</div>
        </div>
    )
}
