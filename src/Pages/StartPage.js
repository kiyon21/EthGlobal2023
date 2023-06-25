import React from "react";
import "./StartPage.css";
import bgImg from "../img/ethereumLogo.png"
import { Link } from "react-router-dom"
import { MetaMaskSDK } from '@metamask/sdk';
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

function StartPage () {
    const [hasProvider, setHasProvider] = useState(null)
    const initialState = { accounts: [] }               
    const [wallet, setWallet] = useState(initialState) 
    
    const [isConnecting, setIsConnecting] = useState(false)  /* New */
    const [error, setError] = useState(false)                /* New */
    const [errorMessage, setErrorMessage] = useState("")     /* New */

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

  const handleConnect = async () => {                   /* Updated */
  setIsConnecting(true)                               /* New */
  await window.ethereum.request({                     /* Updated */
    method: "eth_requestAccounts",
  })
  .then((accounts:[]) => {                            /* New */
    setError(false)                                   /* New */
    updateWallet(accounts)                            /* New */
  })                                                  /* New */
  .catch((err:any) => {                               /* New */
    setError(true)                                    /* New */
    setErrorMessage(err.message)                      /* New */
  })                                                  /* New */
  setIsConnecting(false)                              /* New */
}

const disableConnect = Boolean(wallet) && isConnecting



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
                            <Link to="/transactionSplitPage"><i class="fa fa-credit-card"></i> <p>General Transaction</p></Link>
                        </li>
                    </ul> 
                </div>
                { window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&  /* Updated */
        <button class="button-86" role="button" disabled={disableConnect} onClick={handleConnect}>Connect MetaMask Wallet</button>
      }

                
                { wallet.accounts.length > 0 &&                
        <div className="accountId">Wallet Accounts: { wallet.accounts[0] }</div> //format for later
      }
      { error && (                                        /* New code block */
          <div onClick={() => setError(false)}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )
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