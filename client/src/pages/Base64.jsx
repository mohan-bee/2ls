import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'
import { ArrowLeft, Clipboard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Base64 = () => {
    const [queryEncode, setQueryEncode] = useState('')
    const [queryDecode, setQueryDecode] = useState('')
    const [result, setResult] = useState(' ')
    const navigate = useNavigate()

    const handleChangeEncode = async (e) => {
        setQueryEncode(e.target.value)
        setQueryDecode('')
    }
    const handleChangeDecode = async (e) => {
        setQueryDecode(e.target.value)
        setQueryEncode('')
    }
    const handleSubmit = async (type, query) => {
        let res = await  axiosInstance.post(`/base64/${type}`, {query})
        setResult(res.data.result)
    }
    const handleCopy = () => {
        if (result) {
          navigator.clipboard.writeText(result)
            .then(() => {
              toast.success("Text Copied to Clipboard")
            })
            .catch(err => {
              console.error("Failed to copy!", err)
            })
        }
      }
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-8 gap-8 font-sans">
      <title>Base64 Encoder Decoder</title>
      {/* Input Side */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-2xl p-6 border border-gray-200">
      <button
          onClick={() => navigate('/')}
          className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-black transition mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1 cursor-pointer" /> Back
        </button>
        <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Base64 Encode</h1>
        <p className="text-sm text-gray-500 mb-4">Write the text to be encoded</p>
        <textarea
        value={queryEncode}
          onChange={handleChangeEncode}
          placeholder="Text Here ..."
          className="w-full h-30 resize-none rounded-md border border-gray-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
            onClick={() => handleSubmit('encode',queryEncode )}
          className="mt-4 w-full cursor-pointer bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200"
        >
          Encode Text
        </button>
        </div>
        <div className='mt-40'>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Base64 Decode</h1>
        <p className="text-sm text-gray-500 mb-4">Write the text to be Decoded</p>
        <textarea
        value={queryDecode}
        onChange={handleChangeDecode}
          placeholder="Text to be decoded ..."
          className="w-full h-30 resize-none rounded-md border border-gray-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={() => handleSubmit('decode',queryDecode )}
          className="mt-4 w-full cursor-pointer bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200"
        >
          Decode Text
        </button>
        </div>
      </div>
      

      {/* Output Side */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-2xl p-6 border border-gray-200 overflow-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Result</h2>

        {(result ) ? (
          <>
            <div className="mb-6">
              <div className='flex justify-between px-3 my-2'>
              <h3 className="text-md font-semibold text-gray-600 mb-2"></h3>
              <Clipboard size={20} className='text-gray-700 cursor-pointer' onClick={handleCopy}/>
              </div>
              <p className="bg-gray-100 rounded-md p-4 text-sm text-gray-800 overflow-auto font-mono">
                {result}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic">Decoded data will appear here...</p>
        )}
      </div>
    </div>
  )
}

export default Base64