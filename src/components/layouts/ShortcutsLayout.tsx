import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

interface iShortcutsLayout {
  title: string
  children: React.ReactNode
}

const ShortcutsLayout = ({ title, children }: iShortcutsLayout) => {
  const nodeRef = useRef(null)
  const parentNodeRef = useRef<HTMLDivElement>(null)
  const [parentNodeWidth, setParentNodeWidth] = useState(0)

  const parentNodeWidthFunc = () => {
    if (parentNodeRef.current) {
      setParentNodeWidth(
        parentNodeRef.current.scrollWidth - parentNodeRef.current.offsetWidth
      )
    }
  }

  useEffect(() => {
    parentNodeWidthFunc()
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      parentNodeWidthFunc()
      return () => window.removeEventListener('resize', () => {})
    })
  }, [])

  return (
    <>
      <h2 className='text-3xl'>{title}</h2>
      <div
        className='w-full overflow-x-hidden'
        onMouseDown={e => e.preventDefault()}
        ref={parentNodeRef}
      >
        <Draggable
          axis='x'
          defaultPosition={{ x: 0, y: 0 }}
          bounds={{ left: -parentNodeWidth, right: 0 }}
          nodeRef={nodeRef}
        >
          <div
            className='flex w-full flex-nowrap gap-4 scroll-smooth'
            onMouseDown={e => e.preventDefault()}
            ref={nodeRef}
          >
            {children}
          </div>
        </Draggable>
      </div>
    </>
  )
}

export default ShortcutsLayout
