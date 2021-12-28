import React from 'react'
import { Box, Grid, Skeleton } from '@mui/material'
import TextField from '@mui/material/TextField'
import DatePicker from '@mui/lab/DatePicker'

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
  const [value, setValue] = React.useState(new Date())

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 5 },
        px: { xs: 2, sm: 4 },
      }}
    >
      <ContentSkeleton displayNumber={18} />
      <DatePicker
        views={['year', 'month', 'day']}
        label="Year and Month"
        minDate={new Date('2012-03-01')}
        maxDate={new Date('2023-06-01')}
        value={value}
        onChange={setValue}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </Box>
  )
}



