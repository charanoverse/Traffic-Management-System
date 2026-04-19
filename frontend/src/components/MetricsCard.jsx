import React, { useEffect, useState } from 'react';
import { Activity, Car, Hash, TrendingUp, AlertTriangle } from 'lucide-react';

const MetricsCard = ({ direction, colorTheme }) => {
  const [metrics, setMetrics] = useState({
    Traffic_Volume: "0",
    Average_Speed_kmph: "0",
    Queue_Length_meters: "0",
    Traffic_Density_vehicles_per_meter: "0",
    Congestion_Level: "Low"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect to specific SSE endpoint for metrics
    const eventSource = new EventSource(`http://localhost:5000/${direction.toLowerCase()}-metrics`);

    eventSource.onmessage = (event) => {
      // The backend sends string: "Frame: X, Vehicle Count: Y, Average Speed..." 
      // Let's parse this text stream safely
      try {
        const rawString = event.data;
        const parsed = {};

        const volumeMatch = rawString.match(/Vehicle Count:\s*([\d.]+)/i);
        const speedMatch = rawString.match(/Average Speed.*?:\s*([\d.]+)/i);
        const queueMatch = rawString.match(/Queue Length.*?:\s*([\d.]+)/i);
        const densityMatch = rawString.match(/Traffic Density.*?:\s*([\d.]+)/i);
        const congestionMatch = rawString.match(/Congestion Level:\s*([A-Za-z]+)/i);

        if (volumeMatch) parsed.Traffic_Volume = volumeMatch[1];
        if (speedMatch) parsed.Average_Speed_kmph = speedMatch[1];
        if (queueMatch) parsed.Queue_Length_meters = queueMatch[1];
        if (densityMatch) parsed.Traffic_Density_vehicles_per_meter = densityMatch[1];
        if (congestionMatch) parsed.Congestion_Level = congestionMatch[1];

        if (Object.keys(parsed).length > 0) {
          setMetrics(prev => ({ ...prev, ...parsed }));
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        console.error("Error parsing metrics stream:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error(`EventSource error for ${direction}:`, err);
      eventSource.close();
      setError("Stream Offline");
      setLoading(false);
    };

    return () => {
      eventSource.close();
    };
  }, [direction]);

  return (
    <div className="metric-card glass-panel" style={{ borderTop: `4px solid ${colorTheme}` }}>
      <div className="metric-header">
        <div className="metric-title">
          <h3>{direction}</h3>
          <p>Live Telemetry</p>
        </div>
        <div className="metric-icon" style={{ color: colorTheme }}>
          <Activity size={20} />
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Connecting to sensor...
        </div>
      ) : error ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-red)' }}>
          {error}
        </div>
      ) : (
        <div className="metric-grid">
          <div className="metric-item">
            <span className="metric-item-label">
              <Car size={12} style={{marginRight: '4px', display:'inline'}}/> Volume
            </span>
            <span className="metric-item-value">{metrics.Traffic_Volume}</span>
          </div>
          <div className="metric-item">
            <span className="metric-item-label">
               Speed (km/h)
            </span>
            <span className="metric-item-value">{parseFloat(metrics.Average_Speed_kmph).toFixed(1)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-item-label">
               <TrendingUp size={12} style={{marginRight: '4px', display:'inline'}}/> Queue (m)
            </span>
            <span className="metric-item-value">{parseFloat(metrics.Queue_Length_meters).toFixed(1)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-item-label">
              <Hash size={12} style={{marginRight: '4px', display:'inline'}}/> Density
            </span>
            <span className="metric-item-value">{parseFloat(metrics.Traffic_Density_vehicles_per_meter).toFixed(2)}</span>
          </div>
          
          {/* Congestion Level spanning full width */}
          <div className="metric-item" style={{ gridColumn: 'span 2', marginTop: '8px', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
             <span className="metric-item-label">
              <AlertTriangle size={12} style={{marginRight: '4px', display:'inline'}}/> Status
            </span>
            <span className="metric-item-value" style={{ 
              color: metrics.Congestion_Level.includes('High') ? 'var(--color-red)' : 
                     metrics.Congestion_Level.includes('Medium') ? 'var(--color-orange)' : 'var(--color-green)'
            }}>
              {metrics.Congestion_Level} Congestion
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;
