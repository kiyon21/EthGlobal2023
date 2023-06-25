import React from "react";
import "./SuccessPage.css";

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useSearchParams } from 'react-router-dom';


function SuccessPage () {
    const queryParams = new URLSearchParams(window.location.search)
    const walletAddress = queryParams.get("wallet")
    const moneyAmount = queryParams.get("amount")

    let turnQR = "mena"

    return (
        
        <section className="SuccessPage">
        <div className="success">
            
            <div className="col-1">
            <div style={{ background: 'white', padding: '16px' }}>
                <QRCode size={256} value={turnQR} />
                </div>
            </div>

            <div className="col-2">
                <p>Lorem Ipsum</p>
            </div>
        </div>
        
    </section>
    )
}
export default SuccessPage; 