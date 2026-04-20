# 🛡️ CyberJoar Fusion: Tactical Intelligence System

**CyberJoar Fusion** is a high-fidelity, open-source common operating picture (COP) designed for field commanders, strategic analysts, and tactical agents. It fuses multiple intelligence streams—OSINT, HUMINT, and IMINT—into a single, unified geospatial interface to provide total situational dominance.

---

## 🚀 Key Features

### 1. **Interactive Geospatial Grid**
*   **Dynamic Mapping**: Integrated high-resolution terrain, satellite, and tactical dark mode grids.
*   **Marker Clustering**: Intelligently groups dense intelligence nodes to maintain clarity during high-volume operations.
*   **Predictive Trajectories**: Visualizes potential asset movement paths using dashed vector overlays.
*   **Real-Time Focus**: "Fly-to" logic that instantly centers the grid on new or selected intelligence signals.

### 2. **Multi-Modal Intelligence Ingestion**
*   **Drag-and-Drop OSINT**: Seamlessly upload JPG/PNG imagery with automatic IMINT categorization.
*   **Bulk Data Ingest**: Supports structured `.csv` and `.json` files for rapid synchronization of large intelligence datasets.
*   **Geospatial Anchoring**: Manually or automatically anchor tactical reports to precise Latitude/Longitude coordinates.

### 3. **Role-Based Access Control (RBAC)**
*   **Operational Commander (Level 3)**: Full access to system layers, analytics, and bulk ingestion tools.
*   **Intelligence Analyst (Level 2)**: Access to the strategic database and activity feeds for pattern recognition.
*   **Field Agent (Level 1)**: Focused mobile-ready interface for reporting and grid visualization.

### 4. **Strategic Workspace**
*   **Activity Feed**: A vertical timeline of every signal distributed across the operational node.
*   **Intelligence Database**: A searchable, filterable repository of every piece of verified intel.
*   **System Analytics**: Real-time distribution charts showing the balance between human, open-source, and imagery intelligence.

---

## 📱 Full Resolution Flexibility
CyberJoar Fusion is built with a **Mobile-First Tactical Design**:
*   **Desktop**: Expansive sidebars and multi-panel layouts for command center environments.
*   **Mobile**: Transforms into a touch-optimized app with a **Bottom Navigation Bar** and **Intelligence Drawers** for field use.
*   **One-Handed Navigation**: Dedicated "Back to Grid" buttons and swipe-ready interfaces for rapid response.

---

## 🛠️ Tech Stack

### **Frontend**
*   **React 18**: Modern UI component architecture.
*   **Tailwind CSS**: Custom tactical aesthetics with glassmorphism and high-contrast dark modes.
*   **Leaflet.js**: High-performance geospatial rendering and clustering.
*   **Lucide React**: Crisp, military-grade iconography.

### **Backend**
*   **Node.js & Express**: High-concurrency intelligence API.
*   **MongoDB**: Document storage with **Geospatial Indexing** ($2dsphere) for lightning-fast location queries.
*   **JWT Security**: Stateless authentication for secure operational sessions.

---

## 🏁 Getting Started

### **1. Prerequisites**
*   Node.js (v16+)
*   MongoDB Atlas or Local Instance

### **2. Installation**

#### **Backend Setup**
```bash
cd backend
npm install
# Create a .env file with your MONGODB_URI and JWT_SECRET
npm run dev
```

#### **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### **3. Default Access Gate**
For rapid testing, use the built-in deployment credentials:
*   **Commander**: `commander@cyberjoar.ai` / `commander123`
*   **Analyst**: `analyst@cyberjoar.ai` / `analyst123`
*   **Field Agent**: `agent@cyberjoar.ai` / `agent123`

---

## 📜 License
Developed for the **CYBERJOAR AI Assignment**. All tactical designs and intelligence fusion logic are proprietary to the CyberJoar development framework.

---
© 2026 CYBERJOAR TACTICAL SYSTEMS | CLASSIFIED PROJECT
