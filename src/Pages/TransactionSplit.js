import React from 'react'
import bgImg from "../img/neonEth (1).png"
import { set, useForm } from 'react-hook-form';
import { useState } from 'react'
import '../Pages/TransactionSplit.css';
import Header from '../components/Header.js';
import { Link } from "react-router-dom"

var finalAmt = "";
var amtPeople = "";
var finalSentance = "";

function calc(mydata) {

    if (mydata.numPeople != 0) {
        finalAmt = mydata.amount / mydata.numPeople;
        amtPeople = mydata.numPeople;
        finalSentance = "Out of " + amtPeople + " people, each person must pay $" + finalAmt + "!";
        console.log(finalSentance);

    }
    else {
        finalAmt = mydata.amount;
    }
    
    window.location.href = "../payPage/" + finalAmt +'/' + finalSentance;

}


export default function TransactionSplit(){


    const { register, handleSubmit, watch, formState: {errors} } = useForm();

   // either neg or positive
   const onSubmit = mydata=>calc(mydata);

    return (
        <div>
        <div><Header></Header></div>
        <section className='TransactionPage'>
        <div className="register">
            
            <div className="col-1">
                <h2>Split The Cost</h2>
                <span>Enter how much you spent and Split the Cost</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    
                    <input type="text" {...register("amount", {required: true})}  placeholder='How Much Did You Spend?' />
                    {errors.amount?.type === "required" && "Spending Amount is Required"}
                    
                    <input type="text" {...register("numPeople", {required: true})} placeholder='How Many People?' />
                    {errors.numPeople?.type === "required" && "Number of People is Required"}

                    <button className='btn'>Submit</button>
                    
                </form>          
            </div>
                <div className="col-2">
                    <img src={bgImg} alt=""/>
                </div>
        </div>
    </section>
    </div>
    )
}