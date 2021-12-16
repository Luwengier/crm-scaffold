import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { TextField, TextareaAutosize, Typography, Popover, Paper, Button, Box, MenuItem } from '@mui/material'
import DateTimePicker from '@mui/lab/DateTimePicker'

export default function ItineraryCreatePopover(props) {
  const { open, onClose } = props
  const [value, setValue] = useState(new Date())
  const [reminderType, setReminderType] = useState('')
  const theme = useTheme()

  const handleChange = (event) => {
    setReminderType(event.target.value)
  }

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: 0 }}
      marginThreshold={0}
      PaperProps={{
        sx: {
          p: 2,
          width: 360,
          zIndex: 1400,
          height: '100%',
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgb(253 254 255 / 75%)',
          '& .MuiTextField-root': {
            width: '100%',
            mb: 4,
          },
          '& .MuiTextField-root:first-of-type': {
            mt: 1,
          },
          // '& .date-input': {
          //   mt: 1,
          //   width: '100%',
          //   border: 'none',
          //   color: '#212121',
          //   borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
          //   fontSize: '1rem',
          //   fontFamily: 'Roboto',
          //   lineHeight: '1.625em',
          //   outlineColor: theme.palette.primary.main,
          // },
          // '& .MuiInputLabel-root.Mui-focused': {
          //   color: 'secondary.main',
          // },
          // '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          //   borderColor: 'secondary.main',
          // },
        },
      }}
    >

      <Paper sx={{ p: 2, overflow: 'hidden', flexGrow: 1, boxShadow: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{ color: 'primary.light', fontWeight: 'bold' }}
          >
            新增提醒
          </Typography>

          <TextField id="standard-basic" label="客戶姓名 *" variant="standard" />

          <TextField id="standard-basic" label="寵物名" variant="standard" />

          <TextField
            id="outlined-select-currency"
            select
            variant="standard"
            label="提醒類別"
            value={reminderType}
            onChange={handleChange}
          // sx={{ mt: 2 }}
          // helperText="Please select your currency"
          >
            <MenuItem value="normal">一般</MenuItem>
            <MenuItem value="shopping">購物</MenuItem>
            <MenuItem value="complaint">客訴</MenuItem>
          </TextField>

          <DateTimePicker
            renderInput={(props) => <TextField variant="standard" {...props} sx={{ mt: 1 }} />}
            label="提醒時間"
            value={value}
            inputFormat="yyyy/MM/dd hh:mm a"
            mask="___/__/__ __:__ _M"
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />

          {/* <input className="date-input" type="datetime-local" /> */}

          <Typography variant="subtitle1" sx={{
            mt: 2,
            fontSize: '0.75rem',
            lineHeight: '1.4375em',
            letterSpacing: '0.00938em',
          }}>
            提醒內容
          </Typography>

          <TextareaAutosize
            minRows={12}
            maxRows={12}
            style={{
              width: '100%',
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: 200,
              fontSize: '1rem',
              marginBottom: theme.spacing(4),
              outlineColor: theme.palette.primary.main
            }}
          />
        </Box>

        <Box sx={{ textAlign: 'center', pt: 4, pb: 2 }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={onClose}
            sx={{
              fontWeight: 'bold',
              color: 'grey.700',
              '&:hover': {
                bgcolor: 'secondary.light',
              },
            }}
          >
            新增提醒
          </Button>
        </Box>

      </Paper>
    </Popover>
  )
}
