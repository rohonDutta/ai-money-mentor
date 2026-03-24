import { Calculator, Flame, HeartPulse, Home, LayoutDashboard, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/health-score', label: 'Money Health Score', icon: HeartPulse },
  { path: '/tax-wizard', label: 'Tax Wizard', icon: Calculator },
  { path: '/fire-planner', label: 'FIRE Planner', icon: Flame },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Sparkles size={28} className="logo-icon" />
          <div>
            <h2 className="logo-title">MoneyMentor</h2>
            <span className="logo-subtitle">AI-Powered Finance</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-badge">
          <Sparkles size={14} />
          <span>ET AI Hackathon 2026</span>
        </div>
      </div>
    </aside>
  )
}
