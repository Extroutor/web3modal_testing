import styles from '../styles/Home.module.css'
import {useState} from "react";
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
// @ts-ignore
import {Web3Button, Web3Modal} from "@web3modal/react";
import {chain, configureChains, createClient, WagmiConfig} from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected'

const chains = [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum];

const {provider} = configureChains(chains, [
    walletConnectProvider({projectId: "d9210d7f507ad22b39b14475b3c9797e"}),
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({appName: "web3Modal", chains}),
    provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function Home() {
    const { address, isConnecting, isDisconnected } = useAccount()

    return (
        <div className={styles.container}
             style={{
                 height: '100vh',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center'
             }}>
            <WagmiConfig client={wagmiClient}>
                <Web3Button />
                <br/>
                <div>My address is {address}</div>
            </WagmiConfig>
            <Web3Modal
                projectId="d9210d7f507ad22b39b14475b3c9797e"
                theme="dark"
                accentColor="default"
                ethereumClient={ethereumClient}
            />
        </div>
    )
}
