import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Fab, Badge, TextField, TextareaAutosize, Typography, Popover, Paper, Button, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import DateTimePicker from '@mui/lab/DateTimePicker'
import MyCalendarPicker from './MyCalendarPicker'
import ItineraryGroup from './ItineraryGroup'

export default function ItineraryReminder() {
  const [listAnchorEl, setListAnchorEl] = useState(null)
  const [createAnchorEl, setCreateAnchorEl] = useState(null)
  const [value, setValue] = React.useState(new Date())
  const theme = useTheme()

  const handleListClick = (event) => {
    setListAnchorEl(event.currentTarget)
  }

  const handleListClose = () => {
    setListAnchorEl(null)
  }

  const handleCreateClick = (event) => {
    setCreateAnchorEl(event.currentTarget)
  }

  const handleCreateClose = () => {
    setCreateAnchorEl(null)
  }

  const listOpen = Boolean(listAnchorEl)
  const createOpen = Boolean(createAnchorEl)

  return (
    <React.Fragment>
      <Box
        className='fab-wrapper'
        sx={{
          position: 'fixed',
          left: 28,
          bottom: 24,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          // 需介於1200至1300之間
          zIndex: 1250,
        }}
      >
        <Fab
          size="small"
          onClick={handleCreateClick}
          sx={{
            mb: 1.5,
            boxShadow: 1,
            bgcolor: 'background.paper',
          }}
        >
          <AddIcon sx={{ color: 'text.disabled' }} />
        </Fab>

        <Fab onClick={handleListClick}>
          <Badge
            badgeContent={'n'}
            color="primary"
            sx={{ '& .MuiBadge-badge': { color: '#ffffff' } }}
          >
            <TextSnippetIcon />
          </Badge>
        </Fab>
      </Box>

      <Popover
        open={createOpen}
        onClose={handleCreateClose}
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
            // '& .MuiInputLabel-root.Mui-focused': {
            //   color: 'secondary.main',
            // },
            // '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            //   borderColor: 'secondary.main',
            // },
          },
        }}
      >

        <Paper sx={{ p: 2, overflow: 'hidden', flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.light',
              fontWeight: 'bold',
            }}
          >
            新增提醒
          </Typography>
          <TextField id="standard-basic" label="會員姓名 *" variant="standard" />

          <TextField id="standard-basic" label="寵物名" variant="standard" />

          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="提醒時間"
            value={value}
            inputFormat="yyyy/MM/dd hh:mm a"
            mask="___/__/__ __:__ _M"
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />

          <TextareaAutosize
            minRows={10}
            maxRows={10}
            style={{ width: '100%', minWidth: '100%', maxWidth: '100%', maxHeight: 200, outlineColor: theme.palette.primary.main }}
          />
        </Paper>
        <Box sx={{ textAlign: 'center', pt: 2, pb: 1 }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCreateClose}
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
      </Popover>

      <Popover
        open={listOpen}
        onClose={handleListClose}
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
            p: 2,
            bgcolor: 'rgb(253 254 255 / 75%)',
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
            onClick={handleListClose}
            sx={{
              fontWeight: 'bold',
              color: 'grey.700',
              '&:hover': {
                bgcolor: 'secondary.light',
              },
            }}
          >
            取消
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  )
}
