const Emptylist = ({
  message,
  secondary
}: {
  message: string
  secondary?: boolean
}) => (
  <div
    className={`w-fit rounded-md ${secondary ? 'bg-secondaryLightest text-inv' : 'bg-accentLight text-accent'} mb-8 px-4 py-2`}
  >
    <p className='font-semibold whitespace-pre-wrap'>{message}</p>
  </div>
)

export default Emptylist
