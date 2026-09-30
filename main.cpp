#include <algorithm>
#include <iostream>
#include <limits>
#include <queue>
#include <unordered_map>
#include <vector>

using Node = int;
using Weight = int;

struct Edge
{
    Node target;
    Weight cost;
};

using Graph = std::unordered_map<Node, std::vector<Edge>>;

std::vector<Node> dijkstra(const Graph &graph, Node start, Node goal)
{
    const Weight INF = std::numeric_limits<Weight>::max();
    std::unordered_map<Node, Weight> dist;
    std::unordered_map<Node, Node> parent;

    for (const auto &pair : graph)
    {
        dist[pair.first] = INF;
    }

    using Item = std::pair<Weight, Node>;
    std::priority_queue<Item, std::vector<Item>, std::greater<>> queue;

    dist[start] = 0;
    queue.push({0, start});

    while (!queue.empty())
    {
        auto [currentDist, current] = queue.top();
        queue.pop();

        if (currentDist > dist[current])
        {
            continue;
        }

        if (current == goal)
        {
            break;
        }

        for (const Edge &edge : graph.at(current))
        {
            Weight nextDist = currentDist + edge.cost;
            if (nextDist < dist[edge.target])
            {
                dist[edge.target] = nextDist;
                parent[edge.target] = current;
                queue.push({nextDist, edge.target});
            }
        }
    }

    std::vector<Node> path;
    if (dist[goal] == INF)
    {
        return path;
    }

    for (Node node = goal; node != start; node = parent[node])
    {
        path.push_back(node);
    }
    path.push_back(start);
    std::reverse(path.begin(), path.end());
    return path;
}

int main()
{
    Graph graph;
    graph[1] = {{2, 7}, {3, 9}, {6, 14}};
    graph[2] = {{1, 7}, {3, 10}, {4, 15}};
    graph[3] = {{1, 9}, {2, 10}, {4, 11}, {6, 2}};
    graph[4] = {{2, 15}, {3, 11}, {5, 6}};
    graph[5] = {{4, 6}, {6, 9}};
    graph[6] = {{1, 14}, {3, 2}, {5, 9}};

    Node start = 1;
    Node goal = 5;

    std::vector<Node> path = dijkstra(graph, start, goal);

    if (path.empty())
    {
        std::cout << "No path found from " << start << " to " << goal << "\n";
        return 0;
    }

    std::cout << "Shortest path from " << start << " to " << goal << ": ";
    for (size_t i = 0; i < path.size(); ++i)
    {
        std::cout << path[i];
        if (i + 1 < path.size())
        {
            std::cout << " -> ";
        }
    }
    std::cout << "\n";

    return 0;
}
Error correction & text sequencing : para-jumbles (fixed and movable), verbal clues to solve

para-jumbles, sentence completion—single and double blanks, elimination techniques. tommorow is my ca i am in 5th semester so please give me mcq on these topic with right option and explaination on each topic of btech level 