import axios from 'axios'
import React,{useEffect, useState}  from 'react'
import DataItem from './DataItem'
import Loader from './Loader'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const DataList = ({currentUser,temp}) => {

    const [temp2, settemp2] = useState(false)
    const [datalist, setdatalist] = useState([])
    const [latitude, setlatitude] = useState(Number)
    const [longitude, setlongitude] = useState(Number)
    const [, seterror] = useState(null)
    const [, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)

    const handleClick = async (event) => {
        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        // Call your backend to create the Checkout Session
        const response = await fetch('https://listiee.herokuapp.com/api/data/create-checkout-session', { method: 'POST' });
    
        const session = await response.json();
    
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
    
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        }
    }

    useEffect(() => {
        const data=localStorage.getItem('user')
        let currentUser
        if(data)
        {
          currentUser=JSON.parse(data)
        }
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setlatitude(position.coords.latitude);
                setlongitude(position.coords.longitude);
              });
        } else {
          console.log("Not Available");
        }
        const getdata=async ()=>{        
            const config = {
                headers: {
                'Content-type':'application/json',
                Authorization:`Bearer ${currentUser.token}` 
                },
            }
            try{
                setloading(true)
                const {data}=await axios.get(`https://listiee.herokuapp.com/api/data?lat=${latitude}&long=${longitude}`,config)
                // const {data}=await axios.get('https://pure-river-17146.herokuapp.com/api/data',config)

                setsuccess(data.success)
                setdatalist(data.data)
                setalert(data.message)
                setloading(false)
            }catch(e){
                seterror('Unable to Load')
                setloading(false)
            }
        }
        getdata()
        
        // eslint-disable-next-line
    }, [temp,temp2])

    return (
        <>
        <NavBar></NavBar>
        <div className="d-flex">
            <div className="my-custom-add-post">
              <Link className="my-custom-add-post-link" to="/add-post">Add a post</Link>
            </div>
            <div className="my-custom-add-post">
              <div role="link" onClick={handleClick} className="my-custom-add-post-link" to="/add-post">Payment</div>
            </div>
        </div>
            {
                loading?<Loader></Loader>:
                !success?<div>Failed to load</div>:
                <div className="list">
                <ul>
                    {datalist.map(dataitem=>{ console.log(dataitem)
                   return <DataItem key={dataitem._id} currentUser={currentUser} dataitem={dataitem} temp2={temp2} settemp2={settemp2}></DataItem>
})}
                </ul>
                </div>
            }
        </>
    )
}

export default DataList