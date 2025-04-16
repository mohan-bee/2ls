import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { ArrowLeft, BringToFront } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Python = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Please write some code!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: "python",
        version: "3.10.0",
        files: [{ name: "main.py", content: code }]
      });

      setOutput(response.data.output || response.data.run?.stdout || response.data.run?.stderr);
    } catch (error) {
      toast.error("Something went wrong!");
      setOutput(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-8 gap-8 font-sans">
      <title>Python Code Editor</title>

      {/* Editor Side */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-sm cursor-pointer text-gray-600 hover:text-black transition mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">Python Code Runner</h1>
        <p className="text-sm text-gray-500 mb-4">Write and run Python code using Monaco editor</p>

        <div className="h-[400px] border border-gray-300 rounded-lg overflow-hidden mb-4 p-2 bg-black">
          <Editor
            height="100%"
            language="python"
            value={code}
            theme="vs-dark"
            onChange={setCode}
          />
        </div>

        {!loading ? (
          <button
            onClick={handleRun}
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200"
          >
            Run Code
          </button>
        ) : (
          <button
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200 flex justify-center"
            disabled
          >
            <BringToFront className="animate-spin" />
          </button>
        )}
      </div>

      {/* Output Side */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-2xl p-6 border border-gray-200 overflow-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Output</h2>
        {output ? (
          <pre className="bg-gray-100 rounded-md p-4 text-sm text-gray-800 overflow-auto font-mono">
            {output}
          </pre>
        ) : (
          <p className="text-gray-500 italic">Output will appear here after running the code...</p>
        )}
      </div>
    </div>
  );
};

export default Python;
