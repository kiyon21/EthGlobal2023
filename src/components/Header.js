import React from 'react'
import ethereumLogo from "../img/ethereumLogo.png"
import { Link } from "react-router-dom"
import './header.css';

export default function Header(){
    return (
        <div className='header'>
            <div className='content'>
                <Link to='../'>
                <img className='logo' src= {ethereumLogo}></img>
                </Link>
                
                <Link to='../'>
                <h1 className='name'><span>M</span>K<span>M</span></h1>
            </Link>
            
            </div>
            
        </div>
    )
}