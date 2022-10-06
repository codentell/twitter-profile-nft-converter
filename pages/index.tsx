import type { NextPage } from "next";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useSDK,
  ThirdwebNftMedia,
  useNFTCollection,
  useNFTs,
  useMintNFT,
  ConnectWallet
} from "@thirdweb-dev/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import styled from '@emotion/styled';
import { motion, AnimatePresence } from "framer-motion";
import  Davatar from "@davatar/react";
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

const MintButton = styled.button`
background: linear-gradient(to left, #EA60C3, #FFD580);
padding: 3px 3px 8px 3px;
border: 1px solid transparent;
color: white;
font-weight: 300;
font-size: 1.5rem;
border-radius: 16px;
cursor: pointer;

div {
  background: #0A062F;
  height: 70px;
  width: 300px;
  font-weight: bold;
  color: white;
  display: grid;
  grid-template-columns:  1fr;
  padding: 5px;
  
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-items: center;
  border-radius: 16px;
}

&:hover div {
  background: orange;
}
`




const ConnectButton = styled.button`
    background: linear-gradient(to left, #EA60C3, #FFD580);
    padding: 3px 3px 8px 3px;
    border: 1px solid transparent;
    color: white;
    font-weight: 300;
    font-size: 1.5rem;
    border-radius: 16px;
    cursor: pointer;

    div {
      background: #0A062F;
      height: 70px;
      width: 300px;
      font-weight: bold;
      color: white;
      display: grid;
      grid-template-columns: 70px 1fr;
      padding: 5px;
      
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      justify-items: center;
      border-radius: 16px;
    }

    &:hover div {
      background: orange;
    }
`

const TwitterButton = styled.button`
        background: linear-gradient(to left, #40b4ff, #96d6ff);
        padding: 3px 3px 8px 3px;
        border: 1px solid transparent;
        color: white;
        font-weight: 300;
        font-size: 1.0rem;
        border-radius: 16px;
        cursor: pointer;

        div {
          background: #0A062F;
          height: 70px;
          width: 200px;
          font-weight: bold;
          color: white;
          display: grid;
          grid-template-columns: 40px 1fr;
          padding: 5px;
          
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          justify-items: center;
          border-radius: 16px;
        }
        svg { 
          fill: #20a1f2;
        }

        &:hover div {
          background: #20a1f2;
        }

        &:hover svg {
          fill: white;
        }
`

const Section = styled.section`
        display: grid;
        align-items: center;
        justify-items: center;
        justify-content: center;
        height: 100vh;
`

const Thumbnail = styled.button`
    width: 150px;
    height: 150px;
    cursor: pointer;
    border-radius: 16px;
    font-size: 1.5rem;
    border: none;
    border: 5px solid #F213A4;

    :active {
      color: #F213A4;
    }

    :hover {
      border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
      border-image-slice: 1;
      border-radius: 16px;
      color: #F213A4;
    }

`

const Loader = styled.div`
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #F213A4;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

const SignOut = styled.button`
  
