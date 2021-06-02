import React from 'react'
const DataItem = ({dataitem,temp2,settemp2}) => {
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
        </div>
    )
}

export default DataItem
