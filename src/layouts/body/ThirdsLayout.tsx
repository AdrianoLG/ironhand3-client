const ThirdsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='xl:max-w-screen-content mx-auto grid h-full grid-cols-1 justify-start gap-4 px-8 pb-16 lg:grid-cols-3'>
    {children}
  </div>
)

export default ThirdsLayout
