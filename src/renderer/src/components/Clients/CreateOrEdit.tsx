import { Button, FormGroup } from '@blueprintjs/core'
import { useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SCREEN_MODE } from '../../constants'
import { ScreenLocalContext } from '../../context/ScreenLocalContext'
import { Input } from '../Input'
import InputError from '../InputError'

type CreateOrEditProps = {
  onSave?: (changeScreen: () => void) => void
  onCancel?: (changeScreen: () => void) => void
}

export const CreateOrEdit = (props: CreateOrEditProps): React.ReactNode => {
  const {
    screenMode: { screenMode, setScreenMode },
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
    <div className="p-5 bg-white h-[200px] w-[800px] rounded flex flex-col gap-1 justify-between">
      <form id="create-form" className="w-full h-full">
        <div className="flex gap-4 w-full">
          <FormGroup style={{ width: '100%' }} label="Nome:" labelInfo="(obrigatório)">
            <Input
              placeholder="Nome"
              fill
              error={Boolean(errors?.['name']?.message?.toString())}
              {...register('name')}
            />
            <InputError errorMessage={errors?.['name']?.message?.toString()} />
          </FormGroup>

          <FormGroup style={{ width: '100%' }} label="Telefone:">
            <Input
              placeholder="Telefone"
              fill
              error={Boolean(errors?.['name']?.message?.toString())}
              {...register('phone')}
              // TODO: Add input mask
            />
            <InputError errorMessage={errors?.['phone']?.message?.toString()} />
          </FormGroup>
        </div>
      </form>

      <div className="flex flex-row gap-3">
        <Button
          fill
          intent="none"
          icon="disable"
          onClick={() => {
            const changeScreen = (): void => {
              setScreenMode(SCREEN_MODE.VIEW)
            }

            props?.onCancel?.(changeScreen)
          }}
        >
          Cancelar
        </Button>

        <Button
          icon="floppy-disk"
          fill
          intent="warning"
          form="create-form"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault()

            const changeScreen = (): void => {
              setScreenMode(SCREEN_MODE.VIEW)
            }

            props?.onSave?.(changeScreen)
          }}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
