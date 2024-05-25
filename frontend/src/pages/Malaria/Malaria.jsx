import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

const Malaria = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionData, setPredictionData] = useState(null); 
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const userId = Cookies.get("loginResult") ? JSON.parse(Cookies.get("loginResult")).userid : '';
      const response = await axios.post(
        `http://localhost:5000/malaria-predict?userid=${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const predictionObject = {
        prediction: response.data.prediction,
        probability: response.data.probability,
      };
      Cookies.set("predictionData", JSON.stringify(predictionObject));

      navigate('/malariares');
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  return (
    <div
      className="h-screen"
      style={{
        background: "url(./src/assets/malariabg.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <div className="container m-auto ">
        <div className="flex justify-center py-5">
          <div className="bg-[#a1b4d1d5] pt-[20px] px-4 xl:px-[40px] pb-[20px] rounded-lg">
            <h1 className="font-sans font-bold text-3xl xl:text-[38px] text-blue text-center">
              Upload your report{" "}
            </h1>
            <div className="bg-[#dfd4d4f6] mt-[20px] p-5 xl:p-[40px]  rounded-lg ">
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleSubmit} className='bg-blue text-white rounded-lg p-3 font-sans font-semibold text-[20px]'>Predict</button>
              {/* {prediction && (
                <div>
                  <h2>Prediction: {prediction}</h2>
                  <h2>Probability: {probability}</h2>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Malaria;
