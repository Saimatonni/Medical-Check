import React from 'react'
import Navbar from '../Navbar/Navbar'
import diabtes from '../../assets/diabetes.png'
import heart from '../../assets/heart.png'
import malaria from '../../assets/malaria.png'
import { Link } from 'react-router-dom'
import { RiEyeFill, RiEyeCloseFill, RiCloseFill } from 'react-icons/ri'

const Home = () => {
    return (
        <div className='xl:h-screen' style={{
            background: 'url(./src/assets/homebg.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',

        }}>
            <Navbar />
            <div className='container m-auto flex justify-center py-[80px] xl:py-[120px]'>
                <div className='bg-[#1529687e] p-[40px] rounded-lg'>
                    <div className='bg-[#ffffffb0] xl:ml-[300px] p-2 md:p-4 rounded-lg xl:w-[600px]'>
                        <h1 className='font-sans font-bold text-2xl md:text-[30px] text-blue text-center '>Artificial Intelligence Solution </h1>
                    </div>
                    <div className='lg:flex justify-between mt-7 gap-3'>
                        <div className='pb-10 xl:pb-0'>
                            <img className='w-full h-[250px]' src={diabtes} alt="diabetes" />
                            <div className='bg-[#fff] pt-2 pb-4 pl-5'>
                                <h1 className='font-sans font-semibold text-lg md:text-[20px]'>Diabetes Prediction</h1>
                              <Link to='/diabetes'><button className='bg-blue text-white rounded-lg p-2 font-sans font-semibold text-[16px]'>Take Test!</button></Link>
                            </div>
                        </div>
                        <div className='pb-10 xl:pb-0'>
                            <img className='w-full h-[250px]' src={heart} alt="" />
                            <div className='bg-[#fff] pt-2 pb-4 pl-5'>
                                <h1 className='font-sans font-semibold text-lg md:text-[20px]'>Heart Disease Prediction</h1>
                               <Link to='/hdis'> <button className='bg-blue text-white rounded-lg p-2 font-sans font-semibold text-[16px]'>Take Test!</button></Link>
                            </div>
                        </div>
                        <div className='pb-10 xl:pb-0'>
                            <img className='w-full h-[250px]' src={malaria} alt="" />
                            <div className='bg-[#fff] pt-2 pb-4 pl-5'>
                                <h1 className='font-sans font-semibold text-lg md:text-[20px]'>Malaria Disease Prediction</h1>
                               <Link to='/malaria'> <button className='bg-blue text-white rounded-lg p-2 font-sans font-semibold text-[16px]'>Take Test!</button></Link>
                            </div>
                        
                    </div>
                    </div>

                       

                </div>
            </div>

        </div>
    )
}

export default Home