import { FormGroup } from '@blueprintjs/core'
import { useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SCREEN_MODE } from '../../constants'
import { ScreenLocalContext } from '../../context/ScreenLocalContext'
import { Input } from '../Input'
import InputError from '../InputError'

export const CreateOrEdit = () => {
  const {
    screenMode: { screenMode },
    selectedRow: { selectedRow }
  } = useContext(ScreenLocalContext)

  const {
    register,
    reset,
    formState: { errors }
  } = useFormContext()

  useEffect(() => {
    const isScreenInEditModeAndHasData =
      screenMode === SCREEN_MODE.EDIT &&
      selectedRow !== undefined &&
      Object.values(selectedRow).length

    if (isScreenInEditModeAndHasData) {
      reset(selectedRow)
    }
  }, [selectedRow])

  return (
    <form id="create-form" className="flex gap-4">
      <FormGroup style={{ width: '250px' }} label="Nome:" labelInfo="(obrigatório)">
        <Input
          placeholder="Nome"
          fill
          error={Boolean(errors?.['name']?.message?.toString())}
          {...register('name')}
        />
        <InputError errorMessage={errors?.['name']?.message?.toString()} />
      </FormGroup>

      <FormGroup style={{ width: '250px' }} label="Telefone:">
        <Input
          placeholder="Telefone"
          fill
          error={Boolean(errors?.['name']?.message?.toString())}
          {...register('phone')}
          // TODO: Add input mask
        />
        <InputError errorMessage={errors?.['phone']?.message?.toString()} />
      </FormGroup>
    </form>
  )
}
