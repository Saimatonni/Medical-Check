import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [joinAs, setJoinAs] = useState('') // State for the selected join as option

    const [showPassword, setShowPassword] = useState(false)

    const [emailerr, setEmailerr] = useState('')
    const [fullnameerr, setFullnameerr] = useState('')
    const [passworderr, setPassworderr] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailerr('')
    }
    const handleFullname = (e) => {
        setFullname(e.target.value);
        setFullnameerr('')
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPassworderr('')
    }

    const navigate = useNavigate()

    const handleSignup = async () => {
        if (!email) {
            setEmailerr('Please Enter Your Email First');
        }
        if (!fullname) {
            setFullnameerr('Please Enter Your Full Name First');
        }
        if (!password) {
            setPassworderr('Please Enter Your Password First');
        }
        if (!joinAs) {
            alert('Please select whether you want to join as a doctor or patient');
        }
        if (email && fullname && password && joinAs) {
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        fullname,
                        password,
                        join_as: joinAs,
                    }),
                });
                if (response.ok) {
                    navigate('/login'); 
                } else {
                    const data = await response.json();
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error registering user:', error);
                alert('An error occurred while registering. Please try again.'); 
            }
        }
    };


    return (
        <div className='xl:h-screen' style={{
            background: 'url(./src/assets/regbg.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}>
            <div className='container m-auto flex justify-center md:justify-end md:pr-[150px] py-10 xl:py-[40px]'>
                <div className='bg-[#d9d9d9] py-10 px-4 md:px-[70px] rounded-lg'>
                    <div className='flex'>
                        <div className='flex justify-end'>
                            <div>
                                <h1 className='font-nun font-bold text-[34px] text-[#11175D]'>Register</h1>
                                <div className='relative mt-4'>
                                    <input onChange={handleEmail} className='bg-transparent border border-[#585050] rounded-lg outline-none px-[52px] py-[26px] placeholder-[#423939]' type='email' placeholder='Enter Your Email'></input>
                                    <p className='p-1 absolute top-0 left-[34px] px-[18px] bg-[#d9d9d9] font-nun font-semibold text-[13px] tracking-[1px]'>Email Address</p>
                                    <p className='font-sans text-red-600 font-semibold text-sm'>{emailerr}</p>
                                </div>
                                <div className='relative mt-6'>
                                    <input onChange={handleFullname} className='bg-transparent border border-[#5c5252] rounded-lg outline-none px-[52px] py-[26px] placeholder-[#423939]' type='text' placeholder='Enter Your Full Name' ></input>
                                    <p className='absolute top-0 left-[34px] px-[18px] bg-[#d9d9d9] font-nun font-semibold text-[13px] tracking-[1px] p-1'>Full Name</p>
                                    <p className='font-sans text-red-600 font-semibold text-sm'>{fullnameerr}</p>
                                </div>
                                <div className='relative mt-6'>
                                    <input onChange={handlePassword} className='bg-transparent border border-[#5f5858] rounded-lg outline-none px-[52px] py-[26px] placeholder-[#423939]' type={showPassword ? 'text' : 'password'} placeholder='Enter Your Password'></input>
                                    <p className='absolute top-0 left-[34px] px-[18px] bg-[#d9d9d9] font-nun font-semibold text-[13px] tracking-[1px] p-1'>Password</p>
                                    {
                                        showPassword ?
                                            <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[32px] right-[25px]' />
                                            :
                                            <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[32px] right-[25px]' />
                                    }
                                    <p className='font-sans text-red-600 font-semibold text-sm sm:w-[300px]'>{passworderr}</p>
                                </div>
                                <div className='relative mt-6'>
                                    <select
                                        className='bg-transparent border border-[#5c5252] rounded-lg outline-none px-[52px] py-[26px] placeholder-[#423939]'
                                        value={joinAs}
                                        onChange={(e) => setJoinAs(e.target.value)}
                                    >
                                        <option value=''>Join As</option>
                                        <option value='doctor'>Doctor</option>
                                        <option value='patient'>Patient</option>
                                    </select>
                                </div>
                                <div onClick={handleSignup} className='mt-6 mb-6 cursor-pointer'>
                                    <button className='bg-blue font-nun font-semibold text-[20px] text-white bg-primary px-[115px] py-[20px] rounded'>Sign
                                    up
                                </button>
                                </div>
                                <p className='font-sans text-[13px] text-[#03014C] ml-4'>Already have an account ?<span className='text-[#EA6C00] font-bold ml-1'><Link to='/login'>Sign In</Link></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration


