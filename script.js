function parseGraph(text) {
    const graph = new Map();

    function addEdge(from, to, cost) {
        if (!graph.has(from)) graph.set(from, []);
        graph.get(from).push({ target: to, cost });
    }

    for (const line of text.trim().split('\n')) {
        const parts = line.trim().split(/\s+/);
        if (parts.length !== 3) continue;

        const from = parts[0];
        const to = parts[1];
        const cost = Number(parts[2]);

        if (Number.isNaN(cost)) continue;
        addEdge(from, to, cost);
        addEdge(to, from, cost);
    }

    return graph;
}

function dijkstra(graph, start, goal) {
    const distances = new Map();
    const previous = new Map();
    const queue = [];

    for (const key of graph.keys()) {
        distances.set(key, Infinity);
    }

    if (!graph.has(start) || !graph.has(goal)) {
        return { path: [], cost: Infinity };
    }

    distances.set(start, 0);
    queue.push({ node: start, cost: 0 });

    while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        const { node } = queue.shift();

        if (node === goal) {
            break;
        }

        const neighbors = graph.get(node) || [];
        for (const edge of neighbors) {
            const nextCost = distances.get(node) + edge.cost;
            if (nextCost < distances.get(edge.target)) {
                distances.set(edge.target, nextCost);
                previous.set(edge.target, node);
                queue.push({ node: edge.target, cost: nextCost });
            }
        }
    }

    const path = [];
    if (distances.get(goal) === Infinity) {
        return { path, cost: Infinity };
    }

    let current = goal;
    while (current !== undefined) {
        path.unshift(current);
        if (current === start) break;
        current = previous.get(current);
    }

    return { path, cost: distances.get(goal) };
}

const output = document.getElementById('output');
const runButton = document.getElementById('runButton');
const graphSvg = document.getElementById('graphSvg');

function buildVisualization(graph, path) {
    const nodes = new Set();
    const edges = [];

    for (const [from, neighbors] of graph.entries()) {
        nodes.add(from);
        for (const edge of neighbors) {
            const key = [from, edge.target].sort().join('-');
            edges.push({ from, to: edge.target, cost: edge.cost, key });
            nodes.add(edge.target);
        }
    }

    const nodeIds = Array.from(nodes).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const radius = 30;
    const centerX = 380;
    const centerY = 240;
    const circleRadius = 190;
    const nodePositions = new Map();

    nodeIds.forEach((node, index) => {
        const angle = (Math.PI * 2 * index) / nodeIds.length;
        const x = centerX + circleRadius * Math.cos(angle);
        const y = centerY + circleRadius * Math.sin(angle);
        nodePositions.set(node, { x, y });
    });

    graphSvg.innerHTML = '';

    edges.forEach((edge) => {
        if (edge.from > edge.to) return;
        const fromPos = nodePositions.get(edge.from);
        const toPos = nodePositions.get(edge.to);
        const isInPath = path.includes(edge.from) && path.includes(edge.to) && Math.abs(path.indexOf(edge.from) - path.indexOf(edge.to)) === 1;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromPos.x);
        line.setAttribute('y1', fromPos.y);
        line.setAttribute('x2', toPos.x);
        line.setAttribute('y2', toPos.y);
        line.setAttribute('stroke', isInPath ? '#22c55e' : '#818cf8');
        line.setAttribute('stroke-width', isInPath ? '5' : '3');
        line.setAttribute('opacity', isInPath ? '1' : '0.65');
        graphSvg.appendChild(line);

        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', midX);
        text.setAttribute('y', midY - 8);
        text.setAttribute('fill', '#cbd5e1');
        text.setAttribute('font-size', '14');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = edge.cost;
        graphSvg.appendChild(text);
    });

    nodeIds.forEach((node) => {
        const pos = nodePositions.get(node);
        const isPath = path.includes(node);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', isPath ? '#22c55e' : '#0f172a');
        circle.setAttribute('stroke', isPath ? '#a7f3d0' : '#38bdf8');
        circle.setAttribute('stroke-width', isPath ? '5' : '3');
        graphSvg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y + 6);
        text.setAttribute('fill', '#f8fafc');
        text.setAttribute('font-size', '18');
        text.setAttribute('font-weight', '700');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = node;
        graphSvg.appendChild(text);
    });
}

runButton.addEventListener('click', () => {
    const edgesText = document.getElementById('edges').value;
    const start = document.getElementById('start').value.trim();
    const goal = document.getElementById('goal').value.trim();

    const graph = parseGraph(edgesText);
    const result = dijkstra(graph, start, goal);

    if (result.path.length === 0) {
        output.textContent = `No path found from ${start} to ${goal}.`;
        buildVisualization(graph, []);
        return;
    }

    output.textContent = `Shortest path from ${start} to ${goal}: ${result.path.join(' -> ')}\nTotal cost: ${result.cost}`;
    buildVisualization(graph, result.path);
});
