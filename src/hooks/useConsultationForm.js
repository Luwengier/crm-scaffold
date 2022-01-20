import { useState } from 'react'
import { omit } from 'lodash-es'
import { principalMapping, consultationMapping, IMPORTANT_LEVEL_IDS } from '../pages/ConsultationManage/dummyData'


export function useConsultationForm(INITIAL_STATE) {
  const [errors, setErrors] = useState({})
  const [currentMember, setCurrentMember] = useState(null)
  const [currentPet, setCurrentPet] = useState(null)
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

  const onMemberChange = (e, optionValue) => {
    // if (optionValue.pets) { setCurrentPets(optionValue.pets) }

    setErrors(omit(errors, 'member'))
    setCurrentMember(optionValue)
    setCurrentPet(null)
  }

  const onPetChange = (e, optionValue) => {
    setCurrentPet(optionValue)
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


  return {
    errors,
    setErrors,
    currentMember,
    currentPet,
    creatingConsultation,
    setCreatingConsultation,
    onImportantLevelRadio,
    onTagToggle,
    onMemberChange,
    onPetChange,
    onPrincipalChange,
    onCategoryChange,
    onRemindChange,
    onTextChange,
  }
}