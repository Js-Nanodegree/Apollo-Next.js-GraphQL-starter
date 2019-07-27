/* eslint-disable no-underscore-dangle */

import {
  createGenerateClassName,
  createMuiTheme
} from '@material-ui/core/styles';

import { SheetsRegistry } from 'jss';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#61949F',
      main: '#366E7B',
      dark: '#1F515F',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#FFFFFF'
    },
    secondary: {
      light: '#6CDDFF',
      main: '#39D2FF',
      dark: '#1FCCFF'
    }
  },
  shape: {
    borderRadius: 3
  },
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    htmlFontSize: 10,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: '4.4rem'
    },
    h5: {
      fontWeight: 300,
      fontSize: '1.5rem',
      lineHeight: 1.33,
      letterSpacing: '0em'
    },
    button: {
      fontSize: '1.4rem'
    },
    useNextVariants: true
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName({
      dangerouslyUseGlobalCSS: true,
      snapshot: process.env.NODE_ENV === 'test'
    })
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
