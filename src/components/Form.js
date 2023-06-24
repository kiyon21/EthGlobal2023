import React from 'react'
import bgImg from "../img/ethereumLogo.png"
import { useForm } from 'react-hook-form';

export default function Form(){

    const{ register, handleSubmit, watch, formState: {errors} } = useForm()
    const onSubmit = data=>console.log(data);

    return (
        
        
        <section>
        <div className="register">
            
            <div className="col-1">
                <h2>Split The Trip</h2>
                <span>Enter your car information and split the cost</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("make", {required: true})}  placeholder='Make' />
                    {errors.make?.type === "required" && "Make of the car is Required"}
                    
                    <input type="text" {...register("model", {required: true})} placeholder='Model' />
                    {errors.make?.type === "required" && "Model of the car is Required"}

                    <input type="text" {...register("year", {required: true})} placeholder='Year' />
                    {errors.make?.type === "required" && "Year of the car is Required"}

                    <input type="text" {...register("sD", {required: true})} placeholder='Source Destination' />
                    {errors.make?.type === "required" && "Source Destination of the car is Required"}


                    <input type="text" {...register("fD", {required: true})} placeholder='Final Destination' />
                    {errors.make?.type === "required" && "Final Destination of the car is Required"}

                    <button className='btn'>Submit</button>
                </form>
            </div>

            <div className="col-2">
                <img src={bgImg} alt=""/>
            </div>
        </div>
        
    </section>
    )
}