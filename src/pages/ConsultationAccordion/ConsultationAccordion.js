import React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiPagination from '@mui/material/Pagination'
import CancelIcon from '@mui/icons-material/Cancel'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MemberInfo from './MemberInfo'
import orderData from './orderData'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.bg,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const Pagination = styled(MuiPagination)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  '& .MuiPagination-ul': {
    justifyContent: 'center',
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: '#fff1be',
  },
}))

export default function ConsultationAccordion() {
  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = panel => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const renderAccordion = data => {
    return data && data.map((item, index) => (
      <Accordion expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)} key={index}>
        <AccordionSummary>
          <Typography>{`Collapsible Group Item #${index + 1}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))
  }

  return (
    <div>
      <MemberInfo />
      <Button
        variant="text"
        color="secondary"
        sx={{
          color: 'secondary.text',
          fontWeight: 'bold',
          fontSize: '1.125rem',
          mb: 1.5,
        }}
        startIcon={<CancelIcon sx={{ transform: 'rotate(45deg)' }} />}
      >
        新增諮詢紀錄
      </Button>
      {renderAccordion(orderData)}
      <Pagination count={10} shape="rounded" />
    </div>
  )
}
