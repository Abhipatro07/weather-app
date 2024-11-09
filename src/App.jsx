import React from 'react'
import Weather from './component/Weather'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='app'>
      <Weather/>
      <ToastContainer/>
    </div>
  )
}

export default App
