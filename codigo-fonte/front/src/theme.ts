import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    // Colors
    colorPrimary: '#1DA1F2', // A nice blue, for example
    colorSuccess: '#17BF63',
    colorWarning: '#FFAD1F',
    colorError: '#E0245E',
    colorInfo: '#1DA1F2',

    // Fonts
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,

    // Border Radius
    borderRadius: 8,
  },
  components: {
    Button: {
      colorPrimary: '#1DA1F2',
      algorithm: true, // Enable algorithm for theme derivatives
    },
    Menu: {
      darkItemBg: '#0E141B',
      darkItemSelectedBg: '#1DA1F2',
    },
  },
};

export default theme;
