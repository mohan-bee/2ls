import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import JWT from './pages/JWT'
import Base64 from './pages/Base64'
import TimeSpace from './pages/TimeSpace'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Home />}/>
      <Route path='/jwt' element={<JWT />}/>
      <Route path='/base64' element={<Base64 />}/>
      <Route path='/time-space' element={<TimeSpace />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App