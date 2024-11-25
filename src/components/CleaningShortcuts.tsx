import Draggable from 'react-draggable'
import Card from './Card'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const CleaningShortcuts = () => {
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
      <h2 className='text-3xl'>Limpieza</h2>
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
            <Card
              imageSrc='./src/assets/img/todo'
              type='jpg'
              imageAlt='Añadir todo'
              title='Añadir todo'
            />
            <Card
              imageSrc='./src/assets/img/lunch'
              type='jpg'
              imageAlt='Añadir comida'
              title='Añadir comida'
            />
            <Card
              imageSrc='./src/assets/img/catalog'
              type='jpg'
              imageAlt='Añadir al catálogo'
              title='Añadir al catálogo'
            />
            <Card
              imageSrc='./src/assets/img/expenses'
              type='jpg'
              imageAlt='Añadir gasto'
              title='Añadir gasto'
            />
            <Card
              imageSrc='./src/assets/img/watering'
              type='jpg'
              imageAlt='Añadir riego'
              title='Añadir riego'
            />
            <Card
              imageSrc='./src/assets/img/recipee'
              type='jpg'
              imageAlt='Añadir receta'
              title='Añadir receta'
            />
            <Card
              imageSrc='./src/assets/img/todo'
              type='jpg'
              imageAlt='Añadir todo'
              title='Añadir todo'
            />
            <Card
              imageSrc='./src/assets/img/lunch'
              type='jpg'
              imageAlt='Añadir comida'
              title='Añadir comida'
            />
            <Card
              imageSrc='./src/assets/img/catalog'
              type='jpg'
              imageAlt='Añadir al catálogo'
              title='Añadir al catálogo'
            />
          </div>
        </Draggable>
      </div>
    </>
  )
}

export default CleaningShortcuts
