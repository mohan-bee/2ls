import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BringToFront } from 'lucide-react'

const JWT = () => {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3NDNjODM0ZjBkNmQ0MWY2ZTIwNTMiLCJpYXQiOjE3NDQyNTc5OTIsImV4cCI6MTc0NDg2Mjc5Mn0.nLka2_DRlQyBlLFbGIm1NUK3Q_ter7zr8Rz-xSC_ydQ')
  const [decode, setDecode] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleTokenChange = async (e) => {
    setToken(e.target.value)
  }

  const handleDecode = async (e) => {
    try {
      setLoading(true)
      e.preventDefault()
      let res = await axiosInstance.post('/jwt/decode', { token, secret: "" })
      setDecode(res.data)
      if (!res.data) {
        setError("Error")
      }
    } catch (error) {
      setError(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-8 gap-8 font-sans">
      {/* Input Side */}
      <title>JWT Decoder</title>
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-sm cursor-pointer text-gray-600 hover:text-black transition mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1 cursor-pointer" /> Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">JWT Decoder</h1>
        <p className="text-sm text-gray-500 mb-4">Paste your JWT token to decode it</p>
        <textarea
          value={token}
          onChange={handleTokenChange}
          placeholder="Paste JWT token here..."
          className="w-full h-60 resize-none rounded-md border border-gray-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
       {!loading &&  <button
          onClick={handleDecode}
          className="mt-4 w-full cursor-pointer bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200"
        >
          Decode Token
        </button>}
       {loading &&  <button
          onClick={handleDecode}
          className="mt-4 w-full cursor-pointer bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200"
        >
          <BringToFront className='animate-spin w-full text-center'/>
        </button>}

      </div>

      {/* Output Side */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-2xl p-6 border border-gray-200 overflow-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Decoded Token</h2>

        {(decode && !error) ? (
          <>
            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-600 mb-2">Header</h3>
              <pre className="bg-gray-100 rounded-md p-4 text-sm text-gray-800 overflow-auto font-mono">
                {JSON.stringify(decode.header, null, 2)}
              </pre>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-600 mb-2">Payload</h3>
              <pre className="bg-gray-100 rounded-md p-4 text-sm text-gray-800 overflow-auto font-mono">
                {JSON.stringify(decode.payload, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="text-md font-semibold text-gray-600 mb-2">Signature</h3>
              <pre className="bg-gray-100 rounded-md p-4 text-sm text-gray-800 overflow-auto font-mono">
                {decode.signature}
              </pre>
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic">Decoded data will appear here...</p>
        )}
      </div>
    </div>
  )
}

export default JWT
