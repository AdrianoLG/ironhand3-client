import IconLogo from '../../assets/svgs/IconLogo'

const ErrorMessage = ({
  message,
  containerClasses
}: {
  message: string
  containerClasses: string
}) => (
  <div className='flex h-full w-full items-center justify-center'>
    <div className='flex flex-col items-center justify-center'>
      <IconLogo color='warn' classes='w-full h-full max-w-56 max-h-56' />
      <div className={containerClasses}>
        <div className='w-fit text-center'>
          <p className='mb-2 text-sm font-semibold'>
            Se ha producido el siguiente error:
          </p>
          <pre className='text-xs'>{JSON.stringify(message, null, 2)}</pre>
        </div>
      </div>
    </div>
  </div>
)

export default ErrorMessage
