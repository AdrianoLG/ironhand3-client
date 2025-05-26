const ErrorMessage = ({
  message,
  containerClasses
}: {
  message: string
  containerClasses: string
}) => (
  <div className={containerClasses}>
    <div className='w-fit'>
      <p className='mb-2 w-fit text-sm font-semibold'>
        Se ha producido el siguiente error:
      </p>
      <pre className='w-fit text-xs'>{JSON.stringify(message, null, 2)}</pre>
    </div>
  </div>
)

export default ErrorMessage
