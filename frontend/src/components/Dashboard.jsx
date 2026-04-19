import React, { useEffect, useState } from 'react';
import MetricsCard from './MetricsCard';
import IntersectionVisualizer from './IntersectionVisualizer';
import { Activity } from 'lucide-react';

const Dashboard = () => {
  const [signals, setSignals] = useState({
    North: null,
    South: null,
    East: null,
    West: null
  });

  const [systemStatus, setSystemStatus] = useState("Connecting...");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/stream-signals");
    
    eventSource.onopen = () => setSystemStatus("Active");

    eventSource.onmessage = (event) => {
      const data = event.data.trim();
      // Example data: "North Signal: GREEN, Time left: 34" or "North Signal: GREEN"
      
      const match = data.match(/([a-zA-Z]+):\s+([a-zA-Z]+)[^\d]*(\d+)/i);
      
      if (match) {
        const dir = match[1];
        const color = match[2].toUpperCase();
        const time = match[3] ? parseInt(match[3]) : null;

        if (['North', 'South', 'East', 'West'].includes(dir)) {
          setSignals(prev => ({
            ...prev,
            [dir]: { color, time }
          }));
        }
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error with Signal EventSource:", error);
      setSystemStatus("Reconnecting...");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Smart City Command Center</h1>
        <div className="dashboard-header-status glass-panel" style={{ padding: '8px 16px', borderRadius: '20px' }}>
          <div className="status-dot" style={{ 
            backgroundColor: systemStatus === "Active" ? "var(--color-green)" : "var(--color-orange)",
            boxShadow: systemStatus === "Active" ? "var(--glow-green)" : "var(--glow-orange)"
          }}></div>
          System Status: {systemStatus}
        </div>
      </header>

      <div className="dashboard-content">
        {/* Left Side Metrics */}
        <div className="side-panel">
          <MetricsCard direction="North" colorTheme="var(--accent-cyan)" />
          <MetricsCard direction="West" colorTheme="var(--accent-blue)" />
        </div>

        {/* Center Canvas: Intersection */}
        <div className="center-panel glass-panel">
          <IntersectionVisualizer signals={signals} />
          
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '8px', alignItems: 'center', opacity: 0.5 }}>
            <Activity size={16} /> Live Feed
          </div>
        </div>

        {/* Right Side Metrics */}
        <div className="side-panel">
          <MetricsCard direction="East" colorTheme="var(--accent-blue)" />
          <MetricsCard direction="South" colorTheme="var(--accent-cyan)" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
