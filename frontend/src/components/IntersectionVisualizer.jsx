import React from 'react';

const TrafficLight = ({ direction, state }) => {
  const isActive = (color) => state?.color === color ? 'active' : '';

  return (
    <div className={`traffic-light-container tl-${direction.toLowerCase()}`}>
      <div className={`light-color light-red ${isActive("RED")}`}></div>
      <div className={`light-color light-orange ${isActive("ORANGE")}`}></div>
      <div className={`light-color light-green ${isActive("GREEN")}`}></div>
    </div>
  );
};

const SignalTiming = ({ direction, state }) => {
  if (!state || !state.time) return null;
  
  const colorCode = state.color === "GREEN" ? "var(--color-green)" : 
                    state.color === "RED" ? "var(--color-red)" : 
                    "var(--color-orange)";

  return (
    <div className={`signal-stat stat-${direction.toLowerCase()}`}>
      <span style={{ color: "var(--text-secondary)" }}>{direction[0]}</span>
      <span className="stat-time" style={{ color: colorCode }}>{state.time}s</span>
    </div>
  );
};

const TrafficStream = ({ direction, state }) => {
  if (!state) return null;
  const isGreen = state.color === "GREEN";
  
  const dirLower = direction.toLowerCase();
  
  // Decide CSS classes for vertical or horizontal cars
  const carType = (dirLower === 'north' || dirLower === 'south') ? 'car-vertical' : 'car-horizontal';
  const posProp = (dirLower === 'north') ? 'top' : 
                  (dirLower === 'south') ? 'bottom' : 
                  (dirLower === 'east') ? 'right' : 'left';

  // Render Green streaming cars
  if (isGreen) {
    return (
      <div className={`traffic-stream flow-${dirLower}`}>
        <div className={`car-body ${carType}`} style={{ animationDelay: '0s' }}></div>
        <div className={`car-body ${carType} lane-2`} style={{ animationDelay: '0.8s' }}></div>
        <div className={`car-body ${carType}`} style={{ animationDelay: '1.5s' }}></div>
        <div className={`car-body ${carType} lane-2`} style={{ animationDelay: '2.2s' }}></div>
        <div className={`car-body ${carType}`} style={{ animationDelay: '3.0s' }}></div>
      </div>
    );
  }

  // Render Red/Orange queued cars behind stopline
  return (
    <div className={`queued-cars queue-${dirLower}`}>
      <div className={`car-body ${carType}`} style={{ [posProp]: 'calc(50% - 105px)' }}></div>
      <div className={`car-body ${carType} lane-2`} style={{ [posProp]: 'calc(50% - 105px)' }}></div>
      
      <div className={`car-body ${carType}`} style={{ [posProp]: 'calc(50% - 140px)' }}></div>
      
      <div className={`car-body ${carType} lane-2`} style={{ [posProp]: 'calc(50% - 175px)' }}></div>
    </div>
  );
};


const IntersectionVisualizer = ({ signals }) => {
  return (
    <div className="intersection-wrapper">
      {/* Horizontal Road (East-West) */}
      <div className="road road-horizontal">
        <div className="lane-divider lane-horizontal"></div>
      </div>

      {/* Vertical Road (North-South) */}
      <div className="road road-vertical">
        <div className="lane-divider lane-vertical"></div>
      </div>

      {/* Stop Lines */}
      <div className="stop-line stop-north"></div>
      <div className="stop-line stop-south"></div>
      <div className="stop-line stop-east"></div>
      <div className="stop-line stop-west"></div>

      {/* Center Intersection Box */}
      <div className="center-box">
        <div className="logo-stamp">AI TRAFFIC</div>
      </div>

      {/* Traffic Streams & Cars */}
      {['North', 'South', 'East', 'West'].map((dir) => (
         <TrafficStream key={`stream-${dir}`} direction={dir} state={signals[dir]} />
      ))}

      {/* Traffic Lights & Timers */}
      {['North', 'South', 'East', 'West'].map((dir) => (
        <React.Fragment key={`signal-${dir}`}>
          <TrafficLight direction={dir} state={signals[dir]} />
          <SignalTiming direction={dir} state={signals[dir]} />
        </React.Fragment>
      ))}

    </div>
  );
};

export default IntersectionVisualizer;
