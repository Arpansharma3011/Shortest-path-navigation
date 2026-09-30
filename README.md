# 🗺️ Shortest Path Navigation

![C++17](https://img.shields.io/badge/C%2B%2B-17-blue.svg?style=for-the-badge&logo=cplusplus)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

A dual-implementation (C++ CLI & Interactive Web UI) project for computing and visualizing shortest paths on weighted graphs using **Dijkstra's Algorithm**.

---

## 🌟 Overview

The **Shortest Path Navigation** project provides both a high-performance C++ command-line application and a sleek, interactive browser-based SVG visualization tool. It allows developers and students to define custom weighted graphs, set origin and target destination nodes, and inspect the shortest path along with total path costs.

---

## 📑 Table of Contents

- [Features](#-features)
- [Project Architecture](#-project-architecture)
- [Algorithm & Complexity](#-algorithm--complexity)
- [Graph Input Format](#-graph-input-format)
- [Web Demo Guide](#-web-demo-guide)
- [Building & Running the C++ Application](#-building--running-the-c-application)
  - [Using CMake](#1-using-cmake-recommended)
  - [Using GCC / g++](#2-using-gcc--g)
  - [Using MSVC (Visual Studio)](#3-using-msvc-cl)
- [Example Benchmark & Output](#-example-benchmark--output)
- [Future Roadmap](#-future-roadmap)
- [License](#-license)

---

## ✨ Features

- ⚡ **Dual Implementation**:
  - **C++17 Engine**: High-performance priority-queue (`std::priority_queue`) Dijkstra implementation.
  - **Interactive Web Visualizer**: Pure Vanilla JavaScript with inline SVG canvas for real-time path rendering.
- 🎨 **Modern Glassmorphism UI**: Built with responsive layouts, glowing gradients, hover effects, and crisp typography.
- 📐 **Dynamic Circular SVG Layout**: Automatically calculates trigonometric node coordinates and plots node connections and edge weight labels.
- 🟢 **Path Highlighting**: Instantly colors the shortest path nodes and connecting edges in neon green.
- 🔤 **Flexible Node Names**: Supports both numerical (`1`, `2`, `3`) and textual string labels (`A`, `B`, `CityX`).
- 🛠️ **Multi-Platform Build Support**: Compiles seamlessly on Windows, Linux, and macOS via CMake, GCC, or MSVC.

---

## 📁 Project Architecture

```
Shortest-path-navigation/
├── CMakeLists.txt     # CMake build configuration for C++ binary
├── README.md          # Project documentation
├── index.html         # Web application UI layout & glassmorphic styles
├── main.cpp           # C++ console implementation of Dijkstra's algorithm
└── script.js          # JavaScript graph parser, Dijkstra solver & SVG renderer
```

### Component Breakdown
| File | Role | Technologies |
| :--- | :--- | :--- |
| **`main.cpp`** | CLI solver for shortest path calculations | C++17, STL Containers (`std::priority_queue`, `std::unordered_map`) |
| **`CMakeLists.txt`** | Build system target declaration | CMake 3.10+ |
| **`index.html`** | Interactive layout & user controls | HTML5, CSS Grid/Flexbox |
| **`script.js`** | Graph data parsing, web Dijkstra engine & SVG DOM manipulation | JavaScript (ES6+) |

---

## 🧮 Algorithm & Complexity

The project uses **Dijkstra's Algorithm** with a min-priority queue to compute single-source shortest paths on weighted graphs with non-negative edge weights.

### Performance Bounds
- **Time Complexity**: $\mathcal{O}((V + E) \log V)$
  - $V$: Number of vertices (nodes)
  - $E$: Number of edges
- **Space Complexity**: $\mathcal{O}(V + E)$ for storing adjacency lists and priority queues.

---

## 📝 Graph Input Format

The graph input consists of single-line edge declarations formatted as:

```text
<from_node> <to_node> <weight>
```

### Format Rules
1. Each line represents an undirected weighted edge between `<from_node>` and `<to_node>`.
2. `<weight>` must be a non-negative number.
3. Node names can be integers or string names (e.g., `NodeA NodeB 12`).

---

## 🖥️ Web Demo Guide

The web visualizer allows you to build custom graphs and find paths directly in your web browser with zero setup.

### Steps to Run:
1. Open `index.html` in any web browser (Chrome, Edge, Firefox, Safari).
2. Enter your edge list in the text area.
3. Specify the **Start node** and **Goal node**.
4. Click **Find shortest path**.

### Visual Legend
- 🔵 **Blue Circles**: Graph Nodes
- 🟣 **Purple Lines**: Standard Edges & Weights
- 🟢 **Green Circles & Lines**: Highlighted Shortest Path

---

## 🔨 Building & Running the C++ Application

Ensure you have a C++17 compatible compiler installed.

### 1. Using CMake (Recommended)
```powershell
# Generate build files
cmake -S . -B build

# Build the executable
cmake --build build

# Run the executable (Windows)
.\build\shortest_path_navigation.exe

# Run the executable (Linux/macOS)
./build/shortest_path_navigation
```

### 2. Using GCC / g++
```powershell
g++ -std=c++17 main.cpp -o shortest_path_navigation.exe
.\shortest_path_navigation.exe
```

### 3. Using MSVC (`cl`)
Open the **Developer Command Prompt for VS** and run:
```powershell
cl /std:c++17 main.cpp /Fe:shortest_path_navigation.exe
.\shortest_path_navigation.exe
```

---

## 🧪 Example Benchmark & Output

### Sample Graph Edges
```text
1 2 7
1 3 9
1 6 14
2 3 10
2 4 15
3 4 11
3 6 2
4 5 6
5 6 9
```

### Execution Parameters
- **Start Node**: `1`
- **Goal Node**: `5`

### Program Output
```text
Shortest path from 1 to 5: 1 -> 3 -> 6 -> 5
Total cost: 20
```

---

## 🚀 Future Roadmap

- [ ] **A\* Search Algorithm**: Add heuristic-based A* pathfinding.
- [ ] **Interactive Drag & Drop**: Allow dragging graph nodes on the SVG canvas.
- [ ] **Step-by-Step Animation**: Visualize algorithm node exploration in real-time.
- [ ] **Directed Graph Toggle**: Support both directed and undirected graphs.
- [ ] **File Import/Export**: Export graph configurations as JSON / CSV.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute!
