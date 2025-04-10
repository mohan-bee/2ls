import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import JWT from './pages/JWT'
import Base64 from './pages/Base64'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Home />}/>
      <Route path='/jwt' element={<JWT />}/>
      <Route path='/base64' element={<Base64 />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App