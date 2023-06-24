import React from "react";
import "./StartPage.css";
import bgImg from "../img/ethereumLogo.png"
import { Link } from "react-router-dom"

function StartPage () {
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
                            <Link to="/formPage"><i class="fa fa-credit-card"></i> <p>Travel Splitter</p></Link>
                        </li>
                    </ul> 
                </div>

            
            
            </div>

            <div className="col-2">
                <img src={bgImg} alt=""/>
            </div>
        </div>
        
    </section>
    )
}
export default StartPage;