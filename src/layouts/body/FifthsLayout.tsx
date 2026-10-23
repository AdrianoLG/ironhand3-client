const FifthsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='xl:max-w-screen-content mx-auto grid h-full grid-cols-1 justify-start gap-8 px-4 pb-16 sm:px-8 lg:grid-cols-5 lg:px-12'>
    {children}
  </div>
)

export default FifthsLayout
