import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear, faSmile } from '@fortawesome/free-solid-svg-icons';

const HDisRes = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const getPredictionResultFromCookies = () => {
    const predictionResultCookie = Cookies.get('predictionResult');
    if (predictionResultCookie) {
      const parsedResult = JSON.parse(predictionResultCookie);
      setPredictionResult(parsedResult);
    }
  };
  useEffect(() => {
    getPredictionResultFromCookies();
  }, []);

  const mapToOptions = (value, key) => {
    switch (key) {
      case 'cp':
        return ['Typical Angina', 'Atypical Angina', 'Non-anginal Pain', 'Asymptomatic'][value];
      case 'sex':
        return ['Female', 'Male'][value];
      case 'restecg':
        return ['Normal', 'Having ST-T wave abnormality', 'Probable or definite left ventricular hypertrophy'][value];
      case 'oldpeak':
        return value ? 'Yes' : 'No';
      case 'slope':
        return ['Upsloping', 'Flat', 'Downsloping'][value];
      case 'thal':
        return ['Normal', 'Fixed defect', 'Reversible defect'][value];
      default:
        return value;
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: 'url(./src/assets/hdisresbg.jpg)' }}>
      <Navbar />
      <div className="container mx-auto flex justify-center py-20 xl:py-32">
        <div className="bg-gray-200 rounded-lg px-6 py-10 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {predictionResult ? (
            <div className="center">
              {predictionResult.prediction === 1 ? (
                <>
                  <h1 className="font-bold text-2xl md:text-2xl lg:text-2xl text-red-600 mb-6 text-center">
                    Prediction: <span className="danger">Oops! You have Heart Disease.</span>
                  </h1>
                  <FontAwesomeIcon icon={faSadTear} size="4x" className="text-red-600" /> 
                </>
              ) : (
                <>
                  <h1 className="font-bold text-2xl md:text-2xl lg:text-2xl text-green-600 mb-6 text-center">
                    Prediction: <span className="safe">Great! You DON'T have Heart Disease.</span>
                  </h1>
                  <FontAwesomeIcon icon={faSmile} size="4x" className="text-yellow-400" /> {/* Display the happy emoji icon */}
                </>
              )}
              <div className="mt-8">
                <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-4">Prediction Values</h2>
                <table className="w-full">
                  <tbody>
                    {Object.entries(predictionResult.request_values).map(([key, value]) => (
                      <tr key={key}>
                        <td className="font-semibold text-gray-800 py-2">{key}</td>
                        <td className="py-2">{mapToOptions(value, key)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HDisRes;




