# Tree Visualizer

Tree Visualizer is a React app that renders a hierarchical tree using **React Flow** (@xyflow/react). It supports:

- Expand/Collapse subtrees (via + / - button on each node)
- Hover highlighting
- Search nodes by label

## Project Structure

- `src/treeData.js` — Tree structure (Root → children)
- `src/layoutUtils.js` — Layout calculation for visible nodes
- `src/buildGraph.js` — Converts the tree + collapsed/search state into React Flow `nodes` and `edges`
- `src/App.js` — Main UI and state (collapsed, hoveredId, searchTerm)

## Requirements

- Node.js (LTS recommended)
- npm

## Setup

```bash
cd tree-visualizer
npm install
```

## Run (Development)

```bash
npm start
```

Then open:
- http://localhost:3000 (or the port shown in your terminal)

## Build (Production)

```bash
npm run build
```

## Test

```bash
npm test
```

## Notes / Troubleshooting

- If you see a “Something is already running on port …” prompt, stop the previous dev server and re-run `npm start`.
- React Flow depends on `ResizeObserver` in the browser.


