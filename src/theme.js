import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e3f9f6',
      100: '#c8ece8',
      200: '#a1dfd8',
      300: '#6ecfc3',
      400: '#3cbfae',
      500: '#15a695',
      600: '#108679',
      700: '#0b665d',
      800: '#064541',
      900: '#012526',
    },
  },
});

export default theme;
