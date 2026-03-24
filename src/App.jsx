import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import FirePlanner from './pages/FirePlanner'
import HealthScore from './pages/HealthScore'
import Home from './pages/Home'
import TaxWizard from './pages/TaxWizard'

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/health-score" element={<HealthScore />} />
            <Route path="/tax-wizard" element={<TaxWizard />} />
            <Route path="/fire-planner" element={<FirePlanner />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
