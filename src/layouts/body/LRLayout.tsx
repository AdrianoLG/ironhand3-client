const LRLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='xl:max-w-screen-content mx-auto flex h-full flex-wrap justify-start px-4 pb-16 sm:px-8 lg:px-12'>
    {children}
  </div>
)

export default LRLayout
