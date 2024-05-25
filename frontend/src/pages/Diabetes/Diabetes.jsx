import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Diabetes = () => {
    const [formData, setFormData] = useState({
        pregnancies: '',
        glucose: '',
        bloodpressure: '',
        skinthickness: '',
        insulin: '',
        bmi: '',
        dpf: '',
        age: ''
    });

    const [errors, setErrors] = useState({
        pregnancies: '',
        glucose: '',
        bloodpressure: '',
        skinthickness: '',
        insulin: '',
        bmi: '',
        dpf: '',
        age: ''
    });

    // console.log("forndata",formData)

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async () => {
        try {
            const userId = Cookies.get("loginResult") ? JSON.parse(Cookies.get("loginResult")).userid : '';
            const response = await fetch(`http://localhost:5000/predict_diabetes?userid=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to make the prediction request');
            }

            const predictionResult = await response.json();
            console.log('Prediction Result:', predictionResult);
            Cookies.set('predictionResult2', JSON.stringify(predictionResult));
            navigate('/diabetesRes');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
      <div className='w-full md:h-screen' style={{
          background: 'url(./src/assets/diabetesbg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
      }}>
          <Navbar />
          <div className='container m-auto md:pt-[30px]'>
              <div className='flex justify-center'>
                  <div className='bg-[#d9d9d9a2] py-5 px-[100px] rounded-lg w-[600px] mb-3 xl:mb-0'>
                      <h1 className='font-sans font-bold text-[40px] leading-[45px] text-blue text-center pb-4'>Diabetes Prediction </h1>
                      <div className='text-center'>
                          {Object.keys(formData).map((field) => (
                              <div key={field}>
                                  <input
                                      type="text"
                                      className='bg-[#131a5ab7] p-2 font-sans text-base md:text-[20px] text-white mt-[10px] rounded  placeholder-[#ffffffb4]'
                                      placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                      value={formData[field]}
                                      onChange={handleChange}
                                      name={field}
                                  />
                                  <p className='font-sans text-red-600 font-bold text-base'>{errors[field]}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
              <div onClick={handleSubmit} className='flex justify-end mr-[10%] md:mr-[200px]'>
                  <button className='bg-blue text-white rounded-lg p-3 font-sans font-semibold text-[20px] mb-3'>Submit</button>
              </div>
          </div>
      </div>
  )
}

export default Diabetes

