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
    const refreshAccounts = (accounts: any) => {                
      if (accounts.length > 0) {                               
        updateWallet(accounts)                                 
      } else {                                                  
        // if length 0, user is disconnected                    
        setWallet(initialState)                                
      }                                                       
    } 
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
      setHasProvider(Boolean(provider)) // transform provider to true or false
      if (provider) {                                          
      const accounts = await window.ethereum.request(        
        { method: 'eth_accounts' }                         
      )                                                     
      refreshAccounts(accounts)                              
      window.ethereum.on('accountsChanged', refreshAccounts)  
    } 
}

    getProvider()
    return () => {                                             
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

  const handlePay = async () => {

    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    let params = [
      {
        from: accounts[0],
        to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
        value: '0xde0b6b3a7640000', 
      },
    ];
    
    window.ethereum.request({
        method: 'eth_sendTransaction',
        params,
      })
      .then((result) => {
        // The result varies by RPC method.
        // For example, this method returns a transaction hash hexadecimal string upon success.
      })
      .catch((error) => {
        // If the request fails, the Promise rejects with an error.
      });
  } 
  
  
  
  }                              
  
  const currentURL = window.location.href;
  const payPageIndex = currentURL.indexOf("payPage");

// Extract the part after "payPage"
const modifiedUrl = currentURL.substring(payPageIndex + "payPage".length);

// Replace %20 with spaces
const parsedUrl = decodeURIComponent(modifiedUrl.replace(/%20/g, " "));

console.log(parsedUrl);

// Find the index of the second "/"
const secondSlashIndex = parsedUrl.indexOf("/", 1);

// Extract the two strings
const string1 = parsedUrl.substring(1, secondSlashIndex);
const string2 = parsedUrl.substring(secondSlashIndex + 1);

console.log(string1); 
console.log(string2);



    return (
        
        <section className="PayPage">
        <div className="pay">
            
            <div className="col-1">
            <h2>Metasplit</h2>
            <div className="payAmount">
                <span>{string2}</span>
                </div>

                { window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&  
        <button class="button-85" role="button" onClick={handleConnect}>Connect MetaMask Wallet</button>
      }

                
                { wallet.accounts.length > 0 &&                
        <div className="connected" >
            <div className="accountId2">Wallet Accounts: { wallet.accounts[0] }</div>

            <button class="button-pay" role="button" onClick={handlePay}>Pay</button>
        
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