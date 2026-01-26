import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)

  const handleButtonClick = () => {
    setCount(count + 1)
    setIsAnimating(true)
    setRotation(rotation + 360)
    setScale(1.1)
    
    setTimeout(() => {
      setScale(1)
      setIsAnimating(false)
    }, 600)
  }

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <svg className="logo star-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 L61 40 L92 40 L67 60 L78 90 L50 70 L22 90 L33 60 L8 40 L39 40 Z" fill="currentColor" />
          </svg>
          <svg className="logo geometric-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="30" r="20" fill="currentColor" />
            <rect x="30" y="55" width="40" height="30" fill="currentColor" />
            <polygon points="50,85 65,95 35,95" fill="currentColor" />
          </svg>
        </div>
        
        <h1>⚡ Creative React Studio</h1>
        
        <div className="card">
          <div 
            className={`button-wrapper ${isAnimating ? 'animate' : ''}`}
            style={{
              transform: `rotate(${rotation}deg) scale(${scale})`,
            }}
          >
            <button 
              onClick={handleButtonClick}
              className="magic-button"
            >
              <span className="button-text">Presiona aquí</span>
              <span className="button-count">{count}</span>
            </button>
          </div>
          
          <div className="counter-display">
            <div className="counter-value">{count}</div>
            <p className="counter-label">Clicks registrados</p>
          </div>
          
          <p className="instruction">
            Cada click activa una animación mágica ✨
          </p>
        </div>

        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </>
  )
}

export default App
