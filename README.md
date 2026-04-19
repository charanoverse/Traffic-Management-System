# 🚦 AI-Driven Traffic Signal Optimization System

> Intelligent traffic management using Particle Swarm Optimization (PSO) and real-time video analysis — no additional hardware required.

---

## 📌 Overview

Urban traffic congestion is a growing challenge that leads to increased commute times, fuel waste, and carbon emissions. This project presents an **AI-powered traffic signal optimization system** that dynamically adjusts signal timings based on real-time traffic density, eliminating dependence on physical sensors or costly infrastructure upgrades.

The system uses **video-based traffic data extraction** combined with **Particle Swarm Optimization (PSO)** to intelligently compute optimal green-light durations per lane. A **MERN stack web interface** provides live monitoring and manual override capabilities for traffic operators.

---

## ✨ Key Features

- **Real-Time Signal Adjustment** — Dynamically adapts green-light durations based on current vehicle density per lane.
- **PSO-Based AI Engine** — Uses Particle Swarm Optimization to intelligently minimize wait times and maximize overall traffic throughput.
- **Video-Based Data Extraction** — Processes live or recorded traffic footage to estimate congestion; no physical loop detectors or IoT sensors needed.
- **MERN Stack Dashboard** — A full-stack web interface for real-time visualization, monitoring, and control of signal states.
- **Hardware-Free Deployment** — Integrates with existing CCTV infrastructure, making it cost-effective and scalable.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                    │
│         Dashboard · Signal Status · Analytics           │
└───────────────────────┬─────────────────────────────────┘
                        │ REST API
┌───────────────────────▼─────────────────────────────────┐
│                   Backend (Node.js / Express)            │
│         API Routes · Signal Controller · Data Layer     │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                     ML Model (Python)                   │
│    Video Frame Analysis · Vehicle Counting · PSO Engine │
└─────────────────────────────────────────────────────────┘
```

---

## 🤖 How PSO Works Here

**Particle Swarm Optimization** is a nature-inspired metaheuristic that mimics the collective behavior of birds flocking or fish schooling.

In this system:
- Each **particle** represents a candidate set of signal timings (green durations per lane).
- The **fitness function** minimizes total vehicle wait time and queue length across all lanes.
- Particles iteratively update their positions (timings) guided by their personal best and the global best found by the swarm.
- The converged solution gives the **optimal signal cycle** for the current traffic snapshot.

This approach adapts to fluctuating traffic patterns far more effectively than fixed-time or simple rule-based controllers.

---

## 🗂️ Project Structure

```
Traffic-Management-System/
│
├── ML Model/               # Python-based AI core
│   ├── vehicle_detection   # Video frame processing & vehicle counting
│   ├── pso_optimizer       # PSO algorithm implementation
│   └── notebooks/          # Jupyter notebooks for experimentation
│
├── Backend/                # Node.js + Express REST API
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic & signal control
│   └── models/             # MongoDB schemas
│
└── frontend/               # React.js web dashboard
    ├── components/         # UI components
    ├── pages/              # Dashboard, analytics views
    └── services/           # API communication layer
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ML / AI | Python, OpenCV, NumPy |
| Algorithm | Particle Swarm Optimization (PSO) |
| Data Input | Video streams / recorded footage |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Python (3.8+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/charanoverse/Traffic-Management-System.git
cd Traffic-Management-System
```

### 2. Set Up the ML Model

```bash
cd "ML Model"
pip install -r requirements.txt
```

Run vehicle detection and PSO optimization:
```bash
python main.py --video path/to/traffic_video.mp4
```

### 3. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:
```bash
npm start
```

### 4. Set Up the Frontend

```bash
cd frontend
npm install
npm start
```

The dashboard will be available at `http://localhost:3000`.

---

## 📊 How It Works — End to End

```
Video Input
    │
    ▼
Frame Extraction (OpenCV)
    │
    ▼
Vehicle Detection & Density Estimation
    │
    ▼
PSO Optimization Engine
    │  → Computes optimal green-light durations per lane
    ▼
Signal Timing Output
    │
    ▼
Backend API → MongoDB
    │
    ▼
React Dashboard (Live Visualization)
```

---

## 📸 Demo



![alt text](./frontend/public/demo.gif)

---

## 📈 Results & Impact

- Reduces average vehicle wait time at intersections
- Adapts dynamically to peak and off-peak traffic conditions
- No additional sensor hardware required — works with existing CCTV setups
- Scalable to multi-junction deployments

---

## 👤 Author

**Sri Charan Kolachalama**  
[GitHub](https://github.com/charanoverse)

---

> *Built to make city roads smarter — one intersection at a time.*
