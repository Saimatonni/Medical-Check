import React from 'react'
import Navbar from '../Navbar/Navbar'

const Welcome = () => {
  return (
    <div className='xl:h-screen' style={{
      background: 'url(./src/assets/welcome.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
     
    }}>
      <Navbar/>
      <div className='container m-auto flex justify-center px-3 py-[80px] xl:py-[240px]'>
       <div className='bg-[#d9d9d9a2] p-8 xl:p-[80px] text-center rounded-lg'>
        <h1 className='font-sans font-bold text-2xl xl:text-[60px] text-blue pb-3 xl:pb-[60px]'>Welcome to </h1>
        <h2 className='font-sans font-bold text-4xl xl:text-[60px] text-blue'>AI DISEASE RECOGNITION</h2>
       </div>
      </div>
      
    </div>
  )
}

export default Welcome