import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

function EventCard() {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton className="delete-btn" aria-label="settings" size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <Box>
        <Typography noWrap>
          Shrimp and Chorizo Paella rtertrtret
        </Typography>
      </Box>
    </Card>
  )
}

export default EventCard
