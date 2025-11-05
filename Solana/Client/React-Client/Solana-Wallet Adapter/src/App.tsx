/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { RequestAirDrop } from "./Airdrop";
import { ShowUserBalance } from "./ShowUserBalace";
import { SendTokens } from "./SendToken";
import { TokenLaunchPad } from "./TokenLaunchPad/Launchpad";
import Interact from "./SmartContractInteraction/Interact";
import { Swap } from "./Swap/Swap";

function App() {
 //const network = WalletAdapterNetwork.Testnet;
//  const endpoint = "https://api.devnet.solana.com";
    const endpoint = "http://127.0.0.1:8899"

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div >
            <WalletMultiButton/>
            <WalletDisconnectButton/>
            <RequestAirDrop/>
            <ShowUserBalance/>
            <SendTokens/>
            <TokenLaunchPad/>
            <Swap/>
            <Interact/>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
