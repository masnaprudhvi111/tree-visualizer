export const treeData = {
  id: 'root',
  label: 'Root',
  children: [
    {
      id: 'A',
      label: 'A',
      children: [
        { id: 'A1', label: 'A1', children: [] },
        { id: 'A2', label: 'A2', children: [] }
      ]
    },
    {
      id: 'B',
      label: 'B',
      children: [
        { id: 'B1', label: 'B1', children: [] },
        { id: 'B2', label: 'B2', children: [] }
      ]
    },
    {
      id: 'C',
      label: 'C',
      children: [
        {
          id: 'C1',
          label: 'C1',
          children: [
            { id: 'C1a', label: 'C1a', children: [] },
            { id: 'C1b', label: 'C1b', children: [] }
          ]
        },
        { id: 'C2', label: 'C2', children: [] }
      ]
    }
  ]
};

