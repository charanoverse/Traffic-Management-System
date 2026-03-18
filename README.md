# AI Powered Traffic Management System

<div align="center">


An intelligent traffic signal optimization system that leverages **AI and computer vision** to reduce congestion and improve traffic flow in real-time.


</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)


---

## 🎯 Overview

The **AI Powered Traffic Management System** is an intelligent solution designed to optimize traffic signal timings dynamically based on real-time traffic conditions. By eliminating the need for additional hardware, this system processes visual data from existing camera infrastructure and employs **Particle Swarm Optimization (PSO)** algorithms to make intelligent decisions for signal adjustment.

### Problem Statement
Traditional traffic management systems rely on fixed signal timings that don't adapt to dynamic traffic patterns, leading to:
- Increased congestion during peak hours
- Longer wait times for vehicles
- Higher fuel consumption and emissions
- Reduced traffic flow efficiency

### Solution
Our AI-driven approach:
- Analyzes video streams in real-time to extract traffic density information
- Uses PSO-based optimization to dynamically adjust signal timings
- Integrates with a modern web interface for centralized monitoring and control
- Scales efficiently without requiring specialized hardware

---

## ✨ Key Features

- **🚦 Real-time Signal Adjustment**: Dynamically adjusts traffic light timings based on live traffic density
- **🤖 AI-Powered Optimization**: Particle Swarm Optimization (PSO) algorithm for intelligent decision-making
- **📹 Video-Based Data Extraction**: Processes video streams to analyze traffic conditions without additional sensors
- **💻 MERN Stack Interface**: Modern, responsive web interface for monitoring and control
- **📊 Real-time Analytics**: Dashboard displaying traffic metrics and system performance
- **⚡ Hardware-Agnostic**: Works with existing camera infrastructure
- **🔄 Seamless Integration**: Easy integration with existing traffic management systems

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Traffic Management System                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼──────┐  ┌──▼──────┐  ┌──▼──────┐
        │   Frontend   │  │ Backend  │  │ ML/AI   │
        │  (React)     │  │ (Node.js)│  │ Model   │
        └───────┬──────┘  └──┬──────┘  └──┬──────┘
                │             │             │
        ┌───────▼─────────────▼─────────────▼───────┐
        │          MongoDB Database                  │
        └─────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
    ┌───▼────┐          ┌────▼────┐          ┌────▼────┐
    │ Camera │          │ Camera  │          │ Camera  │
    │ Stream │          │ Stream  │          │ Stream  │
    └────────┘          └─────────┘          └─────────┘
```

### Components

1. **Frontend (React)**
   - Real-time dashboard for traffic monitoring
   - Signal timing visualization
   - Analytics and reporting

2. **Backend (Node.js + Express)**
   - RESTful APIs for frontend communication
   - Video stream processing coordination
   - Signal timing control logic

3. **ML Model (Python)**
   - Video analysis and traffic density detection
   - PSO-based optimization algorithm
   - Signal timing recommendations

4. **Database (MongoDB)**
   - Stores historical traffic data
   - Configuration management
   - System logs and analytics

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Redux/Context API** - State management
- **Axios** - HTTP client
- **Chart.js/Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library

### Machine Learning
- **Python 3.8+** - Programming language
- **TensorFlow/PyTorch** - Deep learning framework
- **OpenCV** - Computer vision library
- **NumPy/Pandas** - Data processing
- **Scikit-learn** - Machine learning library

---

## 📁 Project Structure

```
Traffic-Management-System/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
│   ├── package.json
│   └── README.md
│
├── Backend/                     # Node.js backend API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── ML/                          # Python ML/AI models
│   ├── video_processing/
│   ├── traffic_detection/
│   ├── pso_optimization/
│   ├── models/
│   ├── requirements.txt
│   └── README.md
│
├── ML Model/                    # Additional ML models/notebooks
│   └── [Jupyter Notebooks]
│
├── .gitignore
├── README.md                    # This file
└── LICENSE
```

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- Python 3.8+
- MongoDB (local or cloud instance)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/charanoverse/Traffic-Management-System.git
cd Traffic-Management-System
```

### Step 2: Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/traffic-management
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

Start the backend:
```bash
node server.js
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

### Step 4: ML Model Setup

```bash
cd ../ML
python -m venv venv

# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Configure the model:
```bash
python main.py --config config.yaml
```

---

## 🚀 Usage

### 1. Start All Services

```bash
# Terminal 1: Backend
cd Backend
npm start

# Terminal 2: Frontend
cd frontend
npm start

# Terminal 3: ML Model
cd ML
python main.py
```

### 2. Access the Application

- **Dashboard**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Documentation**: http://localhost:5000/api/docs

### 3. Monitor Traffic

1. Navigate to the dashboard
2. View real-time traffic conditions on the map
3. Check signal timings and recommendations
4. Review analytics and performance metrics

### 4. Adjust Settings

- Configure signal timing parameters
- Set optimization preferences
- Manage camera feeds
- View historical data

---

## ⚙️ Configuration

### Backend Configuration

Edit `Backend/config/config.js`:
```javascript
module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  videoProcessingInterval: 5000, // milliseconds
};
```

### ML Model Configuration

Edit `ML/config.yaml`:
```yaml
video:
  fps: 30
  resolution: [1920, 1080]
  
detection:
  confidence_threshold: 0.5
  
optimization:
  algorithm: pso
  population_size: 50
  iterations: 100
  
signal:
  min_timing: 10
  max_timing: 120
```

---

## 📊 API Endpoints

### Traffic Data
- `GET /api/traffic/density` - Get current traffic density
- `GET /api/traffic/history` - Get historical traffic data
- `POST /api/traffic/report` - Report traffic incident

### Signal Management
- `GET /api/signals` - Get all signals
- `GET /api/signals/:id` - Get specific signal
- `PUT /api/signals/:id` - Update signal timing
- `POST /api/signals/:id/optimize` - Optimize signal timing

### Analytics
- `GET /api/analytics/performance` - Get system performance metrics
- `GET /api/analytics/trends` - Get traffic trends
- `GET /api/analytics/predictions` - Get traffic predictions


---
