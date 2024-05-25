import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Cookies from 'js-cookie';

const MalariaResult = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [message, setMessage] = useState('');
  const [probabilityPercentage, setProbabilityPercentage] = useState('');

  useEffect(() => {
    // Retrieve prediction data from cookies
    const predictionDataString = Cookies.get('predictionData');
    if (predictionDataString) {
      const predictionDataObject = JSON.parse(predictionDataString);
      setPredictionData(predictionDataObject);
      setMessage(predictionDataObject.prediction === 'Malaria Detected' ? 'You have Malaria. Be careful!' : 'You don\'t have Malaria. Stay healthy!');
      const probability = parseFloat(predictionDataObject.probability) * 100;
      setProbabilityPercentage(`${probability.toFixed(2)}%`);
    }
  }, []);

  return (
    <div className='xl:h-screen' style={{
        background: 'url(./src/assets/malariaresbg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}>
      <Navbar />
      <div className='container m-auto flex justify-center px-3 xl:px-0 py-[80px] xl:py-[240px]'>
        {predictionData ? (
          <div className='bg-[#d9d9d9e3] p-5 xl:p-[80px] rounded-lg'>
            <h1 className='font-sans font-bold text-[40px] text-blue text-center'>{message}</h1>
            <div className='text-center mt-5'>
              {/* <h2>Prediction: {predictionData.prediction}</h2> */}
              <h2 className='text-2xl text-blue font-semibold'>Probability: <span style={{ fontSize: '1.5em', color: 'green' }}>{probabilityPercentage}</span></h2>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <h1 className='font-sans font-bold text-[40px] text-blue'>No prediction data available.</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MalariaResult;

