function getVisibleChildren(node, collapsedSet) {
  if (!node || !Array.isArray(node.children)) return [];
  if (collapsedSet && collapsedSet.has(node.id)) return [];
  return node.children;
}

export function calculateLayout(node, collapsedSet, depth = 0, startX = 0) {
  const y = depth * 150;

  const visibleChildren = getVisibleChildren(node, collapsedSet);
  const isLeaf = visibleChildren.length === 0;

  // Leaf node: width is 1 slot
  if (isLeaf) {
    return {
      positions: [{ id: node.id, x: startX, y }],
      width: 1
    };
  }

  // Recursively lay out children
  let currentX = startX;
  const childPositions = [];
  const childWidths = [];

  for (const child of visibleChildren) {
    const result = calculateLayout(child, collapsedSet, depth + 1, currentX);
    childPositions.push(...result.positions);
    childWidths.push(result.width);

    currentX += result.width * 200;
  }

  // Center parent over children group.
  const firstChild = visibleChildren[0];
  const lastChild = visibleChildren[visibleChildren.length - 1];

  const firstChildPos = childPositions.find((p) => p.id === firstChild.id);
  const lastChildPos = childPositions
    .slice()
    .reverse()
    .find((p) => p.id === lastChild.id);

  const parentX = firstChildPos && lastChildPos ? (firstChildPos.x + lastChildPos.x) / 2 : startX;

  return {
    positions: [{ id: node.id, x: parentX, y }, ...childPositions],
    width: childWidths.reduce((a, b) => a + b, 0)
  };
}

