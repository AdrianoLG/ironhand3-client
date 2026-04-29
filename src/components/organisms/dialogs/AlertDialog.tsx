import { AlertDialog as RadixAlertDialog } from 'radix-ui'

import IconWarn from '../../../assets/svgs/IconWarn'
import { Button } from '../../atoms'

interface iAlertDialog {
  isOpen: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description: string
  confirmText: string
  onConfirm: () => void
  isDark?: boolean
  layout?: 'standard' | 'compact'
}

const AlertDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  confirmText,
  onConfirm,
  isDark = false,
  layout = 'standard'
}: iAlertDialog) => {
  const isCompact = layout === 'compact'

  const getContentClassName = () => {
    const baseClasses =
      'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none'

    if (isCompact) {
      return `${baseClasses} w-full max-w-md bg-warn p-8 shadow-lg rounded-xl`
    }

    if (isDark) {
      return `${baseClasses} max-h-[85vh] w-[90vw] max-w-125 border-4 border-[#f2b885] bg-[#f5e6d9]`
    }

    return `${baseClasses} max-h-[85vh] w-[90vw] max-w-125 bg-warn`
  }

  return (
    <RadixAlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay
          className={`${isCompact ? 'bg-black/50' : 'bg-transparent70B'} fixed inset-0`}
          onClick={() => onOpenChange?.(false)}
        />
        <RadixAlertDialog.Content className={getContentClassName()}>
          {isCompact ? (
            <div>
              <div className='mb-4 flex items-center gap-3'>
                <IconWarn
                  color='currentColor'
                  classes='text-secondary w-6 h-6'
                />
                <RadixAlertDialog.Title className='text-secondary text-lg font-semibold'>
                  {title}
                </RadixAlertDialog.Title>
              </div>
              <RadixAlertDialog.Description className='text-textSecondary mb-6 text-sm'>
                {description}
              </RadixAlertDialog.Description>
              <div className='flex justify-end gap-3'>
                <RadixAlertDialog.Cancel asChild>
                  <Button
                    text='Cancelar'
                    isFit
                    small
                    secondary
                    onMouseClick={() => onOpenChange?.(false)}
                  />
                </RadixAlertDialog.Cancel>
                <RadixAlertDialog.Action asChild>
                  <Button
                    text={confirmText}
                    isFit
                    small
                    onMouseClick={onConfirm}
                  />
                </RadixAlertDialog.Action>
              </div>
            </div>
          ) : (
            <div className='relative px-8 pt-12 pb-8'>
              <IconWarn
                color={isDark ? '#f26d3d' : 'var(--warn)'}
                classes={`${isDark ? 'bg-[#fff]' : 'bg-primary'} rounded-full w-12 absolute -top-6 left-1/2 -translate-x-1/2`}
              />
              <RadixAlertDialog.Title
                className={`${isDark ? 'text-warn' : 'text-warn'} mb-2 text-center text-lg font-semibold`}
              >
                {title}
              </RadixAlertDialog.Title>
              <RadixAlertDialog.Description className='mb-8 text-center text-sm'>
                {description}
              </RadixAlertDialog.Description>
              <div className='flex justify-center gap-4'>
                <RadixAlertDialog.Cancel asChild>
                  <Button
                    text='Cancelar'
                    secondary={!isDark}
                    isFit
                    small
                    onMouseClick={() => onOpenChange?.(false)}
                  />
                </RadixAlertDialog.Cancel>
                <RadixAlertDialog.Action asChild>
                  <Button
                    text={confirmText}
                    isFit
                    small
                    onMouseClick={onConfirm}
                  />
                </RadixAlertDialog.Action>
              </div>
            </div>
          )}
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  )
}

export default AlertDialog
