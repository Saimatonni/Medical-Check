import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Cookies from 'js-cookie';

const DiabetesResult = () => {
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    const storedResult = Cookies.get('predictionResult2');
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setPredictionResult(parsedResult);
    }
  }, []);

  return (
    <div className='w-full xl:h-screen' style={{
      background: 'url(./src/assets/diabetesresbg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <Navbar />
      <div className='container m-auto md:pt-[60px]'>
        <div className='bg-[#d9d9d9a2] p-5 md:p-[70px] xl:w-[650px] mx-auto xl:ml-[150px] rounded-lg'>
          <h1 className='font-sans font-bold text-[40px] leading-[45px] pb-3 text-blue text-center'>Diabetes Prediction </h1>
          <div className='flex justify-between mt-3 border border-black bg-[#547cb1d8] py-2 px-6'>
            <h1 className='font-sans font-bold text-black text-[24px]'>Fields</h1>
            <h1 className='font-sans font-bold text-black text-[24px]'>Values</h1>
          </div>
          {/* Update the fields with actual data */}
          {predictionResult && (
            <>
              {Object.entries(predictionResult.request_values).map(([key, value]) => (
                <div key={key} className='flex justify-between border border-black pt-2 pb-2 pl-6 pr-6'>
                  <h1 className='font-sans font-semibold text-black text-[20px]'>{key}</h1>
                  <h1 className='font-sans font-semibold text-black text-[20px]'>{value}</h1>
                </div>
              ))}
              <div className='flex justify-between border border-black bg-green-700 pt-2 pb-2 pl-6 pr-6'>
                <h1 className='font-sans font-bold text-black text-[24px]'>Observation</h1>
                <h1 className='font-sans font-bold text-black text-[24px]'>{predictionResult.prediction_text}</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiabetesResult;
