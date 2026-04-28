import { Toast } from 'radix-ui'

const GardenToast = ({
  showToast,
  setShowToast,
  message
}: {
  showToast: boolean
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>
  message: string
}) => {
  return (
    <Toast.Provider swipeDirection='right'>
      <Toast.Root
        open={showToast}
        onOpenChange={setShowToast}
        duration={5000}
        className='border-warn bg-primary pointer-events-auto z-50 w-[90vw] max-w-125 rounded-md border p-4 shadow-md'
      >
        <Toast.Title className='text-warn text-sm font-semibold'>
          No se pudo eliminar la especie
        </Toast.Title>
        <Toast.Description className='text-secondary mt-1 text-sm'>
          {message}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className='pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4' />
    </Toast.Provider>
  )
}

export default GardenToast
