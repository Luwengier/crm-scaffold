import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import DateTimePicker from '@mui/lab/DateTimePicker'

function CreatePopover(props) {
  const [value, setValue] = useState(new Date())

  return (
    <Popover
      {...props}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          p: 2,
          textAlign: 'center',
          width: '20rem',
          '& .MuiTextField-root': {
            my: 1,
            width: '100%',
          },
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: 'primary.light', fontWeight: 'bold', textAlign: 'left' }}
      >
        新增諮詢
      </Typography>
      <TextField label="Outlined" variant="outlined" />
      <TextField label="負責人" variant="outlined" />
      <TextField label="類別" variant="outlined" />
      <DateTimePicker
        renderInput={(props) => <TextField variant="outlined" {...props} sx={{ mt: 1 }} />}
        label="提醒時間"
        value={value}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      <DateTimePicker
        renderInput={(props) => <TextField variant="outlined" {...props} sx={{ mt: 1 }} />}
        label="提醒時間"
        value={value}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      <Button variant="contained" color="secondary" sx={{ mt: 2, mb: 1 }}>確認</Button>
    </Popover>
  )
}

export default CreatePopover
