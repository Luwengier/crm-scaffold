import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'

function EventCard() {
  return (
    <Card>
      <CardHeader
        action={
          <React.Fragment>
            <IconButton className="delete-btn" aria-label="settings" size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
            <IconButton className="delete-btn" aria-label="settings" size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        titleTypographyProps={{
          noWrap: true,
          variant: 'h6',
          title: 'Shrimp and Chorizo Paella',
        }}
      />
      <Box className="card-content">
        <Typography>
          Here is some content or detail about event.
        </Typography>
      </Box>
    </Card>
  )
}

export default EventCard
