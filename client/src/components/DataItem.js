import React, { useState } from 'react'
import axios from 'axios'
const DataItem = ({dataitem,temp2,settemp2}) => {
    const [alert, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)
    const data=localStorage.getItem('user')
    let currentUser
    if(data)
    {
      currentUser=JSON.parse(data)
    }
    const deleteItem=async()=>{
        const config = {
            headers: {
            'Content-type':'application/json',
            Authorization:`Bearer ${currentUser.token}` 
            },
        }
        try{    
            setloading(true)
            const {data}=await axios.delete(`https://listiee.herokuapp.com/api/data/${dataitem._id}`,config)
            // const {data}=await axios.delete(`https://pure-river-17146.herokuapp.com/api/data/${dataitem._id}`,config)
            setsuccess(data.success)
            setalert(data.message)
            setloading(false)
            if(temp2)
            settemp2(false)
            else
            settemp2(true)
        }catch(e){
            setloading(false)
            setalert('Some error occured')
        }
    }
    const {about,heading,img,address}=dataitem
    const imageValue = "https://listiee.herokuapp.com/" + img;
    return (
        <div className="dataitem-wrapper">
            <div className="details">
                <div className="detail">
                    <div className="answer">{heading}</div>
                </div>
                <div className="detail-image">
                    <div className="answer">
                        <img alt={imageValue} src={imageValue}></img>
                    </div>
                </div>
                <div className="detail">
                    <div className="answer">{about}</div>
                </div>
                <div className="detail">
                    <div className="answer">Address : {address}</div>
                </div>
            </div>
            <div className="deleteButton">
                {success===false?<div className="inform fail">{alert}</div>:null}
                <button onClick={deleteItem} disabled={loading}>Delete</button>
            </div>
        </div>
    )
}

export default DataItem
