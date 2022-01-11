import React from 'react'
import Box from '@mui/material/Box'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import EventList from './EventList'
import EventPool from './EventPool'

const DemoApp = () => {

  return (
    <Box className="calendar-page" sx={{
      display: 'flex',
      width: '90%',
      p: 2,
      m: '0 auto',
      '& .fc-media-screen': {
        flexGrow: 1,
      },
      '& .fc-event-wrapper': {
        my: 1,
      },
      '& .fc-event': {
        borderRadius: '0.5rem',
        color: 'text.light',
        borderColor: 'primary.main',
        bgcolor: 'primary.main',
      },
    }}>
      <Box sx={{ flex: '0 0 25%', minWidth: 0 }}>
        <EventList />
        <EventPool />
      </Box>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        droppable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
      />
    </Box>
  )

}

export default DemoApp


