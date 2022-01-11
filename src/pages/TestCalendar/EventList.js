import React from 'react'
import Box from '@mui/material/Box'
import { useTheme, alpha } from '@mui/material/styles'

import EventCard from './EventCard'

function EventList() {
  const theme = useTheme()


  return (
    <Box sx={{
      px: 2,
      pt: 2,
      pb: 4,
      position: 'relative',
      bgcolor: alpha(theme.palette.primary.light, 0.25),
      '& .MuiCardHeader-content': {
        minWidth: 0,
      },
      // '& .delete-btn': {
      //   top: 0,
      //   right: 0,
      //   position: 'absolute',
      //   transform: 'translate(-25%, 0%)',
      // },
    }}>
      <EventCard />
    </Box>
  )
}

export default EventList
