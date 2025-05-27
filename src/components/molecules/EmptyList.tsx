const Emptylist = ({
  message,
  secondary
}: {
  message: string
  secondary?: boolean
}) => (
  <div
    className={`w-fit rounded-md ${secondary ? 'bg-secondaryLightest' : 'bg-accentLight'} mb-8 px-4 py-2 text-secondary`}
  >
    <p className='whitespace-pre-wrap font-semibold'>{message}</p>
  </div>
)

export default Emptylist
