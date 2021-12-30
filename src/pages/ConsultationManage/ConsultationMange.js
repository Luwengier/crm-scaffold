import React, { useState, useEffect, useMemo } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { useTheme } from '@mui/material/styles'
import { format } from 'date-fns'
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MemberInfo from '../../components/MemberInfo'
import DisplayToggleButton from './DisplayToggleButton'
import CreatePopover from './CreatePopover'
import DeletePopover from './DeletePopover'
import { dummyData, principals, principalMapping, consultationCategories, consultationMapping, minorPropertyTags, IMPORTANT_CLASS_MAPPING, IMPORTANT_LEVELS, IMPORTANT_LEVEL_IDS } from './dummyData'


const insertIsExpanded = consultations => {
  return consultations.map(consultation => ({ ...consultation, isExpanded: consultation.isCompleted ? false : true }))
}

const getLocaleDateString = () => {
  const newLocaleDateString = new Date().toLocaleString()
  return newLocaleDateString.replace('午', '午 ').slice(0, -3)
}

const filterDate = (data, selected) => {
  if (!selected) { return data }
  else if (selected === 'undone') {
    return data.filter(item => !item.isCompleted)
  } else if (selected === 'done') {
    return data.filter(item => item.isCompleted)
  }
}

function ConsultationMange() {
  const theme = useTheme()
  const [consultations, setConsultations] = useState(null)
  const [editingItem, setEditingItem] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [deleteEl, setDeleteEl] = useState(null)
  const [selected, setSelected] = useState('')

  useEffect(() => {
    setConsultations(insertIsExpanded(dummyData))
  }, [])

  const filteredData = useMemo(() => {
    return consultations ? filterDate(consultations, selected) : []
  }, [consultations, selected])

  const onExpandedChange = (id, isEditing) => (event, isExpanded) => {
    const newConsultations = consultations.map(consultation => {
      return consultation.id === id ? { ...consultation, isExpanded: isEditing ? true : !consultation.isExpanded } : consultation
    })
    setConsultations(newConsultations)
  }

  const onSelected = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  }

  const onCompletedToggle = item => e => {
    e.stopPropagation()
    const newConsultations = consultations.map(consultation => {
      return consultation.id === item.id
        ? {
          ...consultation,
          ...(!consultation.isCompleted && { completedAt: getLocaleDateString() }),
          isCompleted: !consultation.isCompleted,
          isExpanded: consultation.isCompleted,
        }
        : consultation
    })
    if (item.id === editingItem.id) setEditingItem({})
    setConsultations(newConsultations)
  }

  const handleCreateClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    setDeleteEl(e.currentTarget)
  }

  const handleCreateClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClose = () => {
    setDeleteEl(null)
  }

  const onDeleteConfirm = id => {
    const newConsultations = consultations.filter(consultation => consultation.id !== id)
    setConsultations(newConsultations)
  }

  // 編輯相關 Function
  const onEditClick = item => e => {
    e.stopPropagation()
    setEditingItem(item)
    // 編輯時自動展開
    onExpandedChange(item.id, Boolean(item.id))()
  }

  const onEditCancel = e => {
    e.stopPropagation()
    setEditingItem({})
  }

  const onEditConfirm = e => {
    // 需要 stopPropagation 否則 setConsultations 會被 onExpandedChange 裡的覆蓋
    e.stopPropagation()
    const newConsultations = consultations.map(consultation => {
      return consultation.id === editingItem.id
        ? { ...consultation, ...editingItem }
        : consultation
    })
    setConsultations(newConsultations)
    setEditingItem({})
  }

  const onPrincipalChange = e => {
    const newEditingItem = {
      ...editingItem,
      principal: {
        ...editingItem.principal,
        id: e.target.value,
        name: principalMapping[e.target.value]
      }
    }
    setEditingItem(newEditingItem)
  }

  const onCategoryChange = e => {
    const newEditingItem = {
      ...editingItem,
      category: {
        ...editingItem.category,
        id: e.target.value,
        name: consultationMapping[e.target.value]
      }
    }
    setEditingItem(newEditingItem)
  }

  const renderPrincipalOptions = principals => {
    return principals.map(principal => (
      <option value={principal.id} key={principal.id}>
        {principal.name}
      </option>
    ))
  }

  const renderCategoryOptions = categories => {
    return categories.map(category => (
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    ))
  }

  const onTextChange = e => {
    const newEditingItem = {
      ...editingItem,
      text: e.target.value,
    }
    setEditingItem(newEditingItem)
  }

  const onRemindTimeChange = e => {
    const newEditingItem = {
      ...editingItem,
      [e.target.name]: new Date(e.target.value).getTime()
    }
    setEditingItem(newEditingItem)
  }

  const formatRemindTime = inputTime => {
    const formatTime = inputTime && format(new Date(inputTime), "yyyy-MM-dd'T'hh:mm")
    return formatTime
  }

  const onTagToggle = targetTag => () => {
    setEditingItem((prev) => ({
      ...prev,
      propertyTags: prev.propertyTags.some(item => item.id === targetTag.id)
        ? prev.propertyTags.filter(item => item.id !== targetTag.id)
        : [...prev.propertyTags, targetTag]
    }))
  }

  const onImportantLevelRadio = targetTag => () => {
    if (editingItem.propertyTags.some(item => item.id === targetTag.id)) return
    const clearedPropertyTag = editingItem.propertyTags.filter(item => !IMPORTANT_LEVEL_IDS.includes(item.id))

    setEditingItem((prev) => ({
      ...prev,
      propertyTags: [...clearedPropertyTag, targetTag]
    }))
  }


  const renderIconButton = (item, isCompleted, isEditing) => {
    if (isCompleted) {
      return (
        <IconButton aria-label="edit" onClick={onCompletedToggle(item)}>
          <ReplayOutlinedIcon />
        </IconButton>
      )
    } else if (isEditing) {
      return (
        <React.Fragment>
          <Button variant="contained" size="small" color="inherit" disableElevation={true} onClick={onEditCancel}>取消</Button>
          <Button variant="contained" size="small" color="inherit" disableElevation={true} onClick={onEditConfirm}>修改</Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <IconButton aria-label="edit" onClick={onEditClick(item)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteClick} data-id={item.id}>
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton aria-label="complete" onClick={onCompletedToggle(item)}>
            <CheckCircleOutlineIcon />
          </IconButton>
        </React.Fragment>
      )
    }
  }

  const renderChipWrapper = (item, isCompleted, isEditing) => {
    if (isEditing) {
      return (
        <Stack className="chip-wrapper" direction="row" spacing={1}>
          {renderTagBtns()}
        </Stack>
      )
    } else {
      return (
        <Stack className={`chip-wrapper${isCompleted}`} direction="row" spacing={1}>
          {renderTags(item)}
        </Stack>
      )
    }
  }

  const judgeActive = targetTag => {
    return editingItem.propertyTags.some(item => item.id === targetTag.id) ? '' : 'negative'
  }

  const renderTags = consultation => {
    let minors = []
    let isUrgent = false
    let importantLevel = null

    consultation.propertyTags.forEach(item => {
      if (item.id === 'pt1') {
        isUrgent = true
      } else if (['pt2', 'pt3', 'pt4'].includes(item.id)) {
        importantLevel = item
      } else {
        minors.push(item)
      }
    })

    const minorTags = minors.map(minor => (
      <Chip key={minor.id} label={minor.name} size="small" />
    ))

    return (
      <React.Fragment>
        <Chip label="急" className={isUrgent ? 'red' : 'plain'} size="small" />
        <Chip label={importantLevel.name} className={IMPORTANT_CLASS_MAPPING[importantLevel.id]} size="small" />
        {minorTags}
      </React.Fragment>
    )
  }

  const renderTagBtns = consultation => {
    const minorTagBtns = minorPropertyTags.map(propertyTag => {
      const active = editingItem.propertyTags.some(item => item.id === propertyTag.id)
        ? ''
        : 'negative'
      return (
        <Chip className={active} key={propertyTag.id} label={propertyTag.name} size="small" onClick={onTagToggle(propertyTag)} />
      )
    })

    return (
      <React.Fragment>
        <Chip label="急" size="small"
          onClick={onTagToggle({ id: 'pt1', name: '急' })}
          className={`red ${judgeActive({ id: 'pt1', name: '急' })}`}
        />
        <Box className="toggle-wrapper">
          <Chip label="重要" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[0])}
            className={`dark-blue ${judgeActive(IMPORTANT_LEVELS[0])}`}
          />
          <Chip label="一般" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[1])}
            className={`blue ${judgeActive(IMPORTANT_LEVELS[1])}`}
          />
          <Chip label="次要" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[2])}
            className={`light-blue ${judgeActive(IMPORTANT_LEVELS[2])}`}
          />
        </Box>
        {minorTagBtns}
      </React.Fragment>
    )
  }

  const renderDateGroup = (item, isCompleted, isEditing) => {
    if (isCompleted) {
      return (
        <div className="record-date">
          <span className="obvious">完成時間 :&nbsp;</span>
          <span className="obvious">{item.completedAt}</span>
        </div>
      )
    } else if (isEditing) {
      return (
        <React.Fragment>
          <div className="remind-date">
            <TimerOutlinedIcon fontSize="small" />
            <span>提醒時間 :&nbsp;</span>
            <input
              type="datetime-local"
              name="remindStartTime"
              value={formatRemindTime(editingItem.remindStartTime) || ''}
              onChange={onRemindTimeChange}
            />
            <span>&nbsp;-&nbsp;</span>
            <input type="datetime-local" />
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div className="record-date">
            <RateReviewOutlinedIcon fontSize="small" />
            <span>紀錄時間 :&nbsp;</span>
            <span>2021/08/10</span>
          </div>
          <span>|</span>
          <div className="remind-date">
            <TimerOutlinedIcon fontSize="small" />
            <span>提醒時間 :&nbsp;</span>
            <span className="obvious">2021/08/31 下午 03:00</span>
            <span>&nbsp;-&nbsp;</span>
            <span className="obvious">2021/09/01 下午 06:00</span>
          </div>
        </React.Fragment>
      )
    }
  }

  const renderConsultations = data => {
    return data.map((item, index) => {
      const isCompleted = item.isCompleted ? ' completed' : ''
      const isEditing = (editingItem.id === item.id) && !item.isCompleted ? ' editing' : ''

      return (
        <Zoom key={item.id} timeout={500}>
          <div className={`accordion-wrapper${isCompleted}`}>

            <Accordion
              disableGutters
              elevation={0}
              expanded={item.isExpanded}
              onChange={onExpandedChange(item.id, isEditing)}
              // defaultExpanded={!Boolean(isCompleted)}
              key={index}
            >
              <AccordionSummary className={`${isCompleted}${isEditing}`} expandIcon={<ArrowForwardIosSharpIcon />}>
                <Grid container className="consultation-info">

                  <Grid item className="info-group">
                    <div className="serial-sec">
                      {index + 1}
                    </div>
                    <div className="info-sec-wrapper">
                      {isEditing
                        ? (
                          <React.Fragment>
                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                轉派給 :&nbsp;
                              </Typography>
                              <select
                                value={(editingItem.principal && editingItem.principal.id) || ''}
                                onChange={onPrincipalChange}
                              >
                                <option value="">負責人</option>
                                {renderPrincipalOptions(principals)}
                              </select>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                類別 :&nbsp;
                              </Typography>
                              <select
                                value={(editingItem.category && editingItem.category.id) || ''}
                                onChange={onCategoryChange}
                              >
                                <option value="">選擇類別</option>
                                {renderCategoryOptions(consultationCategories)}
                              </select>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                記錄人員 :&nbsp;
                              </Typography>
                              <Typography className="info-content" variant="subtitle1" component="span">
                                王小美
                              </Typography>
                            </div>
                          </React.Fragment>
                        )
                        : (
                          <React.Fragment>
                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                負責人 :&nbsp;
                              </Typography>
                              <Typography className="info-content" variant="subtitle1" component="span">
                                {item.principal && item.principal.name}
                              </Typography>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                類別 :&nbsp;
                              </Typography>
                              <Typography className="info-content" variant="subtitle1" component="span">
                                {item.category && item.category.name}
                              </Typography>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                記錄人員 :&nbsp;
                              </Typography>
                              <Typography className="info-content" variant="subtitle1" component="span">
                                王小美
                              </Typography>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                {isCompleted ? '已完成' : '未完成'}
                              </Typography>
                            </div>
                          </React.Fragment>
                        )
                      }

                    </div>
                  </Grid>

                  <Grid item className="icon-group">
                    {renderIconButton(item, isCompleted, isEditing)}
                  </Grid>

                </Grid>
              </AccordionSummary>

              <AccordionDetails className={isCompleted}>
                {isEditing
                  ? (
                    <TextareaAutosize
                      className="text-area"
                      maxRows={10}
                      minRows={4}
                      value={editingItem.text}
                      onChange={onTextChange}
                    />
                  )
                  : (
                    <div className="accordion-content">
                      {item.text}
                    </div>
                  )
                }
              </AccordionDetails>
            </Accordion>

            <div className={`accordion-actions`}>

              {renderChipWrapper(item, isCompleted, isEditing)}

              <div className="date-group">
                {renderDateGroup(item, isCompleted, isEditing)}
              </div>
            </div>
          </div>

        </Zoom>
      )
    })
  }

  const createOpen = Boolean(anchorEl)
  const deleteOpen = Boolean(deleteEl)

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 4 },
        '& .accordion-wrapper': {
          overflow: 'auto',
          borderRadius: '0.5rem',
          border: `1px solid ${theme.palette.divider}`,
          mb: 3,
        },
        '& .MuiAccordion-root': {
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiAccordionSummary-root': {
          pl: 0,
          backgroundColor: 'primary.text',
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
          '& .MuiAccordionSummary-expandIconWrapper svg': {
            color: 'text.light',
            fontSize: '0.9rem',
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          '&.completed': {
            bgcolor: 'grayscale.main',
          },
          '&.editing': {
            bgcolor: 'secondary.text',
          },
          '&.editing .consultation-info': {
            color: 'text.secondary',
          },
        },
        '& .MuiAccordionDetails-root': {
          padding: 0,
          overflow: 'auto',
          bgcolor: 'background.default',
          '&.completed': {
            color: 'text.disabled',
            bgcolor: 'background.light',
          },
        },

        '& .consultation-info': {
          color: 'text.light',
          justifyContent: {
            xs: 'center',
            md: 'space-between',
          },
        },
        '& .info-group': {
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          '& > div': {
            display: 'inline-block',
          }
        },
        '& .serial-sec': {
          flex: '0 0 4rem',
          display: 'inline-flex',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          padding: '0 1em',
          minWidth: 0,
        },
        '& .info-sec': {
          display: 'inline-block',
          pr: 2.5,
          '& .info-title': {
            fontWeight: 'bold',
          },
        },
        '& .icon-group': {
          display: 'flex',
          alignItems: 'center',
          px: 0.75,
          '& .MuiButton-root': {
            mx: 0.5,
            bgcolor: 'background.paper',
            fontWeight: 'bold',
          },
          '& .MuiButton-root:hover': {
            bgcolor: 'text.light',
          },
          '& .MuiIconButton-root': {
            color: 'text.light',
          },
        },
        '& .accordion-content': {
          py: 1.5,
          px: 2.5,
          whiteSpace: 'pre-line',
        },
        '& .text-area': {
          py: 1.5,
          px: 2.5,
          display: 'block',
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          border: 'none',
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
          fontFamily: 'Roboto',
        },
        '& .accordion-actions': {
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'grey.100',
        },
        '& .toggle-wrapper': {
          px: 0.5,
          mx: 0.5,
          borderRadius: '1rem',
          border: `1px dashed ${theme.palette.text.mid}`,
        },
        '& .chip-wrapper': {
          px: 2.5,
          py: 0.5,
          mx: -0.5,
          '& .MuiChip-root': {
            mx: 0.5,
            my: 0.5,
            color: 'text.light',
            bgcolor: 'text.mid',
          },
          '& .MuiChip-label': {
            px: 2,
          },
          '& .plain': {
            color: 'text.fade',
            bgcolor: 'inherit',
            border: `1px solid ${theme.palette.text.fade}`,
          },
          '& .red': { bgcolor: 'jewelry.red' },
          '& .blue': { bgcolor: 'jewelry.blue' },
          '& .dark-blue': { bgcolor: 'jewelry.darkBlue' },
          '& .light-blue': { bgcolor: 'jewelry.lightBlue' },
          '& .negative': {
            color: 'text.primary',
            bgcolor: 'text.lighter',
          },
        },
        '& .chip-wrapper.completed': {
          '& .MuiChip-root': { bgcolor: 'text.fade' },
          '& .plain': {
            color: 'text.fade',
            bgcolor: 'inherit',
            border: `1px solid ${theme.palette.text.fade}`,
          },
          '& .red': { bgcolor: 'jewelry.fadeRed' },
          '& .blue': { bgcolor: 'jewelry.fadeBlue' },
          '& .dark-blue': { bgcolor: 'jewelry.fadeDarkBlue' },
          '& .light-blue': { bgcolor: 'jewelry.fadeLightBlue' },
        },
        '& .date-group': {
          display: 'flex',
          alignItems: 'center',
          color: 'text.third',
          px: 1,
          '& > div': {
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
          },
          '& input': {
            pl: 1,
            width: '14rem',
            border: '1px solid #cccccc',
            borderRadius: '0.25em',
          },
          '& svg': { mr: 0.75 },
          '& span': { display: 'inline-block' },
          '& span.obvious': {
            fontWeight: 'bold',
          },
        },
      }}
    >
      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', pb: 1, color: 'text.secondary' }}>
        諮詢管理
      </Typography>
      <MemberInfo sx={{ mb: 1 }} />
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <DisplayToggleButton
          selected={selected}
          setSelected={setSelected}
          onSelected={onSelected}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCreateClick}
          sx={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: 'secondary.darkText',
            '& .MuiButton-startIcon svg': { fontSize: '1.25rem' },
          }}
          startIcon={<AddCircleIcon />}
        >
          新增諮詢紀錄
        </Button>
      </Box>
      <CreatePopover
        open={createOpen}
        anchorEl={anchorEl}
        consultations={consultations}
        onClose={handleCreateClose}
        setConsultations={setConsultations}
      />
      <DeletePopover
        open={deleteOpen}
        anchorEl={deleteEl}
        onClose={handleDeleteClose}
        onDeleteConfirm={onDeleteConfirm}
      />
      <Box sx={{ overflow: 'auto', pb: 6 }}>
        <TransitionGroup>
          {renderConsultations(filteredData)}
        </TransitionGroup>
      </Box>
    </Box>
  )
}

export default ConsultationMange
