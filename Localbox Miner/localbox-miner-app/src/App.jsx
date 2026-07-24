import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [mining, setMining] = useState(false)
  const [stats, setStats] = useState({
    hashrate: 0,
    accepted: 0,
    rejected: 0,
    uptime: 0,
    temperature: 45,
    power: 0,
    shares: 0,
  })

  const simulateMining = useCallback(() => {
    setStats(prev => ({
      hashrate: Math.floor(Math.random() * 500 + 100),
      accepted: prev.accepted + Math.floor(Math.random() * 3),
      rejected: prev.rejected + (Math.random() > 0.9 ? 1 : 0),
      uptime: prev.uptime + 1,
      temperature: Math.floor(Math.random() * 20 + 50),
      power: Math.floor(Math.random() * 50 + 100),
      shares: prev.shares + 1,
    }))
  }, [])

  useEffect(() => {
    let interval
    if (mining) {
      interval = setInterval(simulateMining, 2000)
    }
    return () => clearInterval(interval)
  }, [mining, simulateMining])

  const toggleMining = () => {
    setMining(prev => !prev)
    if (!mining) {
      setStats(prev => ({ ...prev, power: 120 }))
    } else {
      setStats(prev => ({ ...prev, power: 0, hashrate: 0 }))
    }
  }

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const StatCard = ({ label, value, unit, icon, color }) => (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-icon" style={{ color: color || 'var(--accent)' }}>{icon}</span>
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-value">
        {value}
        <span className="stat-unit">{unit}</span>
      </div>
    </div>
  )

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">⛏️</span>
          <h1>Localbox Miner</h1>
        </div>
        <div className="status-badge" data-active={mining}>
          <span className="status-dot"></span>
          {mining ? 'Mining' : 'Idle'}
        </div>
      </header>

      <main className="main">
        <div className="stats-grid">
          <StatCard
            label="Hashrate"
            value={stats.hashrate}
            unit=" H/s"
            icon="⚡"
            color="var(--accent)"
          />
          <StatCard
            label="Temperature"
            value={stats.temperature}
            unit="°C"
            icon="🌡️"
            color={stats.temperature > 65 ? 'var(--danger)' : 'var(--warning)'}
          />
          <StatCard
            label="Power"
            value={stats.power}
            unit=" W"
            icon="🔌"
            color="var(--success)"
          />
          <StatCard
            label="Uptime"
            value={formatUptime(stats.uptime)}
            unit=""
            icon="⏱️"
            color="var(--accent)"
          />
          <StatCard
            label="Accepted"
            value={stats.accepted}
            unit=""
            icon="✅"
            color="var(--success)"
          />
          <StatCard
            label="Rejected"
            value={stats.rejected}
            unit=""
            icon="❌"
            color="var(--danger)"
          />
          <StatCard
            label="Shares"
            value={stats.shares}
            unit=""
            icon="📊"
            color="var(--accent)"
          />
          <StatCard
            label="Efficiency"
            value={stats.power > 0 ? (stats.hashrate / stats.power).toFixed(1) : 0}
            unit=" H/W"
            icon="🎯"
            color="var(--warning)"
          />
        </div>

        <div className="controls">
          <button
            className={`mine-btn ${mining ? 'stop' : 'start'}`}
            onClick={toggleMining}
          >
            <span className="btn-icon">{mining ? '⏹' : '▶'}</span>
            {mining ? 'Stop Mining' : 'Start Mining'}
          </button>

          <div className="mining-info">
            <div className="info-row">
              <span>Pool</span>
              <span className="info-value">localbox.stratum</span>
            </div>
            <div className="info-row">
              <span>Worker</span>
              <span className="info-value">LocalMiner-01</span>
            </div>
            <div className="info-row">
              <span>Algorithm</span>
              <span className="info-value">RandomX</span>
            </div>
          </div>
        </div>

        <div className="activity-log">
          <h3 className="log-title">Activity Log</h3>
          <div className="log-entries">
            {mining ? (
              <>
                <div className="log-entry success">✓ Share accepted (difficulty 1.2G)</div>
                <div className="log-entry info">⚡ Hashrate: {stats.hashrate} H/s</div>
                <div className="log-entry info">🌡️ Temperature: {stats.temperature}°C</div>
                {stats.rejected > 0 && (
                  <div className="log-entry error">✗ Share rejected (stale)</div>
                )}
              </>
            ) : (
              <div className="log-entry muted">⏸️ Miner idle — waiting to start...</div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Localbox Miner v1.0.0 • React Dashboard</p>
      </footer>
    </div>
  )
}

export default App

