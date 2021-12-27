import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import withTheme from './withTheme'
import MiniDrawer from './MiniDrawer'
import ItineraryReminder from './ItineraryReminder'

const Home = lazy(() => import('../pages/HomePage/Home'))
const PurchaseRecordsAccordion = lazy(() => import('../pages/PurchaseRecordsAccordion/PurchaseRecordsAccordion'))
const ConsultationManage = lazy(() => import('../pages/ConsultationManage/ConsultationMange'))

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <MiniDrawer />
        <ItineraryReminder />

        <Box component="main" sx={{ flexGrow: 1, p: 2, px: { sm: 4 }, minWidth: 0 }}>
          <Suspense fallback={null}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/purchase-record" element={<PurchaseRecordsAccordion />} />
              <Route exact path="/consultation" element={<ConsultationManage />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </Router>
  )
}

export default withTheme(App)