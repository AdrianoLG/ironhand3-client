import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { Button } from '../../../components/atoms';
import { Dialog } from '../../../components/organisms/dialogs';
import SavingFormContainer from '../forms/SavingFormContainer';
import { UPDATE_GOAL } from '../gql/budgetMutations';
import { BUDGET_INFO } from '../gql/budgetQueries';
import { iGoals, iSavings } from '../types/types';
import SavingAccountItem from './savings/SavingAccountItem';

const Savings = ({ savings }: { savings?: iSavings[] }) => {
  const [isSavingDialogOpen, setIsSavingDialogOpen] = useState(false)
  const [editingSaving, setEditingSaving] = useState<iSavings | undefined>()

  const [updateGoal] = useMutation(UPDATE_GOAL, {
    refetchQueries: [{ query: BUDGET_INFO }]
  })

  const handleOpenCreate = () => {
    setEditingSaving(undefined)
    setIsSavingDialogOpen(true)
  }

  const handleOpenEdit = (saving: iSavings) => {
    setEditingSaving(saving)
    setIsSavingDialogOpen(true)
  }

  const handleCompleteGoal = async (goal: iGoals) => {
    if (goal.isCompleted) return

    await updateGoal({
      variables: {
        updateGoalInput: {
          _id: goal._id,
          isCompleted: true,
          completedAt: new Date().toISOString()
        }
      }
    })
  }

  return (
    <div className='savings'>
      <h2 className='text-xl font-semibold'>Ahorros</h2>

      {savings && savings.length > 0 ? (
        <div className='mt-4 flex flex-col gap-3'>
          {savings.map(saving => (
            <SavingAccountItem
              key={saving._id}
              saving={saving}
              onEdit={handleOpenEdit}
              onCompleteGoal={handleCompleteGoal}
            />
          ))}
        </div>
      ) : (
        <p className='mt-4 text-sm text-gray-500'>
          No hay ahorros disponibles.
        </p>
      )}

      <Button
        text='Añadir cuenta'
        small
        classes='mt-8'
        onMouseClick={handleOpenCreate}
      />

      <Dialog
        buttonText=''
        title={
          editingSaving ? 'Editar cuenta de ahorro' : 'Añadir cuenta de ahorro'
        }
        description={
          editingSaving
            ? 'Actualiza el titulo, el ahorrado y las metas de esta cuenta'
            : 'Crea una nueva cuenta de ahorro y define sus metas'
        }
        image='budget-bg'
        child={
          <SavingFormContainer
            key={editingSaving?._id ?? 'new-saving'}
            setIsOpen={setIsSavingDialogOpen}
            savingData={editingSaving}
            onSuccess={() => setEditingSaving(undefined)}
          />
        }
        isOpen={isSavingDialogOpen}
        setIsOpen={setIsSavingDialogOpen}
        hideTrigger
      />
    </div>
  )
}
export default Savings
