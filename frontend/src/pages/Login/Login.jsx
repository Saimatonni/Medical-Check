import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import google from '../../assets/google.png'
import { Link } from 'react-router-dom'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';


const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [showPassword, setShowPassword] = useState(false)

  const [emailerr, setEmailerr] = useState()
  const [passworderr, setPassworderr] = useState()
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('')
  }

  const navigate=useNavigate()
  const handleSignin = async () => {
    if (!email) {
      setEmailerr('Please Enter Your Email First');
    }
    if (!password) {
      setPassworderr('Please Enter Your Password First');
    }
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          Cookies.set("loginResult", JSON.stringify(data));
          if (data.join_as === 'patient') {
            navigate('/home');
          } else if (data.join_as === 'doctor') {
            navigate('/reports');
          }
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error('Error signing in:', error);
        alert('An error occurred while signing in. Please try again.');
      }
    }
  };
  return (
    <div className='xl:h-screen' style={{
      background: 'url(./src/assets/logbg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition:'center',
      backgroundSize:'cover'
    }}>
      {/* <Navbar/> */}
      <div className='container m-auto flex py-[80px] sm:pl-[100px] xl:pl-[150px]'>
        <div className='bg-[#d9d9d9] p-10 xl:p-[50px] rounded-lg'>
          <div>
            <h1 className='font-sans font-bold text-[34px] text-[#11175D]'>Login to your account!</h1>
            <div className='flex border border-[#808080] justify-center px-[42px] py-[22px] rounded mt-[30px]'>
              <img src={google} alt=''></img>
              <p className='font-sans font-bold text-[14px] text-[#03014C] items-center ml-[10px]  '>Login with Google</p>
            </div>

            <div className='relative mt-[40px]'>
              <input onChange={handleEmail} className='bg-[#ffffff00] border-b border-[#706d6d] outline-none pl-[25px] pr-[70px] xl:pr-[95px] py-[26px] placeholder-[#515158]' type='email' placeholder='Enter Your Email.'></input>
              <p className='absolute top-[-10%] left-0 font-nun font-semibold text-[13px] tracking-[1px]'>Email Address</p>
              <p className='font-sans text-red-600 font-semibold text-sm'>{emailerr}</p>

            </div>
            <div className='relative mt-[40px]'>
              <input onChange={handlePassword} className='bg-[#ffffff00] border-b border-[#6d6a6a] outline-none pl-[25px] pr-[70px] xl:pr-[95px] py-[26px] placeholder-[#54545a]' type={showPassword? 'text': 'password'} placeholder='Enter Your Password.'></input>
              <p className='absolute top-[-10%] left-0 font-nun font-semibold text-[13px] tracking-[1px]'>Password</p>
              {
                showPassword ?
                  <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[32px] right-[5%] xl:right-[26%]' />
                  :
                  <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[32px] right-[5%] xl:right-[26%]' />

              }
              <p className='font-sans text-red-600 font-semibold text-sm sm:w-[350px]'>{passworderr}</p>

            </div>
            <div onClick={handleSignin} className='mt-[40px] mb-[40px] cursor-pointer bg-blue rounded-lg text-center'>
              <button className='font-nun font-semibold text-[20px] text-white bg-primary xl:px-[115px] py-[20px] rounded' href=''>Login to Continue</button>
            </div>
            <div className='text-center'>
              <p className='font-sans text-[13px] text-[#03014C]'>Don’t have an account ?<span className='text-[#EA6C00] font-bold ml-[10px]'><Link to='/registration'>Sign Up</Link> </span></p>
              <p className='font-sans text-[16px] text-blue font-bold'>Forgot password?</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
export default Login