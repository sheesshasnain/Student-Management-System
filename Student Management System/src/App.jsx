import React from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div>    
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default App