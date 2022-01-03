import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { v4 as uuidv4 } from 'uuid'
import { principals, principalMapping, consultationCategories, consultationMapping, minorPropertyTags, IMPORTANT_LEVELS, IMPORTANT_LEVEL_IDS } from './dummyData'

function CreatePopoverContent({ setConsultations, consultations, onClose }) {
  const theme = useTheme()
  const [creatingConsultation, setCreatingConsultation] = useState({
    remindStart: new Date().getTime(),
    propertyTags: [{ id: 'pt3', name: '一般' }],
  })

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
        [name]: new Date(newValue).getTime(),
      }))
    } else {
      setCreatingConsultation((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const onTextChange = e => {
    setCreatingConsultation((prev) => ({
      ...prev,
      text: e.target.value,
    }))
  }

  const validateConsultation = () => {
    if (!creatingConsultation.principal) return alert('請選擇負責人')
    if (!creatingConsultation.category) return alert('請選擇類別')
    if (!creatingConsultation.remindStart) return alert('請選擇提醒時間')
    return true
  }

  const onConfirmClick = () => {
    if (!validateConsultation()) return
    const newConsultations = [
      {
        ...creatingConsultation,
        id: uuidv4(),
        isExpanded: true,
      },
      ...consultations,
    ]
    setConsultations(newConsultations)
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
    <React.Fragment>
    </React.Fragment>
  )
}

export default CreatePopoverContent
