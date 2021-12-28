import React, { useState, useEffect, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import { format } from 'date-fns'
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
import { dummyData, principals, principalMapping } from './dummyData'

const insertIsExpanded = consultations => {
  return consultations.map(consultation => ({ ...consultation, isExpanded: true }))
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

  const renderPrincipalOptions = principals => {
    return principals.map(principal => (
      <option value={principal.id} key={principal.id}>
        {principal.name}
      </option>
    ))
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
        <div className={`accordion-wrapper${isCompleted}`} key={item.id}>

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
                              轉派給 :&nbsp;
                            </Typography>
                            <select>
                              <option value="">商品諮詢</option>
                              <option value="1">客訴案件</option>
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
                              商品諮詢
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
                  <TextareaAutosize className="text-area" maxRows={10} minRows={4} defaultValue={item.text} />
                )
                : (
                  <div className="accordion-content">
                    {item.text}
                  </div>
                )
              }
            </AccordionDetails>
          </Accordion>

          <div className={`accordion-actions${isCompleted}`}>

            <Stack className="chip-wrapper" direction="row" spacing={1}>
              <Chip className={isCompleted ? 'fadeRed' : 'red'} label="緊急" size="small" />
              <Chip className={isCompleted ? 'fadeBlue' : 'blue'} label="重要" size="small" />
              <Chip className={isCompleted ? 'fade' : ''} label="派發工單" size="small" />
            </Stack>

            <div className="date-group">
              {renderDateGroup(item, isCompleted, isEditing)}
            </div>
          </div>
        </div>
      )
    })
  }

  const createOpen = Boolean(anchorEl)
  const deleteOpen = Boolean(deleteEl)

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 5 },
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
          '&.completed': {
            color: 'text.disabled',
            bgcolor: '#fcfcfc',
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
        '& .chip-wrapper': {
          py: 1,
          px: 2.5,
          '& .MuiChip-root': {
            bgcolor: 'text.mid',
          },
          '& .MuiChip-label': {
            px: 2,
            color: 'text.light',
          },
          '& .fade': { bgcolor: 'text.fade' },
          '& .red': { bgcolor: 'jewelry.red' },
          '& .fadeRed': { bgcolor: 'jewelry.fadeRed' },
          '& .blue': { bgcolor: 'jewelry.blue' },
          '& .fadeBlue': { bgcolor: 'jewelry.fadeBlue' },
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
      {/* <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', pb: 1 }}>
        諮詢管理
      </Typography> */}
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
        onClose={handleCreateClose}
      />
      <DeletePopover
        open={deleteOpen}
        anchorEl={deleteEl}
        onClose={handleDeleteClose}
        onDeleteConfirm={onDeleteConfirm}
      />
      <Box sx={{ overflow: 'auto', pb: 6 }}>
        {renderConsultations(filteredData)}
      </Box>
    </Box>
  )
}

export default ConsultationMange
