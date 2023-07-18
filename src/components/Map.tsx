
'use client'
import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';




export default function Map () {
    const containerStyle = {
        width: "100%",
        height: "100%"
      };
      
      const center = {
        lat: -33.869650,
        lng: 151.205890
      };
      
  return (
    <div className=' flex flex-col w-screen min-[1300px]:max-w-[1199px] h-[501px] rounded-[25px] overflow-hidden my-[100px] max-w-[90%]'>
    <LoadScript
      googleMapsApiKey="AIzaSyCq-bhMyoiseMtBKlc4iU3I_fKhQSTnq74"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        options={{mapId: '4833fead44d3cace'}}
        
      >
        <Marker position={ {lat: -33.869650, lng: 151.205890}} />
        <></>
      </GoogleMap>
    </LoadScript>
    <p className='ml-20'>Maqro Address: Level 7/89 York St, Sydney NSW 2000</p>
    </div>
  )
}
