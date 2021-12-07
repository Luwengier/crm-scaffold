import React, { useState, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMediaQuery, CssBaseline } from '@mui/material'
import { amber, teal, grey } from '@mui/material/colors';
import ColorModeContext from '../contexts/ColorModeContext'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      // ...amber,
      main: amber[500],
      ...(mode === 'dark' && {
        main: teal[500],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: grey[900],
        paper: grey[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
          primary: grey[900],
          secondary: grey[800],
        }
        : {
          primary: '#fff',
          secondary: grey[500],
        }),
    },
  },
})

const withCustomizedTheme = ChildComponent => {
  const ComposedComponent = props => {
    const [mode, setMode] = useState(
      useMediaQuery('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light'
    )

    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        }
      }), []
    )

    const theme = useMemo(
      () => (
        createTheme(getDesignTokens(mode))
      ), [mode]
    )

    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ChildComponent {...props} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return ComposedComponent
}

export default withCustomizedTheme