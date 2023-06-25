import React from 'react'
import bgImg from "../img/ethereumLogo.png"
import { set, useForm } from 'react-hook-form';
import { useState } from 'react'
import '../Pages/TransactionSplit.css';
import Header from '../components/Header.js';


export default function TransactionSplit(){


    const { register, handleSubmit, watch, formState: {errors} } = useForm();

   // either neg or positive



    


    
    return (
        <div>
        <div><Header></Header></div>
        <section className='TransactionPage'>
        <div className="register">
            
            <div className="col-1">
                <h2>Split The Cost</h2>
                <span>Enter how much you spent and Split the Cost</span>

                <form id='form' className='flex flex-col' >
                    
                    <input type="text" {...register("amount", {required: true})}  placeholder='How Much Did You Spend?' />
                    {errors.make?.type === "required" && "Spending Amount is Required"}
                    
                    <input type="text" {...register("numPeople", {required: true})} placeholder='How Many People?' />
                    {errors.model?.type === "required" && "Number of People is Required"}

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