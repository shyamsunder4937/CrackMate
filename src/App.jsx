import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Homepage from './Pages/Homepage'
import CopilotPage from './Pages/copilot/copilotPage'
import LandingVideo from './components/LandingVideo'
import FeaturesPage from "./Pages/featurespage.jsx";
import Offers from './Pages/Offers'
import Comparision from './Pages/Comparision'
import ReviewPage from './Pages/Rewivewpage'
import Questions from './Pages/questions'
import Footer from './components/Footer'
import GlassBanner from './components/GlassBanner.jsx'



const App = () => {
  return (
    <div className="bg-white min-h-screen pt-20 sm:pt-24">
      <Header />
      <Homepage />
      <LandingVideo />
      <CopilotPage />
      <FeaturesPage />
      <div className="my-12" />
      <Offers />
      <Comparision />
      <ReviewPage />
      <Questions />
      <Footer />
      <GlassBanner text="CrackMate AI" />
      
    </div>
  )
}

export default App