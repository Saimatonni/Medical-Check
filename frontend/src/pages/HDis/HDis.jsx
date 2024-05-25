import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HDis = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    thal: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userId = Cookies.get("loginResult") ? JSON.parse(Cookies.get("loginResult")).userid : '';
      const response = await fetch(`http://localhost:5000/predict_heart?userid=${userId}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to make the prediction request');
      }
  
      const predictionResult = await response.json();
      console.log('Prediction Result:', predictionResult);
      Cookies.set("predictionResult", JSON.stringify(predictionResult));
      navigate("/hdisres");
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <div
      className="xl:h-screen"
    >
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-200"  style={{
        background: "url(./src/assets/hdisbg.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h1 className="font-sans font-bold text-[30px] leading-[45px] pb-4 text-blue text-center">
          Heart Disease Prediction{" "}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* First Row */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="age"
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="sex"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Sex
              </label>
              <select
                id="sex"
                name="sex"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Sex --</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>

          {/* Second Row */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cp"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Chest Pain Type
              </label>
              <select
                id="cp"
                name="cp"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.cp}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Chest Pain Type --</option>
                <option value="1">Typical Angina</option>
                <option value="2">Atypical Angina</option>
                <option value="3">Non-anginal Pain</option>
                <option value="4">Asymptomatic</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="trestbps"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Resting Blood Pressure (mm Hg)
              </label>
              <input
                id="trestbps"
                type="number"
                name="trestbps"
                placeholder="Enter Resting Blood Pressure"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.trestbps}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="chol"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Serum Cholestoral (mg/dl)
              </label>
              <input
                id="chol"
                type="number"
                name="chol"
                placeholder="Enter Serum Cholestoral"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.chol}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="restecg"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Resting ECG Results
              </label>
              <select
                id="restecg"
                name="restecg"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.restecg}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Resting ECG Results --</option>
                <option value="0">Normal</option>
                <option value="1">Having ST-T wave abnormality</option>
                <option value="2">
                  Probable or definite left ventricular hypertrophy
                </option>
              </select>
            </div>
          </div>

          {/* Fourth Row */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="thalach"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Maximum Heart Rate
              </label>
              <input
                id="thalach"
                type="number"
                name="thalach"
                placeholder="Enter Maximum Heart Rate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.thalach}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="exang"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ST Depression Induced
              </label>
              <input
                id="exang"
                type="number"
                name="exang"
                step="any"
                placeholder="Enter ST Depression Induced"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.exang}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fifth Row */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="oldpeak"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Exercise Induced Angina
              </label>
              <select
                id="oldpeak"
                name="oldpeak"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.oldpeak}
                onChange={handleChange}
                required
              >
                <option value="">
                  -- Select Exercise Induced Angina --
                </option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="slope"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Slope of the Peak Exercise ST Segment
                </label>
              <select
                id="slope"
                name="slope"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.slope}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Slope --</option>
                <option value="1">Upsloping</option>
                <option value="2">Flat</option>
                <option value="3">Downsloping</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="thal"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Thalassemia
              </label>
              <select
                id="thal"
                name="thal"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.thal}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Thalassemia --</option>
                <option value="3">Normal</option>
                <option value="6">Fixed defect</option>
                <option value="7">Reversable defect</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#00008B" }}
            >
              Predict
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default HDis;
