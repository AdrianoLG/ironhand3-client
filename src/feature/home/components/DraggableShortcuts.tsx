import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

interface iDraggableShortcuts {
  title: string
  children: React.ReactNode
}

const DraggableShortcuts = ({ title, children }: iDraggableShortcuts) => {
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
        tabIndex={-1}
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
            tabIndex={-1}
          >
            {children}
          </div>
        </Draggable>
      </div>
    </>
  )
}

export default DraggableShortcuts
