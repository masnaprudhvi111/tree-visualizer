

import { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { buildGraph } from './buildGraph';

function TreeFlow() {
  const [collapsed, setCollapsed] = useState(new Set());
  const [hoveredId, setHoveredId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { fitView } = useReactFlow();

  const toggleNode = useCallback(
    (id) => {
      setCollapsed((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
      setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 50);
    },
    [fitView]
  );

  const { nodes, edges } = useMemo(() => {
    return buildGraph(collapsed, toggleNode, hoveredId, searchTerm);
  }, [collapsed, toggleNode, hoveredId, searchTerm]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0f172a', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 16, left: 16,
        color: 'white', fontWeight: 800, zIndex: 10, fontSize: 20,
      }}>
        🌳 Tree Visualizer
      </div>

      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search nodes..."
          style={{
            background: 'white', padding: '8px 12px',
            borderRadius: 8, border: '1px solid #cbd5e1',
            width: 220, fontSize: 14,
          }}
        />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        onNodeMouseEnter={(_, node) => setHoveredId(node.id)}
        onNodeMouseLeave={() => setHoveredId(null)}
      >
        <Background color="#1e293b" gap={24} />
        <Controls />
        <MiniMap nodeColor="#1e293b" maskColor="#0f172a99" />
      </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <TreeFlow />
    </ReactFlowProvider>
  );
}