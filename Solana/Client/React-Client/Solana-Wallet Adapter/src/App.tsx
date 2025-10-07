/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { RequestAirDrop } from "./Airdrop";
import { ShowUserBalance } from "./ShowUserBalace";
import { SendTokens } from "./SendToken";
import { TokenLaunchPad } from "./TokenLaunchPad/Launchpad";

function App() {
 //const network = WalletAdapterNetwork.Testnet;
 const endpoint = "https://api.devnet.solana.com";

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
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
