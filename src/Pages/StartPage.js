import React from "react";
import "./StartPage.css";
import bgImg from "../img/ethereumLogo.png"
import { Link } from "react-router-dom"
import { MetaMaskSDK } from '@metamask/sdk';
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

function StartPage () {
    const [hasProvider, setHasProvider] = useState(null)
    const initialState = { accounts: [] }               /* New */
    const [wallet, setWallet] = useState(initialState)  /* New */

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
      setHasProvider(Boolean(provider)) // transform provider to true or false
    }

    getProvider()
  }, [])

   const updateWallet = async (accounts:any) => {     /* New */
    setWallet({ accounts })                          /* New */
  }                                                  /* New */

  const handleConnect = async () => {                /* New */
    let accounts = await window.ethereum.request({   /* New */
      method: "eth_requestAccounts",                 /* New */
    })                                               /* New */
    updateWallet(accounts)                           /* New */
  }                                                  /* New */


    return (
        
        <section className="StartPage">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="start">
            
            <div className="col-1">
            <h2>MetaSplit</h2>
            <div className="subSocial">
                <span>What would you like to split?</span>
                </div>
                <div className="startbuttons">
                    <ul>
                        <li>
                            <Link to="/formPage"><i class="fa fa-car"></i><p>Travel Splitter</p></Link>
                        </li>
                        <li>
                            <Link to="/formPage"><i class="fa fa-credit-card"></i> <p>General Transaction</p></Link>
                        </li>
                    </ul> 
                </div>
                <button onClick={handleConnect}>Connect MetaMask</button>

                <button class="button-86" role="button" onClick={handleConnect}>Connect MetaMask Wallet</button>
                { wallet.accounts.length > 0 &&                /* New */
        <div>Wallet Accounts: { wallet.accounts[0] }</div> //format for later
      }
            
            </div>

            <div className="col-2">
                <img src={bgImg} alt=""/>
            </div>
        </div>
        
    </section>
    )
}
export default StartPage;