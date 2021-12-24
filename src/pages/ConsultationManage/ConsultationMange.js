import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
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
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MemberInfo from '../../components/MemberInfo'
import dummyData from './dummyData'

const demoText = `寺躲讀眼枝星草神叫學怎包沒寺老原物意聲自戶。游雨苦只文共力自能虎百書師。聲穴葉父問服穴支洋美眼馬哭巾牛，都房穿往朱陽，反五哭村喜小毛畫們爪背卜波巴山弓連個吹毛入。
珠夕經老荷加花，枝她隻由像她雞抄錯借金色大屋、女古美拍來法員旦瓜對要游主苦助能波立動，乞很生玉種年耍後。

家他明像它次害古還黃汁節，新布和停，英哪王像百跑回，高助做寫海面氣封內馬金乾許花；升習十能書意足放一完。`

const insertIsExpanded = consultations => {
  return consultations.map(consultation => ({ ...consultation, isExpanded: !Boolean(consultation.isCompleted) }))
}

function ConsultationMange() {
  const theme = useTheme()
  const [consultations, setConsultations] = useState(null)
  const [editingId, setEditingId] = useState('')

  useEffect(() => {
    setConsultations(insertIsExpanded(dummyData))
  }, [])

  const onExpandedChange = (id, isEditing) => (event, isExpanded) => {
    const newConsultations = consultations.map(consultation => {
      return consultation.id === id ? { ...consultation, isExpanded: isEditing ? true : !consultation.isExpanded } : consultation
    })

    setConsultations(newConsultations)
  }

  const onEditClick = id => e => {
    e.stopPropagation()
    setEditingId(id)
    // 編輯時自動展開
    onExpandedChange(id, id)()
  }

  const onEditCancel = e => {
    e.stopPropagation()
    setEditingId('')
  }

  const onCompletedToggle = id => e => {
    e.stopPropagation()
    const newConsultations = consultations.map(consultation => {
      return consultation.id === id ? { ...consultation, isCompleted: !consultation.isCompleted } : consultation
    })
    if (id === editingId) setEditingId('')
    setConsultations(newConsultations)
  }

  const renderConsultations = data => {
    return data && data.map((item, index) => {
      const isCompleted = item.isCompleted ? ' completed' : ''
      const isEditing = (editingId === item.id) && !item.isCompleted ? ' editing' : ''

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

                    <div className="info-sec">
                      <Typography className="info-title" variant="subtitle1" component="span">
                        負責人 :&nbsp;
                      </Typography>
                      <Typography className="info-content" variant="subtitle1" component="span">
                        金小城
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

                  </div>
                </Grid>

                <Grid item className="icon-group">
                  {isCompleted
                    ? (
                      <IconButton aria-label="edit" onClick={onCompletedToggle(item.id)}>
                        <ReplayOutlinedIcon />
                      </IconButton>
                    )
                    : (
                      <React.Fragment>
                        <IconButton aria-label="edit" onClick={isEditing ? onEditCancel : onEditClick(item.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={e => e.stopPropagation()}>
                          <DeleteOutlineIcon />
                        </IconButton>
                        <IconButton aria-label="finish" onClick={onCompletedToggle(item.id)}>
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      </React.Fragment>
                    )
                  }
                </Grid>

              </Grid>
            </AccordionSummary>

            <AccordionDetails className={isCompleted}>
              <div className="accordion-content">
                {demoText}
              </div>
            </AccordionDetails>
          </Accordion>
          <div className={`accordion-actions${isCompleted}`}>

            <Stack className="chip-wrapper" direction="row" spacing={1}>
              <Chip className="red" label="緊急" size="small" />
              <Chip className="blue" label="重要" size="small" />
            </Stack>

            <div className="data-group">
              {isCompleted
                ? (
                  <div className="record-date">
                    <span>完成時間 :&nbsp;</span>
                    <span>{item.completedAt}</span>
                  </div>
                )
                : (
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

            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <Box
      sx={{
        '& .accordion-wrapper': {
          overflow: 'auto',
          borderRadius: '0.5rem',
          border: `1px solid ${theme.palette.divider}`,
          bt: 0,
          mb: 3,
        },
        '& .MuiAccordion-root': {
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiAccordionSummary-root': {
          pl: 0,
          // pr: { xs: 0, sm: 2 },
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
        },
        '& .MuiAccordionDetails-root': {
          padding: 0,
          height: '8rem',
          '&.completed': {
            color: 'text.secondary',
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
          pr: 1.5,
          '& .info-title': {
            fontWeight: 'bold',
          },
        },
        '& .icon-group': {
          display: 'flex',
          alignItems: 'center',
          px: 0.75,
          '& .MuiIconButton-root': {
            color: 'text.light',
          },
        },
        '& .accordion-content': {
          py: 1.5,
          px: 2.5,
          whiteSpace: 'pre-line',
        },
        '& .accordion-actions': {
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'grey.100',
        },
        '& .chip-wrapper': {
          p: 1,
          '& .MuiChip-label': {
            px: 2,
            color: 'text.light',
          },
          '& .red': {
            bgcolor: 'jewelry.red',
          },
          '& .blue': {
            bgcolor: 'jewelry.blue',
          },
        },
        '& .data-group': {
          display: 'flex',
          alignItems: 'center',
          color: 'text.third',
          px: 1,
          '& > div': {
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
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
      <Button
        sx={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          color: 'secondary.text',
          '& .MuiButton-startIcon svg': { fontSize: '1.25rem' },
        }}
        startIcon={<AddCircleIcon />}
      >
        新增諮詢紀錄
      </Button>
      <Box sx={{ overflow: 'auto', pb: 6 }}>
        {renderConsultations(consultations)}
      </Box>
    </Box>
  )
}

export default ConsultationMange
