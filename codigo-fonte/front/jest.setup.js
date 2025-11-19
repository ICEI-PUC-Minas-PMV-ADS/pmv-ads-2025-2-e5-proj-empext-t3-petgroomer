// ----------------------
// Mock para next/config
// ----------------------
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    API_URL: 'http://localhost:4000',
  },
}));

// ----------------------
// Mock para next/router
// ----------------------
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// ----------------------
// Mock sessionStorage
// ----------------------
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
});

// ----------------------
// Mock backend API
// ----------------------
jest.mock('../lib/api', () => ({
  apiLogout: jest.fn(),
}));

// ----------------------
// Mock crucial para AntD Drawer
// ----------------------
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});
