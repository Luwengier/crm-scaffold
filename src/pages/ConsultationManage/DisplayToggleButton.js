import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

function DisplayToggleButton(props) {
  const { selected, onSelected } = props

  return (
    <ToggleButtonGroup
      exclusive
      value={selected}
      onChange={onSelected}
      aria-label="display"
      sx={{
        '& .MuiToggleButton-root': {
          py: 0.5,
          px: 1.5,
        },
      }}
    >
      <ToggleButton value="" aria-label="all">
        全部
      </ToggleButton>
      <ToggleButton value="undone" aria-label="undone">
        未完成
      </ToggleButton>
      <ToggleButton value="done" aria-label="done">
        已完成
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default DisplayToggleButton
