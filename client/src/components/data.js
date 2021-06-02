import React, { useState, useEffect } from 'react'
import { Button, Form} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import NavBar from './NavBar'

const Data = () => {
    
    const history=useHistory()
    const [temp, settemp] = useState(false)
    const [about, setabout] = useState('')
    const [heading, setheading] = useState('')
    const [img, setimg] = useState('')
    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    const [location, setlocation] = useState([])
    const [address, setaddress] = useState('')
    const [alert, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)

    const data=localStorage.getItem('user')
    let currentUser
    if(data)
    {
      currentUser=JSON.parse(data)
    }

    if(!currentUser){
        history.push('/login')
    }

    useEffect(()=>{
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    setlocation([position.coords.longitude, position.coords.latitude]);
                    setlatitude(position.coords.latitude);
                    setlongitude(position.coords.longitude);
                  });
                  axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                  .then((res)=>{
                    setaddress(res.data.countryName);
                  });
            } else {
              console.log("Not Available");
            }
    },[latitude,longitude])
   
    const submitHandler=async (e)=>{
        e.preventDefault()
        const config = {
            headers: {
            'Content-type':'application/json',
            Authorization:`Bearer ${currentUser.token}` 
            },
        }
        try{
            setloading(true)
            const {data}=await axios.post('https://listiee.herokuapp.com/api/data',{about,heading,address,img,location},config)
            // const {data}=await axios.post('https://pure-river-17146.herokuapp.com/api/data',{email,userName,mobileNumber,address},config)
            
            setabout('');
            setheading('');
            setimg('');
            setaddress('');
            setsuccess(data.success)
            setalert(data.message)
            setloading(false)
            data.success?history.push('/home'):history.push('/add-post');
            if(temp)
                settemp(false)
            else
                settemp(true)
        }catch(e){
            setloading(false)
            setalert('Some error occured')
        }
    }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
   });

    return (
        <>
        <NavBar></NavBar>
        <div className="data-wrapper">
            <div>
                <div className="table">
                    <div>
                        <h1>Add Post</h1>
                    </div>
                    {success===true?<div className="inform success">{alert}</div>:null}
                    {success===false?<div className="inform fail">{alert}</div>:null}
                    {loading && <Loader></Loader>}
                    <Form>
                        <Form.Group controlId='heading' >
                            <Form.Control 
                                type='text' 
                                placeholder="Enter Heading" 
                                value={heading} 
                                onChange={(e)=>setheading(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='about' >
                            <Form.Control 
                                type='text' 
                                placeholder="Enter About" 
                                value={about} 
                                onChange={(e)=>setabout(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='img'>
                            <Form.Control 
                                type='file' 
                                placeholder="Enter Img" 
                                onChange={(e)=>{ 
                                    toBase64(e.target.files[0]).then(res=>{
                                        console.log(res)
                                      setimg(res)
                                    })}
                                }
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button type="submit" variant="primary" disabled={loading} onClick={submitHandler}>Submit</Button>
                </div>
            </div>    
        </div>
    </>
    )
}

export default Data
