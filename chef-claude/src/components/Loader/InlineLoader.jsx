import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function InlineLoader() {
  return (
    <Oval 
    visible={true}
    height="15"
    width="15"
    color="#ffffff"
    secondaryColor="#fff5e1"
    ariaLabel="oval-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
  )
}
