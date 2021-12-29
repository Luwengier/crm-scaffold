import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { principals, principalMapping, consultationCategories, consultationMapping, propertyTags } from './dummyData'

const IMPORTANT_LEVEL_IDS = ['pt2', 'pt3', 'pt4']

const IMPORTANT_LEVELS = [
  { id: 'pt2', name: '重要' },
  { id: 'pt3', name: '一般' },
  { id: 'pt4', name: '次要' },
]

function CreatePopover(props) {
  const theme = useTheme()
  const [value, setValue] = useState(undefined)
  const [creatingConsultation, setCreatingConsultation] = useState({ propertyTags: [{ id: 'pt3', name: '一般' }] })

  console.log(value)
  console.log(creatingConsultation)

  const onImportantLevelRadio = targetTag => () => {
    if (creatingConsultation.propertyTags.some(item => item.id === targetTag.id)) return
    const clearedPropertyTag = creatingConsultation.propertyTags.filter(item => !IMPORTANT_LEVEL_IDS.includes(item.id))

    setCreatingConsultation((prev) => ({
      ...prev,
      propertyTags: [...clearedPropertyTag, targetTag]
    }))

  }

  const onTagToggle = targetTag => () => {
    setCreatingConsultation((prev) => ({
      ...prev,
      propertyTags: prev.propertyTags.some(item => item.id === targetTag.id)
        ? prev.propertyTags.filter(item => item.id !== targetTag.id)
        : [...prev.propertyTags, targetTag]
    }))
  }

  const onPrincipalChange = e => {
    setCreatingConsultation((prev) => ({
      ...prev,
      principal: {
        ...prev.principal,
        id: e.target.value,
        name: principalMapping[e.target.value]
      },
    }))
  }

  const onCategoryChange = e => {
    setCreatingConsultation((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        id: e.target.value,
        name: consultationMapping[e.target.value]
      },
    }))
  }

  const onRemindChange = name => newValue => {
    if (newValue instanceof Date && !isNaN(newValue)) {
      setCreatingConsultation((prev) => ({
        ...prev,
        [name]: new Date(newValue),
      }))
    } else {
      setCreatingConsultation((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const renderPrincipalOptions = principals => {
    return principals.map(principal => (
      <MenuItem value={principal.id} key={principal.id}>
        {principal.name}
      </MenuItem>
    ))
  }

  const renderCategoryOptions = categories => {
    return categories.map(category => (
      <MenuItem value={category.id} key={category.id}>
        {category.name}
      </MenuItem>
    ))
  }

  const judgeActive = targetTag => {
    return creatingConsultation.propertyTags.some(item => item.id === targetTag.id) ? 'active' : ''
  }

  const renderTagBtn = propertyTags => {
    return propertyTags.map(propertyTag => {
      const active = creatingConsultation.propertyTags.some(item => item.id === propertyTag.id)
        ? 'active'
        : ''
      return (
        <Chip className={active} key={propertyTag.id} label={propertyTag.name} size="small" onClick={onTagToggle(propertyTag)} />
      )
    })
  }

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
          width: '90%',
          maxWidth: 350,
          bgcolor: 'background.light',
          '& .MuiTextField-root': {
            my: 1,
            width: '100%',
            '&.last-one': {
              mb: 2,
            }
          },
        },
      }}
    >
      <Typography variant="h6" sx={{
        color: 'primary.light',
        fontWeight: 'bold',
        textAlign: 'left',
        mb: 0.25,
      }}
      >
        新增諮詢
      </Typography>

      <TextField
        label="負責人"
        select
        variant="outlined"
        onChange={onPrincipalChange}
        value={(creatingConsultation.principal && creatingConsultation.principal.id) || ''}
      >
        <MenuItem value="" disabled>負責人</MenuItem>
        {renderPrincipalOptions(principals)}
      </TextField>

      <TextField
        label="類別"
        select
        variant="outlined"
        onChange={onCategoryChange}
        value={(creatingConsultation.category && creatingConsultation.category.id) || ''}
      >
        <MenuItem value="" disabled>選擇類別</MenuItem>
        {renderCategoryOptions(consultationCategories)}
      </TextField>

      <DateTimePicker
        renderInput={(props) => <TextField variant="outlined" {...props} />}
        label="提醒時間"
        value={creatingConsultation.remindStart}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        onChange={onRemindChange('remindStart')}
      />

      <DateTimePicker
        renderInput={(props) => <TextField className="last-one" variant="outlined" {...props} />}
        label="提醒時間"
        value={value}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />

      <TextareaAutosize
        maxRows={10}
        minRows={7}
        style={{
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
          padding: '0.375rem 0.75rem',
          borderColor: 'rgba(0, 0, 0, 0.23)',
          borderRadius: theme.shape.borderRadius,
          outlineColor: theme.palette.primary.main,
        }}
      />

      <Stack className="chip-wrapper" direction="row" sx={{
        mt: 0.5,
        mb: 1.5,
        mx: -0.5,
        flexWrap: 'wrap',
        '& .toggle-wrapper': {
          px: 0.5,
          mx: 0.5,
          borderRadius: '1rem',
          border: `1px dashed ${theme.palette.text.fade}`,
          // '& .MuiChip-root:last-of-type': {
          //   mr: 0
          // },
        },
        '& .MuiChip-root': {
          px: 1,
          my: 0.75,
          mx: 0.5,
          bgcolor: 'text.lighter',
        },
        '& .MuiChip-root.active': {
          color: 'text.light',
          bgcolor: 'text.mid',
          '&.red-chip': {
            bgcolor: 'jewelry.red',
          },
          '&.dark-blue-chip': {
            bgcolor: 'jewelry.darkBlue',
          },
          '&.blue-chip': {
            bgcolor: 'jewelry.blue',
          },
          '&.light-blue-chip': {
            bgcolor: 'jewelry.lightBlue',
          },
        },

      }}>
        <Chip label="緊急" size="small"
          onClick={onTagToggle({ id: 'pt1', name: '緊急' })}
          className={`red-chip ${judgeActive({ id: 'pt1', name: '緊急' })}`}
        />
        <Box className="toggle-wrapper">
          <Chip label="重要" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[0])}
            className={`dark-blue-chip ${judgeActive(IMPORTANT_LEVELS[0])}`}
          />
          <Chip label="一般" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[1])}
            className={`blue-chip ${judgeActive(IMPORTANT_LEVELS[1])}`}
          />
          <Chip label="次要" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[2])}
            className={`light-blue-chip ${judgeActive(IMPORTANT_LEVELS[2])}`}
          />
        </Box>
        {renderTagBtn(propertyTags)}
      </Stack>

      <Button variant="contained" color="secondary" sx={{ mt: 2, mb: 1, '&:hover': { bgcolor: 'secondary.light' } }}>
        確認
      </Button>
    </Popover>
  )
}


// setCreatingConsultation((prev) => ({
//   ...prev,
//   propertyTags: prev.propertyTags && prev.propertyTags[propertyTag.id]
//     ? omit(prev.propertyTags, propertyTag.id)
//     : {
//       ...prev.propertyTags,
//       [propertyTag.id]: prev.propertyTags
//         ? !prev.propertyTags[propertyTag.id]
//         : true,
//     }
// }))

export default CreatePopover
