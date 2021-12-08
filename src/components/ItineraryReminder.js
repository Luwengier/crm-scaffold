import React, { useState } from 'react'
import { Fab, Badge, Popover, Button, Box } from '@mui/material'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import MyCalendarPicker from './MyCalendarPicker'
import ItineraryGroup from './ItineraryGroup'

export default function ItineraryReminder() {
  const [anchorEl, setAnchorEl] = useState(null)

  console.log(window)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <Fab
        onClick={handleClick}
        sx={{
          position: 'fixed',
          left: 24,
          bottom: 24,
          // 需介於1200至1300之間
          zIndex: 1250,
        }}
      >
        <Badge
          badgeContent={'n'}
          color="primary"
          sx={{
            '& .MuiBadge-badge': { color: '#ffffff' },
          }}
        >
          <TextSnippetIcon />
        </Badge>
      </Fab>

      <Popover
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        // anchorEl={}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'left',
        // }}
        // transformOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'left',
        // }}
        marginThreshold={0}
        PaperProps={{
          sx: {
            zIndex: 1400,
            height: '100%',
            maxHeight: '100%',
            width: 360,
            padding: '1rem',
            bgcolor: 'rgb(235 240 242 / 66%)',
          },
        }}
      >
        <MyCalendarPicker sx={{ mb: 3 }} />
        <ItineraryGroup title="今天" data={Array.from(new Array(5))} />
        <ItineraryGroup title="明天" />
        <ItineraryGroup title="後天" />

        <Box sx={{ textAlign: 'center', pt: 3, pb: 2 }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleClose}
            sx={{ fontWeight: 'bold', color: 'grey.700' }}
          >
            取消
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  )
}
