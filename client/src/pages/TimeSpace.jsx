import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { ArrowLeft, BringToFront, Circle, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TimeSpace = () => {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleAnalyze = async() => {
    setLoading(true)
    try {
        const res = await axiosInstance.post('/time-space/response', {code})
        setAnalysis(JSON.parse(res.data.response))
    } catch (error) {
        if(error.status == 400 || error.message.includes("error")){
            toast.error("No Code Provided")
        }
        console.log(error.message)
    }
    finally{
        setLoading(false)
    }

  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-8 gap-8 font-sans">
      {/* Input Side */}
      <title>Time & Space</title>
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-2xl p-6 border border-gray-200">
      <button
          onClick={() => navigate('/')}
          className="flex items-center text-sm cursor-pointer text-gray-600 hover:text-black transition mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1 " /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Code Complexity Analyzer</h1>
        <p className="text-sm text-gray-500 mb-4">Paste your code snippet to analyze time and space complexity</p>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste or write your code here..."
          className="w-full h-60 resize-none rounded-md border border-gray-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {!loading && <button
          onClick={handleAnalyze}
          className="mt-4 w-full cursor-pointer bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200"
        >
          Analyze Complexity
        </button>}
        {loading && <button
          onClick={handleAnalyze}
          className="mt-4 w-full cursor-pointer text-center bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200"
        >
          <BringToFront className='w-full  animate-spin'/>
        </button>}
      </div>

      {/* Output Side */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-2xl p-6 border border-gray-200 overflow-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Complexity Result</h2>

        {analysis ? (
          <>
            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-600 mb-2">Time Complexity</h3>
              <pre className="bg-gray-100 rounded-md p-4 text-sm text-gray-800 overflow-auto font-mono">
                {analysis[0]}
              </pre>
            </div>

            <div>
              <h3 className="text-md font-semibold text-gray-600 mb-2">Space Complexity</h3>
              <pre className="bg-gray-100 rounded-md p-4 text-sm text-gray-800 overflow-auto font-mono">
                {analysis[1]}
              </pre>
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic">Time and space complexity will appear here...</p>
        )}
      </div>
    </div>
  );
};

export default TimeSpace;
