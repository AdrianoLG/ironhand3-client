import IconLogo from '../../assets/svgs/IconLogo'

const ErrorMessage = ({
  message,
  errorMessage,
  containerClasses
}: {
  message: string
  errorMessage: string
  containerClasses: string
}) => (
  <div className='from-primary to-warn flex h-full w-full items-center justify-center bg-radial from-20%'>
    <div className='flex flex-col items-center justify-center rounded-full bg-[rgba(255,255,255,.2)] px-16 py-24'>
      <IconLogo
        color='secondary'
        classes='w-full h-full max-w-56 max-h-56'
        shadow={true}
      />
      <div className={containerClasses}>
        <div className='w-fit text-center'>
          <p className='mb-2 text-lg font-bold uppercase'>{message}</p>
          <p className='mb-1 text-sm font-semibold'>
            Se ha producido el siguiente error:
          </p>
          <pre className='text-xs'>{JSON.stringify(errorMessage, null, 2)}</pre>
        </div>
      </div>
    </div>
  </div>
)

export default ErrorMessage
