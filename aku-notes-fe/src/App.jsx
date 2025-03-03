import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

import './App.css'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
  )
}

export default App
