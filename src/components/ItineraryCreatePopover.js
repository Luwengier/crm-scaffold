import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import FormHelperText from '@mui/material/FormHelperText'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { useConsultationForm } from '../hooks/useConsultationForm'

import { dummyMembers, principals, consultationCategories, minorPropertyTags, IMPORTANT_LEVELS } from '../pages/ConsultationManage/dummyData'

const INITIAL_STATE = {
  remindStart: null,
  remindEnd: null,
  propertyTags: [{ id: 'pt3', name: '一般' }],
}

export default function ItineraryCreatePopover(props) {
  const { open, onClose } = props
  const theme = useTheme()
  const {
    errors,
    // setErrors,
    currentMember,
    currentPet,
    creatingConsultation,
    // setCreatingConsultation,
    onImportantLevelRadio,
    onTagToggle,
    onMemberChange,
    onPetChange,
    onPrincipalChange,
    onCategoryChange,
    onRemindChange,
    onTextChange,
  } = useConsultationForm(INITIAL_STATE)

  // const validateConsultation = () => {
  //   const newErrors = {}
  //   if (!member && !currentMember) newErrors.member = '會員為必填'
  //   if (!creatingConsultation.principal) newErrors.principal = '負責人為必填'
  //   if (!creatingConsultation.category) newErrors.category = '類別為必填'
  //   if (!creatingConsultation.text) newErrors.text = '文字內容為必填'

  //   if (!creatingConsultation.remindStart) {
  //     newErrors.remindStart = '提醒開始時間為必填'
  //   } else if (!(creatingConsultation.remindStart instanceof Date) || isNaN(creatingConsultation.remindStart)) {
  //     newErrors.remindStart = '時間格式錯誤'
  //   }
  //   if (creatingConsultation.remindEnd && (
  //     !(creatingConsultation.remindEnd instanceof Date) || isNaN(creatingConsultation.remindEnd)
  //   )) {
  //     newErrors.remindEnd = '時間格式錯誤，若無需要請清空'
  //   }
  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length > 0
  // }

  // const onConfirmClick = () => {
  //   if (validateConsultation()) return
  //   const newConsultations = [
  //     {
  //       ...creatingConsultation,
  //       id: uuidv4(),
  //       isExpanded: true,
  //       member: currentMember || member,
  //       remindStart: new Date(creatingConsultation.remindStart).getTime(),
  //       remindEnd: creatingConsultation.remindEnd ? new Date(creatingConsultation.remindEnd).getTime() : null,
  //       ...(currentPet && { pet: currentPet }),
  //     },
  //     ...consultations,
  //   ]
  //   setConsultations(newConsultations)
  //   setCreatingConsultation(INITIAL_STATE)
  //   onClose()
  // }

  const renderCategoryOptions = categories => {
    return categories.map(category => (
      <MenuItem value={category.id} key={category.id}>
        {category.name}
      </MenuItem>
    ))
  }

  const renderPrincipalOptions = principals => {
    return principals.map(principal => (
      <MenuItem value={principal.id} key={principal.id}>
        {principal.name}
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
            my: 1.5,
            '&.for-date': {
              mt: 2,
            },
            '&.last-one': {
              mb: 6,
            },
          },
        },
      }}
    >

      <Paper sx={{
        p: 2,
        flexGrow: 1,
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.light',
        '& .option-wrapper': {
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          '& .minor': {
            fontSize: '0.875em',
            letterSpacing: '0.04em',
            color: 'text.secondary',
          },
        },
      }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{ color: 'primary.light', fontWeight: 'bold' }}
          >
            新增提醒
          </Typography>

          <Autocomplete
            disablePortal
            sx={{ width: '100%' }}
            options={dummyMembers}
            value={currentMember}
            onChange={onMemberChange}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField
                label="客戶名稱"
                variant="standard"
                // error={Boolean(errors.member)}
                // helperText={errors.member}
                {...params} />
            )}
            renderOption={(props, option) => (
              <div {...props} >
                <div className="option-wrapper">
                  <span>{option.name}</span>
                  <span className="minor">{option.mobile}</span>
                </div>
              </div>
            )}
          />

          <Autocomplete
            disablePortal
            sx={{ width: '100%' }}
            options={dummyMembers}
            value={currentMember}
            onChange={onMemberChange}
            getOptionLabel={option => option.mobile}
            renderInput={params => (
              <TextField
                label="客戶電話"
                variant="standard"
                // error={Boolean(errors.member)}
                // helperText={errors.member}
                {...params} />
            )}
            renderOption={(props, option) => (
              <div {...props} >
                <div className="option-wrapper">
                  <span>{option.mobile}</span>
                  <span className="minor">{option.name}</span>
                </div>
              </div>
            )}
          />

          <Autocomplete
            freeSolo
            disablePortal
            sx={{ width: '100%' }}
            options={(currentMember && currentMember.pets) || []}
            value={currentPet}
            onChange={onPetChange}
            getOptionLabel={option => option.name}
            renderInput={(params) => <TextField
              label="寵物名稱"
              variant="standard"
              {...params}
            />}
            renderOption={(props, option) => (
              <div {...props} >
                <div className="option-wrapper">
                  <span>{option.name}</span>
                  <span className="minor">{option.breed}</span>
                </div>
              </div>
            )}
          />

          <TextField
            label="負責人"
            required
            select
            variant="standard"
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
            required
            select
            variant="standard"
            error={Boolean(errors.category)}
            helperText={errors.category}
            onChange={onCategoryChange}
            value={(creatingConsultation.category && creatingConsultation.category.id) || ''}
          >
            <MenuItem value="" disabled>選擇類別</MenuItem>
            {renderCategoryOptions(consultationCategories)}
          </TextField>

          <DateTimePicker
            renderInput={(props) => <TextField
              required
              className="for-date"
              {...props}
              error={Boolean(errors.remindStart || props.error)} helperText={errors.remindStart}
              variant="standard"
            />}
            minutesStep={5}
            label="提醒開始時間"
            value={creatingConsultation.remindStart}
            inputFormat="yyyy/MM/dd hh:mm a"
            mask="___/__/__ __:__ _M"
            onChange={onRemindChange('remindStart')}
            maxDateTime={creatingConsultation.remindEnd && new Date(creatingConsultation.remindEnd)}
          />

          <DateTimePicker
            renderInput={(props) => <TextField
              className="last-one for-date"
              {...props}
              error={Boolean(errors.remindEnd || props.error)} helperText={errors.remindEnd}
              variant="standard"
            />}
            minutesStep={5}
            label="提醒結束時間"
            value={creatingConsultation.remindEnd}
            inputFormat="yyyy/MM/dd hh:mm a"
            mask="___/__/__ __:__ _M"
            onChange={onRemindChange('remindEnd')}
            minDateTime={creatingConsultation.remindStart && new Date(creatingConsultation.remindStart)}
          />

          {/* <Typography variant="subtitle1" sx={{
            mt: 2,
            fontSize: '0.75rem',
            lineHeight: '1.4375em',
            letterSpacing: '0.00938em',
            color: 'rgba(0, 0, 0, 0.42)',
          }}>
            提醒內容
          </Typography> */}

          <TextareaAutosize
            value={creatingConsultation.text || ''}
            placeholder="請輸入文字內容 *"
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
            mt: 4,
            mb: 2.5,
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
        </Box>

      </Paper>

      <Box sx={{ textAlign: 'center', pt: 2.5, pb: 2 }}>
        <Button
          color="secondary"
          variant="contained"
          onClick={onClose}
          sx={{
            fontWeight: 'bold',
            color: 'grey.700',
            bgcolor: 'secondary.light',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          }}
        >
          確認
        </Button>
      </Box>

    </Popover>
  )
}
