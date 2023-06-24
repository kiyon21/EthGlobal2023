
import React from 'react'
import bgImg from "../img/ethereumLogo.png"
import { useForm } from 'react-hook-form';
// import {useJsApiLoader, Autocomplete} from '@react-google-maps/api'
// import ReactDOM from 'react-dom';
// import { useRef, useState } from 'react'
// import React, { useEffect, useState2 } from 'react';
// import axios from 'axios';
 
// export const setAuthToken = token => {
//    if (token) {
//        axios.defaults.headers.common["Authorization"] = `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiYzgzMzg2YTYtNmMwMy00OWYxLWE0ZmEtMjYwZmUzNGY5MzExIiwiYXVkIjoiYzgzMzg2YTYtNmMwMy00OWYxLWE0ZmEtMjYwZmUzNGY5MzExIiwiZXhwIjoxNjg4MjAwNjUwLCJpYXQiOjE2ODc1OTU4NTAsImp0aSI6IjhhMzhjZGFmLWQ2NzgtNDhkOC1iMTc4LWExM2EzNjkyZDcxYyIsInVzZXIiOnsic3Vic2NyaWJlZCI6ZmFsc2V9fQ.hvxJiJh0rhJuxpn0zSdF_A9ObQ-VXTJGw7iFf9H5wSM'}`;
//    }
//    else
//        delete axios.defaults.headers.common["Authorization"];
// }

// const token = localStorage.getItem("token");
// if (token) {
//     setAuthToken(token);
// }



// const MyComponent = () => {
//     const [data, setData] = useState2(null);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const url = 'https://carapi.app/api/mileages?year=2016&make=honda&model=civic&trim=ex'; // Replace with your desired URL
//           const response = await fetch('https://carapi.app/api/mileages?year=2016&make=honda&model=civic&trim=ex', {
//             headers: {
//               'Accept': 'application/json',
//               'Authorization': 'cd393dd2-9490-4b4a-8e45-b713869e401e',
//               'Access-Control-Allow-Origin': 'metaSplit.com'
//             }
//           });
  
//           const jsonData = await response.json();
//           setData(jsonData);
//         } catch (error) {
//           console.error(error);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//     if (!data) {
//       return <div>Loading...</div>;
//     }
  
//     return (
//       <div>
//         {/* Render the fetched data */}
//       </div>
//     );
//   };


export default function Form(){

  //   const [distance, setDistance] = useState('');
  //   const [directionsResponse, setDirectionsResponse] = useState(null)
  //   /** @type React.MutableRefObject<HTMLInputElement> */
  // const originRef = useRef();
  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const destiantionRef = useRef();

    const{ register, handleSubmit, watch, formState: {errors} } = useForm();

    const onSubmit = data=>console.log(data);

      // const {isLoaded} = useJsApiLoader({
      //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
      // libraries:['places']
      // })
      
      // if(!isLoaded){
      //   return <div>Loading...</div>
      // }

     

  // async function calculateRoute() {
  //   if (originRef.current.value === '' || destiantionRef.current.value === '') {
  //     return
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService()
  //   const results = await directionsService.route({
  //     origin: originRef.current.value,
  //     destination: destiantionRef.current.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   })

  //   setDistance(results.routes[0].legs[0].distance.text);
  // }
    
    
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
                    {errors.make?.type === "required" && "Model of the car is Required"}

                    <input type="text" {...register("year", {required: true})} placeholder='Year' />
                    {errors.make?.type === "required" && "Year of the car is Required"}

                    
                    <input type="text" ref= 'destinationRef' {...register("sD", {required: true})} placeholder='Source Destination' />
                    {errors.make?.type === "required" && "Source Destination of the car is Required"}
                    
                  
                    <input type="text" ref='originRef' {...register("fD", {required: true})} placeholder='Final Destination' />
                    {errors.make?.type === "required" && "Final Destination of the car is Required"}

                    
                    <input type="text" {...register("peopleAmt", {required: true})} placeholder='How Many People?' />
                    {errors.make?.type === "required" && "The amount of people going on the trip is required"}

                    
      
                    <button className='btn' >Submit</button>
                    

                    
                </form>
            </div>

            <div className="col-2">
                <img src={bgImg} alt=""/>
            </div>
        </div>
        
    </section>
    )
}