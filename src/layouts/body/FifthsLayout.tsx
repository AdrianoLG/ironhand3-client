const FifthsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='xl:max-w-screen-content mx-auto grid h-full grid-cols-1 justify-start gap-8 px-12 pb-16 lg:grid-cols-5'>
    {children}
  </div>
)

export default FifthsLayout
