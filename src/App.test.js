import { render } from '@testing-library/react';
import App from './App';

test('renders Tree Visualizer without crashing', () => {
  // Mock ResizeObserver which is required by @xyflow/react in test env.
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  render(<App />);
});

