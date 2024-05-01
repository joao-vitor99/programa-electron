import { Spinner, ToastProps } from '@blueprintjs/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@prisma/client'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import DeleteAlertModal from '../components/AlertModal'
import DataHeader from '../components/DataHeader'
import { Read } from '../components/Orders/Read'
import { ScreenMenuProps } from '../components/ScreenMenu'
import { AppToaster } from '../config/toast'
import { SCREEN_MODE } from '../constants'
import { ScreenLocalContext } from '../context/ScreenLocalContext'
import { createClient, deleteClient, editClient, getClients } from '../queries/client'
import { CreateClientResolver } from '../resolvers/user.resolver'

type ClientWithoutId = Omit<Client, 'id'>

export const Orders = () => {
  const {
    screenMode: { screenMode, setScreenMode },
    selectedRow: { selectedRow, setSelectedRow }
  } = useContext(ScreenLocalContext)

  const showToast = async (props: ToastProps) => {
    ;(await AppToaster).show(props)
  }

  // TODO - refactor opening logic, encapsulate the logic on the component itself
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { isLoading, data, refetch } = useQuery('clients', getClients, {
    onError: () => {
      showToast({
        message: 'Erro ao obter os clientes',
        intent: 'danger'
      })
    }
  })

  const { mutateAsync: createClientMutation, isSuccess: createdSuccessfully } = useMutation(
    'createClient',
    createClient,
    {
      onSuccess: () => {
        refetch()
        showToast({
          message: 'Cliente criado com sucesso!',
          intent: 'success'
        })
      },
      onError: () => {
        showToast({
          message: 'Erro ao criar o cliente',
          intent: 'danger'
        })
      }
    }
  )

  const { mutateAsync: deleteClientMutation } = useMutation('deleteClient', deleteClient, {
    onSuccess: () => {
      refetch()
      showToast({
        message: 'Cliente deletado!',
        intent: 'success'
      })
    },
    onError: () => {
      showToast({
        message: 'Erro ao deletar o cliente',
        intent: 'danger'
      })
    }
  })

  const { mutateAsync: editClientMutation, isSuccess: editedSuccessfully } = useMutation(
    'editClient',
    editClient,
    {
      onSuccess: () => {
        refetch()
        showToast({
          message: 'Cliente editado com sucesso!',
          intent: 'success'
        })
      },
      onError: () => {
        showToast({
          message: 'Erro ao editar o cliente',
          intent: 'danger'
        })
      }
    }
  )

  const form = useForm<ClientWithoutId>({
    resolver: zodResolver(CreateClientResolver)
  })

  // Reset SCREEN_MODE and form when changing screens
  useEffect(() => {
    return () => {
      setScreenMode(SCREEN_MODE.VIEW)
      form.reset()
    }
  }, [])

  const handleDeleteActionButton = async () => {
    await deleteClientMutation((selectedRow as Client)?.id)
    setSelectedRow({})
    setIsDeleteModalOpen(false)
  }

  const actions: ScreenMenuProps['actions'] = {
    onNewClick: (changeScreen) => {
      changeScreen()
    },
    onEditClick: (changeScreen) => {
      changeScreen()
    },
    onSaveClick: (changeScreen) => {
      const onCreate: SubmitHandler<ClientWithoutId> = async (data) => {
        await createClientMutation(data)

        if (createdSuccessfully) {
          form.reset()
          changeScreen()
        }
      }

      const onEdit: SubmitHandler<ClientWithoutId> = async (data) => {
        const { id } = selectedRow as Client

        await editClientMutation({
          clientId: id,
          clientData: data
        })

        if (editedSuccessfully) {
          form.reset()
          changeScreen()
        }
      }

      form.handleSubmit(screenMode === SCREEN_MODE.NEW ? onCreate : onEdit)()
    },
    onDeleteClick: () => {
      setIsDeleteModalOpen(true)
    },
    onCancelClick: (changeScreen) => {
      form.reset()
      setSelectedRow({})
      changeScreen()
    }
  }

  return (
    <>
      <div>
        <DataHeader title="PEDIDOS" />

        <FormProvider {...form}>
          {isLoading ? <Spinner size={110} intent="primary" /> : <Read />}
        </FormProvider>
      </div>

      <DeleteAlertModal
        isOpen={isDeleteModalOpen}
        confirmButtonText="Deletar"
        cancelButtonText="Cancelar"
        icon="trash"
        intent="danger"
        actions={{
          onCancel: () => {
            setSelectedRow({})
            setIsDeleteModalOpen(false)
          },
          onConfirm: () => {
            handleDeleteActionButton()
          }
        }}
      >
        <p>
          Deletar o cliente <b>{(selectedRow as Client)?.name}</b> ?
        </p>
      </DeleteAlertModal>
    </>
  )
}
