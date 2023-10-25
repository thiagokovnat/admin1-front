import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import fiubaLogo from '/Logo-fiuba_big.png'
import './App.css'
import axios from "axios"


const instance = axios.create({
  baseURL: "https://admin1-api.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});

function App() {
  const [count, setCount] = useState(0)
  const [health, setHealth] = useState("fetching")

  const fetchHealth = async () => {
    try {
      const response = await instance.get('/health')
      console.log(response)
      setHealth("OK")
    } catch (error) {
      setHealth("ERROR")
    }
  }

  useEffect(() => {
    fetchHealth()
    const interval = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo" alt="React logo" />
        </a>
        <a href="https://fi.uba.ar" target="_blank">
          <img src={fiubaLogo} className="logo react" alt="Fiuba logo" />
        </a>
      </div>
      <h1>Fiuba Learning</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Subscriber count is {count}
        </button>
        <p>
          Subscribe to the best courses online
        </p>
        <p>
          Health: <span style = {{color: health === "OK" ? "green" : "red"}}>{health}</span>
        </p>
      </div>
      <p className="read-the-docs">
        
      </p>
    </>
  )
}

export default App
