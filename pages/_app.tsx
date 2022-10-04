import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>  
      <ThirdwebProvider desiredChainId={activeChainId} >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </SessionProvider>
  );
}

export default MyApp;
