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
import Davatar from "@davatar/react";
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

const LogOut = styled.button`
background: linear-gradient(to left, #40b4ff, #96d6ff);
padding: 3px 3px 8px 3px;
border: 1px solid transparent;
color: white;
font-weight: 300;
font-size: 1.0rem;
border-radius: 16px;
cursor: pointer;
height: 60px;
width: 200px;

div {
  background: #0A062F;
  height: 40px;
  width: 180px;
  font-weight: bold;
  color: white;
  display: grid;
  padding: 5px;
  
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-items: center;
  border-radius: 16px;
}

:hover {
  background:  linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
  border-radius: 16px;
  color: #F213A4;
}

:hover div {
  background: #F213A4;
}


`


const Home: NextPage = () => {
  const sdk = useSDK();
  const address = useAddress();
  const connect = useMetamask();
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

        <div style={{ color: "white", fontSize: "1.2rem", display: "grid", gridTemplateColumns: "1fr 32px 1fr", gridGap: "5px", alignItems: "center", }}>{address ? "Welcome" : ""} {address && <Davatar
          size={32}
          address={address}
          generatedAvatarType='jazzicon'
        />}  {address?.slice(0, 6)}{address && "..."}{address?.slice(address.length - 4)}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "10px", alignItems: "center" }}>
          {address && <ConnectWallet >Connect Wallet</ConnectWallet>}
          {session && <LogOut onClick={() => signOut()}><div>Logout</div></LogOut>}
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
              <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", color: "white", textAlign: "center" }}>
                <MintButton
                  disabled={isLoading}
                  onClick={() =>
                    mintNft({
                      metadata: {
                        name: session.user && session.user.name || "- thirdweb -",
                        image: session.user && `https://twitter-profile-nft-converter-backend-kfrs.vercel.app/${session.user.name ? session.user.name : 'placeholder'}?theme=${theme}&profile=${session.user.image?.replace("_normal", "") || ''}`,
                        attributes: [
                          {
                            "value": theme
                          },
                          {
                            "value": session.user?.name
                          }
                        ]
                      },
                      to: address,
                    })
                  }
                >
                  <div>
                    Mint!
                  </div>
                </MintButton>
                <span>**Please use <span style={{ color: "lightblue" }}>Goerli Network</span>**</span>
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

            <h1 style={{ color: "white", textAlign: "center" }}><span>Twitter</span>Profile NFTs Gallery </h1>

            {!isLoading ? (
              <div>
                <section style={{ marginLeft: "50px", marginRight: "50px" }}>
                  <AnimatePresence initial={true} >
                    <motion.div


                      style={{ display: "grid", alignContent: "center", justifyContent: "center", width: "100%", gridGap: "10px", gridTemplateColumns: "repeat(3, 1fr)" }}
                    >

                      {nfts?.map((nft) => (

                        <motion.div key={nft.metadata.id.toString()} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <a href={`https://testnets.opensea.io/assets/goerli/0x6a324243cb69e3b27f6990673352a0817b08f6b6/${nft.metadata.id.toNumber()}`} style={{ cursor: "pointer", textDecoration: "none", color: "#F213A4" }} target="_blank">
                            <div style={{ padding: "10px", width: "500px", background: "white", borderRadius: "16px" }}>
                              <img src={nft.metadata.image || ""} style={{ width: "500px", borderRadius: "16px" }} />
                              <h3 style={{ textAlign: "center" }}>{nft.metadata.name}</h3>
                              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 100 100"><path fill="#2081E2" d="M100 50C100 77.6127 77.6127 100 50 100C22.3873 100 0 77.6127 0 50C0 22.3873 22.3873 0 50 0C77.6185 0 100 22.3873 100 50Z" /><path fill="#fff" d="M24.6679 51.6801L24.8836 51.341L37.8906 30.9932C38.0807 30.6953 38.5276 30.7261 38.6714 31.0497C40.8444 35.9196 42.7194 41.9762 41.841 45.7468C41.466 47.2982 40.4386 49.3992 39.2827 51.341C39.1338 51.6236 38.9694 51.901 38.7947 52.1681C38.7125 52.2914 38.5738 52.3633 38.4248 52.3633H25.048C24.6884 52.3633 24.4778 51.9729 24.6679 51.6801Z" /><path fill="#fff" d="M82.6444 55.461V58.6819C82.6444 58.8668 82.5314 59.0312 82.367 59.1031C81.3602 59.5346 77.9132 61.1168 76.48 63.11C72.8224 68.2008 70.0279 75.48 63.7812 75.48H37.721C28.4847 75.48 21 67.9697 21 58.7024V58.4045C21 58.1579 21.2003 57.9576 21.4469 57.9576H35.9745C36.2621 57.9576 36.4727 58.2247 36.4471 58.5072C36.3443 59.4524 36.519 60.4182 36.9659 61.2966C37.8289 63.0484 39.6166 64.1426 41.5481 64.1426H48.74V58.5278H41.6303C41.2656 58.5278 41.0499 58.1065 41.2605 57.8086C41.3375 57.6904 41.4249 57.5672 41.5173 57.4285C42.1903 56.473 43.1509 54.9884 44.1064 53.2983C44.7588 52.1579 45.3906 50.9404 45.8992 49.7178C46.002 49.4969 46.0841 49.2708 46.1663 49.0499C46.305 48.6595 46.4489 48.2948 46.5516 47.9301C46.6544 47.6218 46.7365 47.2982 46.8187 46.9951C47.0602 45.9574 47.1629 44.8581 47.1629 43.7177C47.1629 43.2708 47.1424 42.8033 47.1013 42.3564C47.0807 41.8684 47.0191 41.3803 46.9574 40.8923C46.9163 40.4608 46.8393 40.0344 46.7571 39.5875C46.6544 38.9351 46.5105 38.2879 46.3461 37.6354L46.2896 37.3889C46.1663 36.9419 46.0636 36.5156 45.9198 36.0687C45.5139 34.6662 45.0465 33.2998 44.5533 32.0207C44.3735 31.5121 44.168 31.0241 43.9625 30.5361C43.6595 29.8015 43.3512 29.1337 43.0687 28.5018C42.9249 28.2141 42.8016 27.9521 42.6783 27.685C42.5396 27.3819 42.3958 27.0788 42.2519 26.7912C42.1492 26.5703 42.031 26.3648 41.9488 26.1593L41.0704 24.536C40.9471 24.3151 41.1526 24.0531 41.394 24.1199L46.8907 25.6096H46.9061C46.9163 25.6096 46.9215 25.6148 46.9266 25.6148L47.6509 25.8151L48.4472 26.0412L48.74 26.1233V22.8562C48.74 21.2791 50.0037 20 51.5654 20C52.3462 20 53.0551 20.3185 53.5637 20.8373C54.0722 21.3562 54.3907 22.0651 54.3907 22.8562V27.7056L54.9764 27.8699C55.0226 27.8854 55.0688 27.9059 55.1099 27.9367C55.2538 28.0446 55.4592 28.2038 55.7212 28.3991C55.9267 28.5634 56.1476 28.7638 56.4147 28.9693C56.9438 29.3956 57.5757 29.9453 58.2692 30.5772C58.4541 30.7364 58.6339 30.9008 58.7983 31.0652C59.6922 31.8974 60.6939 32.8734 61.6494 33.9522C61.9165 34.2553 62.1785 34.5635 62.4456 34.8871C62.7127 35.2159 62.9953 35.5395 63.2418 35.8632C63.5655 36.2947 63.9148 36.7416 64.2179 37.2091C64.3617 37.43 64.5261 37.656 64.6648 37.8769C65.0552 38.4676 65.3994 39.079 65.7282 39.6903C65.8669 39.9728 66.0107 40.281 66.134 40.5841C66.4987 41.4009 66.7864 42.2331 66.9713 43.0653C67.0278 43.2451 67.0689 43.4403 67.0895 43.615V43.6561C67.1511 43.9026 67.1717 44.1646 67.1922 44.4317C67.2744 45.2845 67.2333 46.1372 67.0484 46.9951C66.9713 47.3599 66.8686 47.704 66.7453 48.0688C66.622 48.4181 66.4987 48.7828 66.3395 49.127C66.0313 49.841 65.6665 50.5551 65.235 51.2229C65.0963 51.4695 64.9319 51.7315 64.7675 51.9781C64.5877 52.24 64.4028 52.4866 64.2384 52.7281C64.0124 53.0363 63.771 53.3599 63.5244 53.6476C63.3035 53.9507 63.0775 54.2538 62.8309 54.5209C62.4867 54.9267 62.1579 55.312 61.8137 55.6819C61.6083 55.9233 61.3874 56.1699 61.1613 56.3908C60.9405 56.6373 60.7144 56.8582 60.5089 57.0637C60.1648 57.4079 59.8771 57.675 59.6356 57.8959L59.0706 58.4148C58.9884 58.4867 58.8805 58.5278 58.7675 58.5278H54.3907V64.1426H59.8976C61.1305 64.1426 62.3018 63.7059 63.247 62.9045C63.5706 62.622 64.9833 61.3994 66.6528 59.5552C66.7093 59.4935 66.7813 59.4473 66.8635 59.4268L82.0742 55.0295C82.3568 54.9473 82.6444 55.163 82.6444 55.461Z" /></svg>

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
                <div style={{ width: "700px", height: "500px" }}>
                  <LogoRive />
                </div>
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
