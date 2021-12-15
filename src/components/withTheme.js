import React, { useState, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMediaQuery, CssBaseline } from '@mui/material'
import { teal, amber, grey, cyan } from '@mui/material/colors'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import ColorModeContext from '../contexts/ColorModeContext'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      bg: '#c8e1df',
      main: teal[300],
      ...(mode === 'dark' && {
        main: teal[700],
      }),
    },
    secondary: {
      main: amber['A200'],
      text: amber[500],
    },
    info: {
      bg: '#edf8f9',
      main: cyan[500],
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

const withTheme = ChildComponent => {
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <ChildComponent {...props} />
          </LocalizationProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return ComposedComponent
}

export default withTheme