`


const Home: NextPage = () => {
  const sdk = useSDK();
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const { data: session } = useSession();
  const [theme, setTheme] = useState('');
  const nftCollection = useNFTCollection(
    "0x6a324243cb69e3B27F6990673352a0817B08F6B6",
  );

  const logoParams = {
    src: "twitter.riv",
    autoplay: true,
    animations: ["idle"]
};

  const { data: nfts, isLoading: nftLoading } = useNFTs(nftCollection);
  const { mutate: mintNft, isLoading, error } = useMintNFT(nftCollection);
  const { RiveComponent: LogoRive, rive: logorive } = useRive(logoParams);



  return (<div>
    <header style={{ background: "#F213A4", height: "70px", marginBottom: "50px", display: "grid" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "4fr 2fr", alignItems: "center", textAlign: "center", justifyItems: "center", width: "1000px",
        margin: "0 auto",

      }}>
        
        <div style={{ color: "white", fontSize: "1.2rem" , display: "grid", gridTemplateColumns: "1fr 32px 1fr", gridGap: "5px", alignItems: "center",}}>{address ? "Welcome" : ""} {address &&  <Davatar
      size={32}
      address={address}
      generatedAvatarType='jazzicon' 
    />}  {address?.slice(0,6)}...{address?.slice(address.length-4)}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",         gridGap: "10px" }}>
          {address && <ConnectWallet >Connect Wallet</ConnectWallet>}
          {session ? <button onClick={() => signOut()}><div>Logout</div></button> : <button onClick={() => signIn("twitter")}>Login with Twitter</button>}
        </div>
      </div>

    </header>

    {session ? (
      <>
        <Section>
          {session.user ? <img width="1000px" src={`https://twitter-profile-nft-converter-backend-kfrs.vercel.app/${session.user.name ? `@${session.user.name.replace(" ", "")}` : 'placeholder'}?theme=${theme}&profile=${session.user.image?.replace("_normal", "") || ''}`} /> : <Loader />}
          <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gridGap: "10px", margin: "20px 0px" }}>
            <Thumbnail onClick={() => { setTheme('thirdweb') }}><svg width="50px" height="50px" viewBox="0 0 159 99" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <rect id="path-7ljq7x_8ti-1" x="1.42108547e-14" y="0" width="158.6" height="98.6"></rect>
                <linearGradient x1="30.8225053%" y1="30.4747192%" x2="99.8269376%" y2="88.1691901%" id="linearGradient-7ljq7x_8ti-3">
                  <stop stop-color="#F213A4" offset="0%"></stop>
                  <stop stop-color="#5204BF" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Clipped">
                  <mask id="mask-7ljq7x_8ti-2" fill="white">
                    <use xlinkHref="#path-7ljq7x_8ti-1"></use>
                  </mask>
                  <g id="SVGID_1_"></g>
                  <path d="M0.4,8.3 C-1.2,4.3 1.8,0 6.1,0 L32.9,0 C35.4,0 37.6,1.5 38.6,3.8 L59.9,56.9 C60.5,58.3 60.5,59.9 59.9,61.4 L46.5,94.8 C44.5,99.9 37.2,99.9 35.1,94.8 L0.4,8.3 Z M52.1,8.1 C50.7,4.1 53.6,2.84217094e-14 57.8,2.84217094e-14 L81.2,2.84217094e-14 C83.8,2.84217094e-14 86.1,1.6 86.9,4 L106.3,57.1 C106.8,58.4 106.8,59.9 106.3,61.2 L94.7,93.1 C92.8,98.4 85.1,98.4 83.2,93.1 L52.1,8.1 Z M104.5,0 C100.2,0 97.2,4.3 98.8,8.3 L133.5,94.8 C135.5,99.9 142.8,99.9 144.9,94.8 L158.3,61.4 C158.9,59.9 158.9,58.3 158.3,56.9 L137,3.8 C136.1,1.5 133.8,0 131.3,0 L104.5,0 L104.5,0 Z" id="Shape" fill="url(#linearGradient-7ljq7x_8ti-3)" mask="url(#mask-7ljq7x_8ti-2)"></path>
                </g>
              </g>
            </svg>Thirdweb Theme</Thumbnail >
            <Thumbnail onClick={() => { setTheme('buildspace') }}><span style={{ fontSize: "50px" }}>🦄</span> Buildspace Theme</Thumbnail >
            <Thumbnail onClick={() => { setTheme('darkcomic') }}>Dark mode comics Theme</Thumbnail >
            <Thumbnail onClick={() => { setTheme('corgis') }}>Corgis Theme</Thumbnail >
            <Thumbnail onClick={() => { setTheme('avatar') }}>Avatar Theme</Thumbnail >
            <Thumbnail onClick={() => { setTheme('dev') }}>Developer Dao Theme</Thumbnail >
          </section>


          {
            address ? (
              <div style={{display: "grid", gridTemplateRows: "1fr 1fr", color: "white", textAlign: "center"}}>
                <MintButton
                  disabled={isLoading}
                  onClick={() =>
                    mintNft({
                      metadata: {
                        name: session.user && session.user.name || "- thirdweb -",
                        image: session.user && `https://twitter-profile-nft-converter-backend-kfrs.vercel.app/${session.user.name ? session.user.name : 'placeholder'}?theme=${theme}&profile=${session.user.image?.replace("_normal", "") || ''}`
                      },
                      to: address,
                    })
                  }
                >
                  <div>
                    Mint!
                  </div>
                </MintButton>
                <span>**Please use <span style={{color: "lightblue"}}>Goerli Network</span>**</span>
              </div>
            ) : (
                <AnimatePresence initial={true} >
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <ConnectButton onClick={() => connect()}>
                      <div>
                        <svg width="50px" height="5s0px" viewBox="0 0 150 136" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <defs>
                            <linearGradient x1="50%" y1="0%" x2="50%" y2="110.441033%" id="linearGradient-wi_2b57n2m-1">
                              <stop stop-color="#FF7E00" offset="0%"></stop>
                              <stop stop-color="#FF8862" offset="100%"></stop>
                            </linearGradient>
                            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-wi_2b57n2m-2">
                              <stop stop-color="#FFA043" offset="0%"></stop>
                              <stop stop-color="#FF8E20" offset="21.7611987%"></stop>
                              <stop stop-color="#FF5600" offset="100%"></stop>
                            </linearGradient>
                          </defs>
                          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Group-13" transform="translate(-0.000000, -0.000000)">
                              <polygon id="Path-231" fill="url(#linearGradient-wi_2b57n2m-1)" points="8.12399255 1.87583282e-12 63.6485533 42.6257536 43.2013143 60.6813609 11.0883862 69.7471584 1.52749491 102.120547 11.0883862 134.31721 43.2013143 125.005047 66.4774218 113.083598 83.7042768 113.083598 106.308077 125.005047 139.069757 134.31721 148.778004 101.354771 138.323138 69.7471584 107.089021 60.6813609 85.537239 42.6257536 141.927993 1.89426739e-12 95.4495909 17.4081591 54.8429955 17.4081591"></polygon>
                              <polygon id="Path-232" fill="#7E3A05" points="7.75617841 0 0 22.6167512 11.1131608 69.7592801 43.1541884 60.6919069 64.4602851 42.0776939"></polygon>
                              <polygon id="Path-233" fill="#7E3A05" points="141.792269 0 85.5397149 42.6331617 107.038679 60.6919069 138.196249 69.7592801 150 22.5801398"></polygon>
                              <polygon id="Path-31" fill="#DC5A00" opacity="0.3" points="35.8622915 73.7709621 48.1167268 86.4341957 63.2178486 90.902314 65.4047851 82.1409363 65.4047851 75.028971"></polygon>
                              <polygon id="Path-32" fill="#DC5A00" opacity="0.3" points="84.3164059 75.2361596 84.3164059 79.3453545 86.8749394 91.1892012 102.082845 86.4341957 114.41328 73.7709621"></polygon>
                              <path d="M48.3370468,85.670281 L58.0518879,81.0310814 C58.3513466,80.8880787 58.7102006,81.0102466 58.8602002,81.3062625 L63.3729885,90.212001 C63.5255164,90.5130064 63.4051516,90.8806678 63.1041462,91.0331958 C62.9643213,91.104049 62.8026133,91.1184523 62.652467,91.0734269 L48.4248377,86.8068881 C48.1016132,86.7099605 47.9181633,86.3693599 48.0150909,86.0461354 C48.0645963,85.8810497 48.1815214,85.7445502 48.3370468,85.670281 Z" id="Path-234" fill="#0E101E"></path>
                              <path d="M91.0316702,81.6161884 L86.7587766,90.5212688 C86.6127967,90.8255037 86.7410876,91.190475 87.0453226,91.3364549 C87.1848082,91.4033838 87.3444902,91.4149059 87.4921395,91.3686956 L101.718718,86.9161554 C102.040758,86.8153652 102.220118,86.4725928 102.119327,86.1505519 C102.067028,85.9834459 101.945548,85.8468086 101.785712,85.7753098 L91.8320273,81.3227696 C91.5298072,81.1875788 91.1748964,81.3176926 91.0316702,81.6161884 Z" id="Path-235" fill="#0E101E"></path>
                              <polygon id="Path-236" fill="#DBC0B1" points="45.9412116 121.243724 64.3121775 134.929134 86.1507128 134.929134 104.249066 121.243724 86.1507128 111.997061 64.3121775 111.997061"></polygon>
                              <polygon id="Path-237" fill="#0E101E" points="66.0679661 110.452193 63.0808978 112.006656 62.0162933 125.750281 64.0421297 124.047707 85.5095282 124.047707 87.3727088 125.750281 86.3547601 112.006656 83.4138275 110.452193"></polygon>
                              <polygon id="Path-25" fill="url(#linearGradient-wi_2b57n2m-2)" points="54.8429955 17.4081591 64.4602851 42.0776939 66.0679661 110.452193 83.4138275 110.452193 85.5397149 42.0776939 95.1629328 17.4081591"></polygon>
                              <polygon id="Path-28" fill="#FF7E00" opacity="0.504600888" points="1.37474542 100.662478 10.2064217 135.114508 43.6863544 124.61017 28.5296439 97.5685899"></polygon>
                              <polygon id="Path-29" fill="#FF7E00" opacity="0.5" points="121.146086 97.5685687 106.008147 124.81457 140.403975 136 148.778004 100.597991"></polygon>
                              <polygon id="Path-30" fill="#C4AC9C" points="62.0162933 125.750281 62.0162933 128.970294 45.9412116 121.243724 64.2948604 135.075996 86.1507128 134.929134 104.249066 121.243724 87.3727088 128.970294 87.3727088 125.750281 85.5095282 124.047707 64.0421297 124.047707"></polygon>
                              <polygon id="Path-34" fill="#DC5A00" opacity="0.3" points="30.8416497 97.5685899 45.9412116 121.243724 49.2850525 97.5685687"></polygon>
                              <polygon id="Path-37" fill="#DC5A00" opacity="0.298950195" points="101.690178 97.5685687 104.249066 121.243724 119.114133 97.5685687"></polygon>
                            </g>
                          </g>
                        </svg>
                    Connect Wallet
                    </div>
                    </ConnectButton>
                  </motion.div>
                </AnimatePresence>
              )
          }






        </Section>
        <section style={{ marginTop: "100px" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >

            <h1 style={{ color: "white", textAlign: "center" }}>Gallery Profile NFTs</h1>
            {/* <h1 style={{color: "white"}}>{JSON.stringify(nfts)}</h1> */}
            {!isLoading ? (
              <div>
                <section style={{ marginLeft: "50px", marginRight: "50px" }}>
                  <AnimatePresence initial={true} >
                    <motion.div


                      style={{ display: "grid", alignContent: "center", justifyContent: "center", width: "100%", gridGap: "10px", gridTemplateColumns: "repeat(3, 1fr)" }}
                    >

                      {nfts?.map((nft) => (

                        <motion.div key={nft.metadata.id.toString()} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <a href={`https://testnets.opensea.io/assets/goerli/0x6a324243cb69e3b27f6990673352a0817b08f6b6/${nft.metadata.id.toNumber()}`} style={{ cursor: "pointer" }}>
                            <div style={{ padding: "10px", width: "500px", background: "white", borderRadius: "16px" }}>

                              <img src={nft.metadata.image || ""} style={{ width: "500px", borderRadius: "16px" }} />
                              <h3 style={{ textAlign: "center" }}>{nft.metadata.name}</h3>
                              <h1></h1>

                            </div>
                          </a>
                        </motion.div>


                      ))}






                    </motion.div>



                  </AnimatePresence>
                </section>



              </div>
            ) : (
                <div style={{ display: "grid", alignContent: "center", alignItems: "center", justifyItems: "center" }}>
                  <Loader />
                </div>

              )}
          </motion.div>
        </section>
      </>
    ) : (
        <>
          <Section>
            <section style={{ display: "grid", justifyItems: "center", justifyContent: "center" }}>
              <AnimatePresence>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >


                  <h1 style={{ color: "white", fontSize: "3rem" }}>Twitter PFP → NFT PFP</h1>
                </motion.div>
              </AnimatePresence>
              <motion.div whileHover={{ scale: 1.2, transition: { duration: 1 } }} whileTap={{ scale: 0.9 }}>
                <div style={{width:"700px", height:"500px"}}>
                <LogoRive/>
                </div>
              
                {/* <svg width="700px" height="500px" viewBox="0 0 1500 660" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <linearGradient x1="0%" y1="40.32%" x2="98.5021389%" y2="59.68%" id="linearGradient-8w8p8firmt-1">
                      <stop stop-color="#FF0091" offset="0%"></stop>
                      <stop stop-color="#FF0087" offset="10.1902548%"></stop>
                      <stop stop-color="#FF00B7" offset="15.2947666%"></stop>
                      <stop stop-color="#FFBD81" offset="40.8623127%"></stop>
                      <stop stop-color="#F3C8D7" offset="51.2539806%"></stop>
                      <stop stop-color="#00BFFD" offset="58.0836392%"></stop>
                      <stop stop-color="#6EA9FF" offset="83.3631119%"></stop>
                      <stop stop-color="#B359B0" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="12.3000613%" y1="15.6651637%" x2="82.4567149%" y2="89.1050094%" id="linearGradient-8w8p8firmt-2">
                      <stop stop-color="#9CE1FE" offset="0%"></stop>
                      <stop stop-color="#26BDFE" offset="43.8539228%"></stop>
                      <stop stop-color="#00A7F3" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-8w8p8firmt-3">
                      <stop stop-color="#94E1FF" offset="0%"></stop>
                      <stop stop-color="#26BDFE" offset="44.834866%"></stop>
                      <stop stop-color="#00AFFF" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="9.75093285%" y1="50%" x2="90.6700725%" y2="53.3145439%" id="linearGradient-8w8p8firmt-4">
                      <stop stop-color="#0D8BCF" offset="0%"></stop>
                      <stop stop-color="#FFFFFF" offset="43.2805055%"></stop>
                      <stop stop-color="#0A85C9" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-8w8p8firmt-5">
                      <stop stop-color="#00D0E6" offset="0%"></stop>
                      <stop stop-color="#00A3C9" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-8w8p8firmt-6">
                      <stop stop-color="#00E0DA" offset="0%"></stop>
                      <stop stop-color="#00CEC7" offset="32.3864451%"></stop>
                      <stop stop-color="#00CAA9" offset="57.2136911%"></stop>
                      <stop stop-color="#00BDB3" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-8w8p8firmt-7">
                      <stop stop-color="#00DBDF" offset="0%"></stop>
                      <stop stop-color="#00B4BC" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="42.8104921%" y1="-0.611711027%" x2="68.6797685%" y2="148.938809%" id="linearGradient-8w8p8firmt-8">
                      <stop stop-color="#F213A4" offset="0%"></stop>
                      <stop stop-color="#5204BF" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="43.8593708%" y1="-0.611711027%" x2="65.9545734%" y2="148.938809%" id="linearGradient-8w8p8firmt-9">
                      <stop stop-color="#F213A4" offset="0%"></stop>
                      <stop stop-color="#5204BF" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Group">
                      <rect id="Rectangle" fill="url(#linearGradient-8w8p8firmt-1)" x="0" y="0" width="1500" height="660" rx="70"></rect>
                      <rect id="Rectangle" fill="#000000" x="68" y="29" width="1375" height="607" rx="269"></rect>
                      <g id="Group-34" transform="translate(134.000000, 109.000000)">
                        <circle id="Oval" fill="url(#linearGradient-8w8p8firmt-2)" cx="200" cy="200" r="200"></circle>
                        <path d="M337,129.281686 C326.955875,133.74354 316.161,136.748462 304.8315,138.102953 C316.399875,131.171144 325.28375,120.187244 329.458375,107.097621 C318.64075,113.517227 306.6515,118.183962 293.88875,120.699446 C283.685375,109.806604 269.114,103 253.007,103 C216.845875,103 190.273875,136.759844 198.441125,171.805886 C151.906,169.472518 110.6375,147.163249 83.007625,113.255435 C68.333875,138.444422 75.39775,171.396124 100.33175,188.082547 C91.1635,187.786608 82.5185,185.271124 74.976875,181.071062 C74.362625,207.034044 92.96075,231.323831 119.89675,236.730414 C112.013875,238.870283 103.38025,239.371103 94.59875,237.686526 C101.7195,259.950267 122.39925,276.147252 146.92375,276.602543 C123.3775,295.075984 93.7115,303.328138 64,299.822395 C88.786125,315.723441 118.236,325 149.8585,325 C253.84875,325 312.600625,237.117412 309.051625,158.295119 C319.994375,150.384434 329.4925,140.515997 337,129.281686 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero"></path>
                      </g>
                      <g id="Group-35" transform="translate(966.240085, 109.042836)">
                        <path d="M22.134581,159.960349 L89.3331577,41.9335343 C104.093165,16.0092251 131.630175,3.39016955e-14 161.46183,0 L290.747678,0 C320.375275,-3.33538355e-15 347.698777,15.9820716 362.221236,41.8063365 L427.087031,157.152606 C441.333641,182.486348 441.471686,213.384718 427.452008,238.844746 L362.369583,357.035784 C347.776089,383.537874 319.9182,400 289.663765,400 L160.172226,400 C129.518504,400 101.298719,383.302012 86.5436629,356.433089 L21.5337519,238.050188 C8.15295163,213.683781 8.38043314,184.117978 22.134581,159.960349 Z" id="Path-468" fill="url(#linearGradient-8w8p8firmt-3)"></path>
                        <path d="M361.759915,129.23885 C351.71579,133.700704 340.920915,136.705626 329.591415,138.060117 C341.15979,131.128309 350.043665,120.144408 354.21829,107.054785 C343.400665,113.474391 331.411415,118.141126 318.648665,120.65661 C308.44529,109.763768 293.873915,102.957164 277.766915,102.957164 C241.60579,102.957164 215.03379,136.717008 223.20104,171.76305 C176.665915,169.429683 135.397415,147.120413 107.76754,113.212599 C93.0937903,138.401586 100.157665,171.353288 125.091665,188.039711 C115.923415,187.743772 107.278415,185.228288 99.7367903,181.028227 C99.1225403,206.991208 117.720665,231.280995 144.656665,236.687578 C136.77379,238.827447 128.140165,239.328268 119.358665,237.64369 C126.479415,259.907431 147.159165,276.104416 171.683665,276.559707 C148.137415,295.033149 118.471415,303.285302 88.7599153,299.77956 C113.54604,315.680606 142.995915,324.957164 174.618415,324.957164 C278.608665,324.957164 337.36054,237.074576 333.81154,158.252283 C344.75429,150.341598 354.252415,140.473161 361.759915,129.23885 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero"></path>
                      </g>
                      <path d="M479.37492,170.034253 C515.79164,220.949675 557.125017,260.27159 603.375052,288 C672.750104,329.592615 750.660292,349.351186 877.390118,309.042836 C961.876669,282.170603 1022.12719,226.488975 1058.14167,141.997953 L1076.06581,492.718489 C1012.87193,418.291841 950.298532,373.655015 888.345613,358.808009 C795.416235,336.5375 732.746232,327.27588 618.949677,365.133786 C543.085306,390.37239 493.768747,420.313633 471,454.957516 L479.37492,170.034253 Z" id="Path-469" fill="url(#linearGradient-8w8p8firmt-4)" opacity="0.879789807"></path>
                      <g id="Clipped" transform="translate(670.963388, 288.000000)"></g>
                      <polygon id="Path-470" fill="url(#linearGradient-8w8p8firmt-5)" points="1307 387 1246.3975 422.453751 1246.3975 494.290684 1307 529 1368.64008 494.290684 1368.64008 422.453751"></polygon>
                      <polygon id="Path-471" stroke="#979797" fill="#FFFFFF" points="1253.61029 427.139587 1253.61029 489.789919 1307 520.767179 1361.1051 489.789919 1361.1051 427.139587 1307.51879 396.428109"></polygon>
                      <polygon id="Path-473" fill="#00B3BA" points="1259.59061 434 1259.59061 485.922025 1266.04951 488.711985 1266.04951 453.86562 1277.56359 496.341544 1282.92516 499.199368 1282.92516 419.179205 1275.03645 423.560968 1275.03645 459.189286 1266.04951 430.351676"></polygon>
                      <polygon id="Path-474" fill="url(#linearGradient-8w8p8firmt-6)" points="1289.89487 413.931727 1307.51879 403.557483 1329.59145 416.680626 1325.54986 423.064638 1307.51879 413.311061 1296.55668 419.179205 1296.55668 453.567257 1323.73208 453.567257 1323.73208 463.044251 1296.55668 463.044251 1296.55668 506.877802 1289.89487 502.38457"></polygon>
                      <polygon id="Path-475" fill="url(#linearGradient-8w8p8firmt-7)" points="1332.88279 419.179205 1329.59145 425.169063 1338.77299 431.500753 1338.77299 496.328747 1347.02747 491.673816 1347.02747 436.50049 1357.197 442.773948 1357.197 434"></polygon>
                      <path d="M671.4,296.3 C669.8,292.3 672.8,288 677.1,288 L703.9,288 C706.4,288 708.6,289.5 709.6,291.8 L730.9,344.9 C731.5,346.3 731.5,347.9 730.9,349.4 L717.5,382.8 C715.5,387.9 708.2,387.9 706.1,382.8 L671.4,296.3 Z" id="Path" fill="url(#linearGradient-8w8p8firmt-8)"></path>
                      <path d="M723.1,296.1 C721.7,292.1 724.6,288 728.8,288 L752.2,288 C754.8,288 757.1,289.6 757.9,292 L777.3,345.1 C777.8,346.4 777.8,347.9 777.3,349.2 L765.7,381.1 C763.8,386.4 756.1,386.4 754.2,381.1 L723.1,296.1 Z" id="Path" fill="url(#linearGradient-8w8p8firmt-9)"></path>
                      <path d="M775.5,288 C771.2,288 768.2,292.3 769.8,296.3 L804.5,382.8 C806.5,387.9 813.8,387.9 815.9,382.8 L829.3,349.4 C829.9,347.9 829.9,346.3 829.3,344.9 L808,291.8 C807.1,289.5 804.8,288 802.3,288 L775.5,288 L775.5,288 Z" id="Path" fill="url(#linearGradient-8w8p8firmt-8)"></path>
                    </g>
                  </g>
                </svg> */}
              </motion.div>

              <div>
                <motion.div whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}>
                  <TwitterButton onClick={() => signIn("twitter")}>
                    <div>
                      <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 248 204"><path d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"></path></svg>
                      <span>Login with Twitter</span>
                    </div>
                  </TwitterButton>
                </motion.div>
              </div>
            </section >
          </Section >
        </>
      )}



    <footer style={{ color: "white", display: "grid", alignContent: "center", alignItems: "center", justifyItems: "center" }}>
      <section style={{
        display: "grid",
        justifyItems: "center"
      }}>
        <h1>Built using <span style={{ color: "#F213A4" }}>thirdweb</span></h1>
        <svg width="100px" height="99px" viewBox="0 0 159 99" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <rect id="path-7ljq7x_8ti-1" x="1.42108547e-14" y="0" width="158.6" height="98.6"></rect>
            <linearGradient x1="30.8225053%" y1="30.4747192%" x2="99.8269376%" y2="88.1691901%" id="linearGradient-7ljq7x_8ti-3">
              <stop stop-color="#F213A4" offset="0%"></stop>
              <stop stop-color="#5204BF" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Clipped">
              <mask id="mask-7ljq7x_8ti-2" fill="white">
                <use xlinkHref="#path-7ljq7x_8ti-1"></use>
              </mask>
              <g id="SVGID_1_"></g>
              <path d="M0.4,8.3 C-1.2,4.3 1.8,0 6.1,0 L32.9,0 C35.4,0 37.6,1.5 38.6,3.8 L59.9,56.9 C60.5,58.3 60.5,59.9 59.9,61.4 L46.5,94.8 C44.5,99.9 37.2,99.9 35.1,94.8 L0.4,8.3 Z M52.1,8.1 C50.7,4.1 53.6,2.84217094e-14 57.8,2.84217094e-14 L81.2,2.84217094e-14 C83.8,2.84217094e-14 86.1,1.6 86.9,4 L106.3,57.1 C106.8,58.4 106.8,59.9 106.3,61.2 L94.7,93.1 C92.8,98.4 85.1,98.4 83.2,93.1 L52.1,8.1 Z M104.5,0 C100.2,0 97.2,4.3 98.8,8.3 L133.5,94.8 C135.5,99.9 142.8,99.9 144.9,94.8 L158.3,61.4 C158.9,59.9 158.9,58.3 158.3,56.9 L137,3.8 C136.1,1.5 133.8,0 131.3,0 L104.5,0 L104.5,0 Z" id="Shape" fill="url(#linearGradient-7ljq7x_8ti-3)" mask="url(#mask-7ljq7x_8ti-2)"></path>
            </g>
          </g>
        </svg>
      </section>
    </footer>

  </div >

  );
};

export default Home;
