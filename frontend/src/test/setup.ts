import '@testing-library/jest-dom';
import { vi, expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  vi.clearAllMocks();
});
