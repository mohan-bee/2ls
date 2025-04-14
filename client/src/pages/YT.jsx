import React, { useState } from 'react'

const YT = () => {
  const [url, setUrl] = useState('')

  const handleDownload = async () => {
    try {
      const encodedURI = encodeURIComponent(url)
      const downloadURL = `http://localhost:3000/api/yt/download?url=${encodedURI}` // Updated port to 5000

      const link = document.createElement('a')
      link.href = downloadURL
      link.target = '_blank' // optional, but nice UX
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <textarea
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube video URL here..."
        className="w-full h-20 resize-none rounded-md border border-gray-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleDownload}
        className="mt-4 w-full cursor-pointer bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition duration-200"
      >
        Download
      </button>
    </div>
  )
}

export default YT
