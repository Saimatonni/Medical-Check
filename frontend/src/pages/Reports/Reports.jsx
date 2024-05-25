import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

const Reports = () => {
  const [diabetesReports, setDiabetesReports] = useState([]);
  const [heartReports, setHeartReports] = useState([]);
  const [malariaReports, setMalariaReports] = useState([]);

  useEffect(() => {
    // Fetch diabetes reports
    fetch('http://localhost:5000/diabetes_reports')
      .then(response => response.json())
      .then(data => setDiabetesReports(data))
      .catch(error => console.error('Error fetching diabetes reports:', error));

    // Fetch heart reports
    fetch('http://localhost:5000/heart_reports')
      .then(response => response.json())
      .then(data => setHeartReports(data))
      .catch(error => console.error('Error fetching heart reports:', error));

    // Fetch malaria reports
    fetch('http://localhost:5000/malaria_reports')
      .then(response => response.json())
      .then(data => setMalariaReports(data))
      .catch(error => console.error('Error fetching malaria reports:', error));
  }, []);

  const renderValues = (values) => {
    return (
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Attribute</th>
            <th className="border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(values).map(([key, value]) => (
            <tr key={key}>
              <td className="border px-4 py-2">{key}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const formatPercentage = (probability) => {
    return `${(probability * 100).toFixed(2)}%`;
  };

  return (
    <div className="w-full xl:h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Diabetes Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {diabetesReports.map((report, index) => (
            <div key={index} className="border p-6 rounded-md bg-gray-100">
              <h2 className="text-lg font-semibold mb-2">{report.fullname}</h2>
              <p className={`mb-2 ${report.prediction === 1 ? 'text-red-500 font-bold' : 'text-green-500 font-semibold'}`}>
                Prediction: {report.prediction_text}
              </p>
              {Array.isArray(report.request_values) ?
                report.request_values.map((values, index) => (
                  <div key={index}>
                    {renderValues(values)}
                  </div>
                )) :
                renderValues(report.request_values)
              }
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold my-4">Heart Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {heartReports.map((report, index) => (
            <div key={index} className="border p-6 rounded-md bg-gray-100">
              <h2 className="text-lg font-semibold mb-2">{report.fullname}</h2>
              <p className={`mb-2 ${report.prediction === 1 ? 'text-red-500 font-bold' : 'text-green-500 font-semibold'}`}>
                Prediction: {report.prediction_text}
              </p>
              {renderValues(report.request_values)}
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold my-4">Malaria Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {malariaReports.map((report, index) => (
            <div key={index} className="border p-6 rounded-md bg-gray-100">
              <h2 className="text-lg font-semibold mb-2">{report.fullname}</h2>
              <p className={`mb-2 ${report.prediction === 'Malaria Detected' ? 'text-red-500 font-bold' : 'text-green-500 font-semibold'}`}>
                 {report.prediction}
              </p>
              <p className="mb-2">Probability: {formatPercentage(report.probability)}</p>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;




