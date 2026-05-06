
import { calculateLayout } from './layoutUtils';
import { treeData } from './treeData';

function getVisibleChildren(node, collapsedSet) {
  if (!node || !Array.isArray(node.children)) return [];
  if (collapsedSet && collapsedSet.has(node.id)) return [];
  return node.children;
}

function getNodeDepth(targetId, node, depth = 0) {
  if (node.id === targetId) return depth;
  for (const child of node.children || []) {
    const found = getNodeDepth(targetId, child, depth + 1);
    if (found !== -1) return found;
  }
  return -1;
}

export function buildGraph(collapsedSet, toggleNode, hoveredId = null, searchTerm = '') {
  const { positions } = calculateLayout(treeData, collapsedSet, 0, 0);
  const posMap = new Map(positions.map((p) => [p.id, { x: p.x, y: p.y }]));

  const nodes = [];
  const edges = [];
  const term = (searchTerm || '').trim().toLowerCase();

  const walk = (node) => {
    if (!node) return;

    const isCollapsed = collapsedSet && collapsedSet.has(node.id);
    const visibleChildren = getVisibleChildren(node, collapsedSet);
    const p = posMap.get(node.id) || { x: 0, y: 0 };

    const isHovered = node.id === hoveredId;
    const matchesSearch = term && node.label?.toLowerCase?.().includes(term);
    const hasChildren = node.children && node.children.length > 0;
    const nodeDepth = getNodeDepth(node.id, treeData);
    const childCount = node.children?.length || 0;

    let bg = '#1e293b';
    let textColor = 'white';
    let shadow = 'none';
    let border = '1px solid #334155';

    if (matchesSearch) {
      bg = '#f59e0b';
      textColor = 'black';
      shadow = '0 0 14px #f59e0b88';
      border = '1px solid #d97706';
    } else if (isHovered) {
      bg = '#3b82f6';
      textColor = 'white';
      shadow = '0 0 14px #3b82f688';
      border = '1px solid #2563eb';
    }

    const metaColor = matchesSearch ? '#78350f' : '#94a3b8';
    const metaBorder = matchesSearch ? '#d97706' : '#1e3a5f';

    nodes.push({
      id: node.id,
      position: { x: p.x, y: p.y },
      data: {
        label: (
          <div style={{ fontFamily: 'sans-serif', minWidth: 110 }}>

            {/* Node Name */}
            <div style={{ fontWeight: 700, fontSize: 14 }}>{node.label}</div>

            {/* Metadata — always visible, fixed size, no blink */}
            <div style={{
              marginTop: 5,
              fontSize: 10,
              color: metaColor,
              lineHeight: 1.7,
              borderTop: `1px solid ${metaBorder}`,
              paddingTop: 4,
              textAlign: 'left',
            }}>
              <div>Depth: <b>{nodeDepth}</b></div>
              <div>Children: <b>{childCount}</b></div>
            </div>

            {/* Toggle Button */}
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                title={isCollapsed ? 'Expand' : 'Collapse'}
                style={{
                  marginTop: 6,
                  cursor: 'pointer',
                  background: isCollapsed ? '#22c55e22' : '#ef444422',
                  color: isCollapsed ? '#86efac' : '#fca5a5',
                  border: `1px solid ${isCollapsed ? '#22c55e' : '#ef4444'}`,
                  borderRadius: 6,
                  padding: '2px 12px',
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: '20px',
                }}
              >
                {isCollapsed ? '+' : '−'}
              </button>
            )}

          </div>
        ),
      },
      style: {
        background: bg,
        color: textColor,
        border,
        borderRadius: '10px',
        padding: '10px 16px',
        minWidth: '110px',
        textAlign: 'center',
        boxShadow: shadow,
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
      },
    });

    if (isCollapsed) return;

    for (const child of visibleChildren) {
      edges.push({
        id: `${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
        type: 'smoothstep',
        style: { stroke: '#475569', strokeWidth: 2 },
      });
      walk(child);
    }
  };

  walk(treeData);
  return { nodes, edges };
}