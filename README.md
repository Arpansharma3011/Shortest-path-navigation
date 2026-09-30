# Shortest Path Navigation

A small project that shows how to compute and display the shortest path on a weighted graph.

This repository includes:
- `main.cpp` — C++ program using Dijkstra's algorithm.
- `CMakeLists.txt` — build configuration for CMake.
- `index.html` — browser demo UI with graph visualization.
- `script.js` — JavaScript implementation of graph parsing and path rendering.

---

## What this project does

- Computes the shortest path between two nodes in a graph.
- Uses a sample graph in the C++ version.
- Displays an interactive graph view in the browser demo.
- Highlights the shortest path and shows edge weights.

---

## Files

- `main.cpp`: console-based example using C++.
- `CMakeLists.txt`: build configuration for CMake.
- `index.html`: browser demo layout and SVG canvas.
- `script.js`: graph parsing, Dijkstra algorithm, and visualization.
- `README.md`: project documentation.

---

## Graph input format

Provide edges with one line per edge in this format:

```
from to cost
```

Example graph:

```
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

- The browser demo treats the graph as undirected.
- The cost value is the edge weight used by the shortest-path algorithm.
- Node labels can be numbers or strings.

---

## Build and Run

### Using CMake
1. Open PowerShell in the project folder.
2. Run:
   ```powershell
   cmake -S . -B build
   cmake --build build
   .\build\shortest_path_navigation.exe
   ```

### Using MSVC directly
1. Open the Visual Studio Developer Command Prompt.
2. Run:
   ```powershell
   cl /std:c++17 main.cpp /Fe:shortest_path_navigation.exe
   .\shortest_path_navigation.exe
   ```

### Using g++
1. Run:
   ```powershell
   g++ -std=c++17 main.cpp -o shortest_path_navigation.exe
   .\shortest_path_navigation.exe
   ```

### Using g++
1. Run:
   ```powershell
   g++ -std:c++17 main.cpp -o shortest_path_navigation.exe
   .\shortest_path_navigation.exe
   ```

---

## Use the browser demo

The browser demo provides a visual graph view with highlighted shortest path and edge weights.

1. Open `index.html` in Google Chrome.
   - Right-click the file and choose `Open with > Google Chrome`.
   - Or drag the file into an open Chrome window.
2. Enter graph edges in the textarea using the format `from to cost`.
3. Enter the `Start node` and `Goal node`.
4. Click **Find shortest path**.

What you will see:
- A circular graph layout with nodes and connecting edges.
- Edge weights displayed along each line.
- The shortest path highlighted in green.
- The result box reporting the path and total cost.

---

## Example usage

Use this sample graph to test the browser demo:

- Edges:
  ```
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
- Start node: `1`
- Goal node: `5`

Expected result:

```
Shortest path from 1 to 5: 1 -> 3 -> 6 -> 5
Total cost: 20
```

---

## Notes

- `main.cpp` uses a hard-coded sample graph in the console application.
- `index.html` and `script.js` create the browser demo and graph visualization.
- If the graph is disconnected, the browser demo will show "No path found".
- Node labels can be numeric or text labels, as long as they are consistent.

---

## Next improvements

You can improve the project by:
- adding node coordinates for a map-style layout
- accepting graph input from a file
- supporting directed graphs
- animating the search algorithm step-by-step
- adding A* search for larger inputs
