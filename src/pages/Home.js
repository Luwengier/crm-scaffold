import React from 'react'
import { Box, Grid, Skeleton } from '@mui/material'
import MiniDrawer from '../components/MiniDrawer'
import ItineraryReminder from '../components/ItineraryReminder'

function ContentSkeleton(props) {
  const { displayNumber = 3 } = props
  return (
    <Grid container>
      {Array.from(new Array(displayNumber)).map((item, index) => (
        <Grid item xl={2} md={3} xs={6} key={index} sx={{ my: 4, px: 1 }}>
          <Skeleton variant="rectangular" animation="wave" height={118} />

          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default function Home() {

  return (
    <Box sx={{ display: 'flex' }}>
      <MiniDrawer />
      <ItineraryReminder />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <ContentSkeleton displayNumber={18} />
      </Box>
    </Box>
  )
}



