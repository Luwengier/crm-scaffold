import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import withCustomizedTheme from './withCustomizedTheme'

const Home = lazy(() => import('../pages/Home'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default withCustomizedTheme(App)