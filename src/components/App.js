import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import withTheme from './withTheme'
import MiniDrawer from './MiniDrawer'
import ItineraryReminder from './ItineraryReminder'

const Home = lazy(() => import('../pages/Home'))
const ConsultationAccordion = lazy(() => import('../pages/ConsultationAccordion/ConsultationAccordion'))

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <MiniDrawer />
        <ItineraryReminder />

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, minWidth: 0 }}>
          <Suspense fallback={null}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/consultation" element={<ConsultationAccordion />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </Router>
  )
}

export default withTheme(App)