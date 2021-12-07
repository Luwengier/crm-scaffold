import React from 'react'
import Box from '@mui/material/Box'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CalendarPicker from '@mui/lab/CalendarPicker'

export default function MyCalendarPicker() {
  const [date, setDate] = React.useState(new Date())

  return (
    <Box sx={{
      '& .MuiCalendarPicker-root': { width: 'auto' }
    }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker
          date={date}
          onChange={(newDate) => setDate(newDate)}
          styles={{ width: 'auto' }}
        />
      </LocalizationProvider>
    </Box>
  )
}
