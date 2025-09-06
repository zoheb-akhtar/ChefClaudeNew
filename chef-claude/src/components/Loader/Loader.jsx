import React from 'react'
import { Oval } from 'react-loader-spinner'
import "./loader.css"

export default function Loader() {
  return (
    <div className="loader-container">
        <Oval 
        visible={true}
        height="50"
        width="50"
        color="#D17557"
        secondaryColor="#fff5e1"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        
        />
    </div>
  )
}
