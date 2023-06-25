import React from "react";
import "./PayPage.css";
import bgImg from "../img/ethereumLogo.png"
import { Link } from "react-router-dom"
import { MetaMaskSDK } from '@metamask/sdk';
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

function PayPage () {
    const [hasProvider, setHasProvider] = useState(null)
    const initialState = { accounts: [] }               
    const [wallet, setWallet] = useState(initialState)  

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {                /* New */
      if (accounts.length > 0) {                                /* New */
        updateWallet(accounts)                                  /* New */
      } else {                                                  /* New */
        // if length 0, user is disconnected                    /* New */
        setWallet(initialState)                                 /* New */
      }                                                         /* New */
    } 

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
      setHasProvider(Boolean(provider)) // transform provider to true or false
      if (provider) {                                           /* New */
      const accounts = await window.ethereum.request(         /* New */
        { method: 'eth_accounts' }                            /* New */
      )                                                       /* New */
      refreshAccounts(accounts)                               /* New */
      window.ethereum.on('accountsChanged', refreshAccounts)  /* New */
    } 
}

    getProvider()
    return () => {                                              /* New */
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
    }
  }, [])

   const updateWallet = async (accounts:any) => {     
    setWallet({ accounts })                          
  }                                                  

  const handleConnect = async () => {                
    let accounts = await window.ethereum.request({   
      method: "eth_requestAccounts",                 
    })                                               
    updateWallet(accounts)                           
  }                                                  


    return (
        
        <section className="PayPage">
        <div className="pay">
            
            <div className="col-1">
            <h2>Metasplit</h2>
            <div className="payAmount">
                <span>"amount"</span>
                </div>

                { window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&  /* Updated */
        <button class="button-85" role="button" onClick={handleConnect}>Connect MetaMask Wallet</button>
      }

                
                { wallet.accounts.length > 0 &&                
        <div className="connected" >
            <div>Wallet Accounts: { wallet.accounts[0] }</div>

            <button class="button-pay" role="button" >Pay</button>
        
            </div> //format for later
        
      }
            
            </div>

            <div className="col-2">
                <img src={bgImg} alt=""/>
            </div>
        </div>
        
    </section>
    )
}
export default PayPage;