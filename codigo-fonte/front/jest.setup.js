// Mock next/config
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    API_URL: 'http://localhost:4000',
  },
}));

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(() => null), // simula usuário não logado
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
});

// Mock backend API
jest.mock('../lib/api', () => ({
  apiLogout: jest.fn(),
}));
