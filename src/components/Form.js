
import React from 'react'
import bgImg from "../img/purpleEth (1).png"
import { set, useForm } from 'react-hook-form';
import { useState } from 'react'
import axios from 'axios';
// import {useJsApiLoader, Autocomplete} from '@react-google-maps/api'
// import ReactDOM from 'react-dom';
// import { useRef, useState } from 'react'
// import React, { useEffect, useState2 } from 'react';
// import axios from 'axios';
 
var mileageFinal = "";
var distanceFinal = "";
var gasPrices = "";
var finalAmt = "";
var finalSentance = "";




// -H "Content-Type: application/json" \
//   -H "Authorization: Bearer $OPENAI_API_KEY" \

async function myCallOpenAI(mydata) {
    console.log(mydata.make);
    await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
        "prompt": "Q: What is the gas mileage of a" + mydata.model + mydata.make + mydata.year + mydata.trim + ". For your answer, 1. give only the number, 2. no explanation, 3. no details, 4. L/100km, 5. Dont show the detials. Please abide." + "\nA:",
        "temperature": 0,
        "max_tokens": 100,
        "top_p": 1,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        "stop": ["\n"]})
    }).then((data) => data.json())
    .then((data) => {
        console.log(data)
        mileageFinal = data.choices[0].text;
        console.log(data.choices[0].text);
    });
    console.log("OPENAI");
    mileageFinal = mileageFinal.replace(/\s/g, "");  // Remove spaces
    mileageFinal = mileageFinal.match(/^\d+(\.\d+)?/)[0];
    console.log((mileageFinal));
    myCallOpenAIDistance(mydata.sD, mydata.fD);
    gasPricesFunc(mydata.src, mydata.srcCountry);
    
    mileageFinal = parseFloat(mileageFinal);

    distanceFinal = parseInt(distanceFinal);
    
    gasPrices = parseFloat(gasPrices);

    var peopleAmt = parseFloat(mydata.peopleAmt);

    

    finalAmt = ((mileageFinal/100) * distanceFinal * gasPrices)/peopleAmt; 

    //finalAmt = finalAmt * 1.32;

    finalAmt = 3;

    
    finalSentance = "For " + mydata.peopleAmt + " people driving in a " + mydata.year + " " + mydata.make + " " + mydata.model + " " + mydata.trim + " for 107 km,  each person must stake $" + finalAmt + " for gas!";

    console.log(finalAmt);
    console.log(finalSentance);

    window.location.href = "../payPage/" + finalAmt +'/' + finalSentance;

}

async function myCallOpenAIDistance(src, dest) {
    await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
        "prompt": "Q: What is the distance between" + src + " and " + dest + ". For your answer, 1. give only the number, 2. no explanation, 3. no details, 4. Have the units in km, 5. Dont show the detials. Please abide." + "\nA:",
        "temperature": 0,
        "max_tokens": 100,
        "top_p": 1,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        "stop": ["\n"]})
    }).then((data) => data.json())
    .then((data) => {
        console.log(data)
        distanceFinal = data.choices[0].text;
        console.log(data.choices[0].text);
    });
    console.log("OPENAI");
    distanceFinal = distanceFinal.replace(/\s/g, "").replace(/[a-zA-Z]/g, "");
    console.log(distanceFinal);
}


async function gasPricesFunc(city, country) {
    await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
        "prompt": "Q: What is the gas price in " + city + ", " + country + " right now. For your answer, 1. give only the number, 2. no explanation, 3. no details, 4. Have the units as $CAD/L, 5. Dont show the detials, 6. The price must be in CAD, not USD. Please abide." + "\nA:",
        "temperature": 0,
        "max_tokens": 100,
        "top_p": 1,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        "stop": ["\n"]})
    }).then((data) => data.json())
    .then((data) => {
        console.log(data)
        gasPrices = data.choices[0].text;
        console.log(data.choices[0].text);
    });
    console.log("OPENAI");
    gasPrices = gasPrices.match(/\d+(\.\d+)?/)[0];
    console.log(gasPrices);

}


export default function Form(){


    const { register, handleSubmit, watch, formState: {errors} } = useForm();

   // either neg or positive
   
   const [mileage, setMileage] = useState("") 

   
    const onSubmit = mydata=>myCallOpenAI(mydata);


    


    
    return (
        
        //https://carapi.app
        <section>
        <div className="register">
            
            <div className="col-1">
                <h2>Split The Trip</h2>
                <span>Enter your car information and split the cost</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    
                    <input type="text" {...register("make", {required: true})}  placeholder='Make' />
                    {errors.make?.type === "required" && "Make of the car is Required"}
                    
                    <input type="text" {...register("model", {required: true})} placeholder='Model' />
                    {errors.model?.type === "required" && "Model of the car is Required"}

                    <input type="text" {...register("trim", {required: true})} placeholder='Trim' />
                    {errors.trim?.type === "required" && "Trim of the car is Required"}

                    <input type="text" {...register("year", {required: true})} placeholder='Year' />
                    {errors.year?.type === "required" && "Year of the car is Required"}

                    
                    <input type="text" ref= 'destinationRef' {...register("sD", {required: true})} placeholder='Source Destination' />
                    {errors.sD?.type === "required" && "Source Destination of the car is Required"}
                    
                  
                    <input type="text" ref='originRef' {...register("fD", {required: true})} placeholder='Final Destination' />
                    {errors.fD?.type === "required" && "Final Destination of the car is Required"}

                    <input type="text" ref='originRef' {...register("srcCountry", {required: true})} placeholder='Source Country' />
                    {errors.srcCountry?.type === "required" && "Source Country"}

                    <input type="text" {...register("peopleAmt", {required: true})} placeholder='How Many People?' />
                    {errors.peopleAmt?.type === "required" && "The amount of people going on the trip is required"}

                    <button className='btn'>Submit</button>
        
                    {
                        mileage !== "" ? (
                            <>
                            <h3>Here is the mileage for a {mileage}</h3>
                            {mileageFinal = mileage}
                            </>
                        )
                        : 
                        null
                    }
                </form>          
            </div>
                <div className="col-2">
                    <img src={bgImg} alt=""/>
                </div>
        </div>
    </section>
    )
}

