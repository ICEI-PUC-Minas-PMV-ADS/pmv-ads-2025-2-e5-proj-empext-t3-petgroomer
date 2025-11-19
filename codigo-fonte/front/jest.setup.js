jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    API_URL: 'http://localhost:4000',
  },
}));
