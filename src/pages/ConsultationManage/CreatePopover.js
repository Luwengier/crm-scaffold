import React, { useState } from 'react'
import { omit } from 'lodash-es'
import { useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { v4 as uuidv4 } from 'uuid'
import { principals, principalMapping, consultationCategories, consultationMapping, minorPropertyTags, IMPORTANT_LEVELS, IMPORTANT_LEVEL_IDS } from './dummyData'

const INITIAL_STATE = {
  remindStart: null,
  remindEnd: null,
  propertyTags: [{ id: 'pt3', name: '一般' }],
}

function CreatePopover({ setConsultations, consultations, onClose, ...restProps }) {
  const theme = useTheme()
  const [errors, setErrors] = useState({})
  const [creatingConsultation, setCreatingConsultation] = useState(INITIAL_STATE)

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
    setErrors(omit(errors, 'principal'))
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
    setErrors(omit(errors, 'category'))
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
    setErrors(omit(errors, name))
    setCreatingConsultation((prev) => ({
      ...prev,
      [name]: newValue,
    }))
    // if (newValue instanceof Date && !isNaN(newValue)) {
    //   setErrors(omit(errors, name))
    //   setCreatingConsultation((prev) => ({
    //     ...prev,
    //     [name]: new Date(newValue).getTime(),
    //   }))
    // } else {
    //   setCreatingConsultation((prev) => ({
    //     ...prev,
    //     [name]: null,
    //   }))
    // }
  }

  const onTextChange = e => {
    setErrors(omit(errors, 'text'))
    setCreatingConsultation((prev) => ({
      ...prev,
      text: e.target.value,
    }))
  }

  const validateConsultation = () => {
    const newErrors = {}
    if (!creatingConsultation.principal) newErrors.principal = '負責人為必填'
    if (!creatingConsultation.category) newErrors.category = '類別為必填'
    if (!creatingConsultation.text) newErrors.text = '文字內容為必填'
    // if (creatingConsultation.remindEnd && creatingConsultation.remindStart && (creatingConsultation.remindEnd < creatingConsultation.remindStart)) {
    //   newErrors.remindEnd = '提醒結束時間早於開始時間'
    // }

    if (!creatingConsultation.remindStart) {
      newErrors.remindStart = '提醒開始時間為必填'
    } else if (!(creatingConsultation.remindStart instanceof Date) || isNaN(creatingConsultation.remindStart)) {
      newErrors.remindStart = '時間格式錯誤'
    }
    if (creatingConsultation.remindEnd && (
      !(creatingConsultation.remindEnd instanceof Date) || isNaN(creatingConsultation.remindEnd)
    )) {
      newErrors.remindEnd = '時間格式錯誤，若無需要請清空'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length > 0
  }

  const onConfirmClick = () => {
    if (validateConsultation()) return
    const newConsultations = [
      {
        ...creatingConsultation,
        id: uuidv4(),
        isExpanded: true,
        remindStart: new Date(creatingConsultation.remindStart).getTime(),
        remindEnd: creatingConsultation.remindEnd ? new Date(creatingConsultation.remindEnd).getTime() : null,
      },
      ...consultations,
    ]
    setConsultations(newConsultations)
    setCreatingConsultation(INITIAL_STATE)
    onClose()
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

  const renderMinorTagBtn = minorPropertyTags => {
    return minorPropertyTags.map(propertyTag => {
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
      {...restProps}
      onClose={onClose}
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
          '& .MuiFormHelperText-root': {
            mx: 1.75,
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
        label="負責人 *"
        select
        variant="outlined"
        error={Boolean(errors.principal)}
        helperText={errors.principal}
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
        error={Boolean(errors.category)}
        helperText={errors.category}
        onChange={onCategoryChange}
        value={(creatingConsultation.category && creatingConsultation.category.id) || ''}
      >
        <MenuItem value="" disabled>選擇類別</MenuItem>
        {renderCategoryOptions(consultationCategories)}
      </TextField>

      <DateTimePicker
        renderInput={(props) => <TextField {...props} error={Boolean(errors.remindStart || props.error)} helperText={errors.remindStart} variant="outlined" />}
        minutesStep={5}
        label="提醒開始時間"
        value={creatingConsultation.remindStart}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        onChange={onRemindChange('remindStart')}
        maxDateTime={creatingConsultation.remindEnd && new Date(creatingConsultation.remindEnd)}
      />

      <DateTimePicker
        renderInput={(props) => <TextField helperText={errors.remindEnd} className="last-one" variant="outlined" {...props} />}
        minutesStep={5}
        label="提醒結束時間"
        value={creatingConsultation.remindEnd}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        onChange={onRemindChange('remindEnd')}
        minDateTime={creatingConsultation.remindStart && new Date(creatingConsultation.remindStart)}
      />
      {/* {errors.remindEnd && (<FormHelperText error>{errors.remindEnd}</FormHelperText>)} */}

      <TextareaAutosize
        value={creatingConsultation.text || ''}
        placeholder="請輸入文字內容"
        onChange={onTextChange}
        maxRows={10}
        minRows={7}
        style={{
          display: 'block',
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
          padding: '0.375rem 0.75rem',
          borderColor: errors.text ? theme.palette.error.main : 'rgba(0, 0, 0, 0.23)',
          borderRadius: theme.shape.borderRadius,
          outlineColor: theme.palette.primary.main,
        }}
      />
      {errors.text && (<FormHelperText error>{errors.text}</FormHelperText>)}

      <Stack className="chip-wrapper" direction="row" sx={{
        mt: 2,
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
        <Chip label="急" size="small"
          onClick={onTagToggle({ id: 'pt1', name: '急' })}
          className={`red-chip ${judgeActive({ id: 'pt1', name: '急' })}`}
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
        {renderMinorTagBtn(minorPropertyTags)}
      </Stack>

      <Button
        variant="contained"
        color="secondary"
        onClick={onConfirmClick}
        sx={{ mt: 2, mb: 1, '&:hover': { bgcolor: 'secondary.light' } }}
      >
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
