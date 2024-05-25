import React from 'react'
import Navbar from '../Navbar/Navbar'
import { BiSolidPhone } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookSquare } from "react-icons/fa";
const ContactUs = () => {
  return (
    <div className='w-full h-screen' style={{
      background: 'url(./src/assets/contactusbg.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',

    }}>
      <Navbar />
      <div className='container m-auto flex '>
        <div className='bg-[#ffffff96] p-5 md:p-[40px] mt-[40px] md:mt-[200px] mx-auto md:ml-[200px] rounded-lg'>
          <div className='flex mt-[10px]'>
          <BiSolidPhone className='text-xl md:text-[30px] text-blue'/>
          <h1 className='font-semibold md:text-[20px] ml-[10px]'>01798989034</h1>
          </div>
          <div className='flex mt-[15px]'>
          <ImWhatsapp className='text-xl md:text-[30px] text-blue'/>
          <h1 className='font-semibold md:text-[20px] ml-[10px]'>01798989034</h1>
          </div>
          <div className='flex mt-[15px]'>
          <FaFacebookSquare className='text-xl md:text-[30px] text-blue'/>
          <h1 className='font-semibold md:text-[20px] ml-[10px]'>/ai disease recogniton.fgbhj</h1>
          </div>
          <div className='flex mt-[15px]'>
          <HiOutlineMail className='text-xl md:text-[30px] text-blue'/>
          <h1 className='font-semibold md:text-[20px] ml-[10px]'>aidisraserecognition@gmail.com</h1>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactUs