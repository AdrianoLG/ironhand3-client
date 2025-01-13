import { useLayoutEffect, useRef, useState } from 'react'

import body from '../../utils/body'
import { iCompletedExercise } from '../../utils/types'

const Body = ({
  color,
  completedExercises
}: {
  color: string
  completedExercises: iCompletedExercise[]
}) => {
  const [currentFillHead, setCurrentFillHead] = useState('current')
  const [currentFillNeck, setCurrentFillNeck] = useState('current')
  const [currentFillShoulders, setCurrentFillShoulders] = useState('current')
  const [currentFillChest, setCurrentFillChest] = useState('current')
  const [currentFillBack, setCurrentFillBack] = useState('current')
  const [currentFillAbs, setCurrentFillAbs] = useState('current')
  const [currentFillTriceps, setCurrentFillTriceps] = useState('current')
  const [currentFillBiceps, setCurrentFillBiceps] = useState('current')
  const [currentFillArms, setCurrentFillArms] = useState('current')
  const [currentFillHands, setCurrentFillHands] = useState('current')
  const [currentFillGlutes, setCurrentFillGlutes] = useState('current')
  const [currentFillThighs, setCurrentFillThighs] = useState('current')
  const [currentFillQuadriceps, setCurrentFillQuadriceps] = useState('current')
  const [currentFillKnees, setCurrentFillKnees] = useState('current')
  const [currentFillLegs, setCurrentFillLegs] = useState('current')
  const [currentFillFeet, setCurrentFillFeet] = useState('current')
  const initialized = useRef(false)

  useLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true

      const chosenColor = (value: number): string => {
        if (value == 0) {
          return 'var(--value1)'
        }
        if (value == 1) {
          return 'var(--value2)'
        }
        if (value == 2) {
          return 'var(--value3)'
        }
        if (value == 3) {
          return 'var(--value4)'
        }
        if (value == 4) {
          return 'var(--value5)'
        }
        if (value == 5) {
          return 'var(--value6)'
        }
        if (value == 6) {
          return 'var(--value7)'
        }
        if (value == 7) {
          return 'var(--value8)'
        }
        if (value == 8) {
          return 'var(--value9)'
        }
        if (value >= 9) {
          return 'var(--value10)'
        }
        return 'var(--value1)'
      }

      completedExercises.map(completedExercise => {
        completedExercise.exercises.map(exercise => {
          exercise.parts.forEach((part: string) => {
            switch (part) {
              case 'Cabeza':
                body[body.findIndex(item => item.part === 'Cabeza')].count++
                break
              case 'Cuello':
                body[body.findIndex(item => item.part === 'Cuello')].count++
                break
              case 'Hombros':
                body[body.findIndex(item => item.part === 'Hombros')].count++
                break
              case 'Pecho':
                body[body.findIndex(item => item.part === 'Pecho')].count++
                break
              case 'Espalda':
                body[body.findIndex(item => item.part === 'Espalda')].count++
                break
              case 'Abdominales':
                body[body.findIndex(item => item.part === 'Abdominales')]
                  .count++
                break
              case 'Tríceps':
                body[body.findIndex(item => item.part === 'Tríceps')].count++
                break
              case 'Bíceps':
                body[body.findIndex(item => item.part === 'Bíceps')].count++
                break
              case 'Brazos':
                body[body.findIndex(item => item.part === 'Brazos')].count++
                break
              case 'Manos':
                body[body.findIndex(item => item.part === 'Manos')].count++
                break
              case 'Glúteos':
                body[body.findIndex(item => item.part === 'Glúteos')].count++
                break
              case 'Muslos':
                body[body.findIndex(item => item.part === 'Muslos')].count++
                break
              case 'Cuádriceps':
                body[body.findIndex(item => item.part === 'Cuádriceps')].count++
                break
              case 'Rodillas':
                body[body.findIndex(item => item.part === 'Rodillas')].count++
                break
              case 'Piernas':
                body[body.findIndex(item => item.part === 'Piernas')].count++
                break
              case 'Pies':
                body[body.findIndex(item => item.part === 'Pies')].count++
                break
              default:
                break
            }
          })
        })
      })
      completedExercises.map(completedExercise => {
        completedExercise.exercises.map(exercise => {
          exercise.parts.forEach((part: string) => {
            switch (part) {
              case 'Cabeza': {
                const nHead =
                  body[body.findIndex(item => item.part === 'Cabeza')].count
                const ccHead = chosenColor(nHead)
                setCurrentFillHead(ccHead)
                break
              }
              case 'Cuello': {
                const nNeck =
                  body[body.findIndex(item => item.part === 'Cuello')].count
                const ccNeck = chosenColor(nNeck)
                setCurrentFillNeck(ccNeck)
                break
              }
              case 'Hombros': {
                const nShoulders =
                  body[body.findIndex(item => item.part === 'Hombros')].count
                const ccShoulders = chosenColor(nShoulders)
                setCurrentFillShoulders(ccShoulders)
                break
              }
              case 'Pecho': {
                const nChest =
                  body[body.findIndex(item => item.part === 'Pecho')].count
                const ccChest = chosenColor(nChest)
                setCurrentFillChest(ccChest)
                break
              }
              case 'Espalda': {
                const nBack =
                  body[body.findIndex(item => item.part === 'Espalda')].count
                const ccBack = chosenColor(nBack)
                setCurrentFillBack(ccBack)
                break
              }
              case 'Abdominales': {
                const nAbs =
                  body[body.findIndex(item => item.part === 'Abdominales')]
                    .count
                const ccAbs = chosenColor(nAbs)
                setCurrentFillAbs(ccAbs)
                break
              }
              case 'Tríceps': {
                const nTriceps =
                  body[body.findIndex(item => item.part === 'Tríceps')].count
                const ccTriceps = chosenColor(nTriceps)
                setCurrentFillTriceps(ccTriceps)
                break
              }
              case 'Bíceps': {
                const nBiceps =
                  body[body.findIndex(item => item.part === 'Bíceps')].count
                const ccBiceps = chosenColor(nBiceps)
                setCurrentFillBiceps(ccBiceps)
                break
              }
              case 'Brazos': {
                const nArms =
                  body[body.findIndex(item => item.part === 'Brazos')].count
                const ccArms = chosenColor(nArms)
                setCurrentFillArms(ccArms)
                break
              }
              case 'Manos': {
                const nHands =
                  body[body.findIndex(item => item.part === 'Manos')].count
                const ccHands = chosenColor(nHands)
                setCurrentFillHands(ccHands)
                break
              }
              case 'Glúteos': {
                const nGlutes =
                  body[body.findIndex(item => item.part === 'Glúteos')].count
                const ccGlutes = chosenColor(nGlutes)
                setCurrentFillGlutes(ccGlutes)
                break
              }
              case 'Muslos': {
                const nThighs =
                  body[body.findIndex(item => item.part === 'Muslos')].count
                const ccThighs = chosenColor(nThighs)
                setCurrentFillThighs(ccThighs)
                break
              }
              case 'Cuádriceps': {
                const nQuadriceps =
                  body[body.findIndex(item => item.part === 'Cuádriceps')].count
                const ccQuadriceps = chosenColor(nQuadriceps)
                setCurrentFillQuadriceps(ccQuadriceps)
                break
              }
              case 'Rodillas': {
                const nKnees =
                  body[body.findIndex(item => item.part === 'Rodillas')].count
                const ccKnees = chosenColor(nKnees)
                setCurrentFillKnees(ccKnees)
                break
              }
              case 'Piernas': {
                const nLegs =
                  body[body.findIndex(item => item.part === 'Piernas')].count
                const ccLegs = chosenColor(nLegs)
                setCurrentFillLegs(ccLegs)
                break
              }
              case 'Pies': {
                const nFeet =
                  body[body.findIndex(item => item.part === 'Pies')].count
                const ccFeet = chosenColor(nFeet)
                setCurrentFillFeet(ccFeet)
                break
              }
              default:
                break
            }
          })
        })
      })
    }
  }, [])

  return (
    <svg
      id='body'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 316 294'
      fill={color}
    >
      <g id='abs'>
        <path
          fill={currentFillAbs}
          d='M73.5,126.5c0-2.7,0-5.3,0-8,.2-1.1,0-2.2-.2-3.2-.3-1-.9-2-1.7-2.8-.8-.8-1.7-1.4-2.7-1.8-1-.4-2.1-.5-3.2-.3-1.6,0-2.6.4-2.4,2.3,0,2.4.2,4.8.6,7.1,1.4,5.6,2.9,11.3,4.7,16.8.3,1,2,1.5,3.2,2.1.6-1.1,1.5-2,1.6-3.2.2-3.1,0-6.1,0-9.1Z'
        />
        <path
          fill={currentFillAbs}
          d='M76.5,126.2c.2,0,.5,0,.7,0,0,3,0,6,0,9,.3,1.2.8,2.3,1.4,3.3,1.2-.7,2.2-1.3,3.3-1.9.4-.4.6-.8.8-1.4,2.8-7.3,4.4-15.1,4.6-22.9,0-.6-.2-1.3-.6-1.7-1.6-1.4-8.1.6-8.5,2.6-.9,4.2-1.3,8.7-1.8,12.9Z'
        />
        <path
          fill={currentFillAbs}
          d='M61.9,126.9c-.6-7.1-1-13.6-1.8-19.8-.7-1.9-2-3.5-3.7-4.6-1.8-1.5-2.9-.8-3.1,1.6,0,3.9-.2,7.8-.8,11.6-1.2,6,2.8,9.6,7.4,11.8.7,0,1.3-.2,1.9-.6Z'
        />
        <path
          fill={currentFillAbs}
          d='M97.4,115.8c0-4,0-7.9,0-12,0-2-1-2.7-2.8-1.8-1.1.4-2.1,1.1-2.9,2.1s-1.2,2.1-1.4,3.3c-.7,6-1.1,12.1-1.6,18.1-.2,2,.8,2.6,2.4,1.6,5.2-2.9,7.8-5.4,6.3-11.3Z'
        />
        <path
          fill={currentFillAbs}
          d='M73.5,104.9c0-5.7-1-6.6-6.5-6-.9.1-1.7.5-2.5,1-.7.5-1.3,1.2-1.8,2-.4.8-.7,1.7-.7,2.6,0,.9.1,1.8.5,2.6.3.6,1.4.9,2,1.1,1.4.3,2.7.2,4.1.5q4.8,1.4,4.8-3.7Z'
        />
        <path
          fill={currentFillAbs}
          d='M77.1,109.5c3.6-.6,6.9-1,10.1-1.5.4,0,.8-.9.9-1.4.4-1.2.4-2.5,0-3.7-.3-1.2-1-2.3-2-3.1-1.2-.6-2.6-1-4-1-1.4,0-2.8.2-4.1.8-.5.4-.8.9-.9,1.5v8.5h0Z'
        />
        <path
          fill={currentFillAbs}
          d='M73.5,96.4v-4.9c0-4.2-1.6-5.4-5.6-3.9-1.3.5-2.5,1.2-3.5,2.1-1.1.9-1.9,2.1-2.1,3.5s0,2.8.7,4c3.4-.3,6.7-.6,10.5-.9Z'
        />
        <path
          fill={currentFillAbs}
          d='M87.9,97.3c.5-1.1.6-2.4.4-3.6-.2-1.2-.8-2.3-1.6-3.3-.9-1.2-2-2.1-3.4-2.7-1.3-.6-2.8-.8-4.3-.6-.7,0-1.8.9-1.8,1.4-.2,2.7,0,5.4,0,7.8,3.7.4,7,.7,10.7,1Z'
        />
      </g>
      <g id='thighs'>
        <path
          fill={currentFillThighs}
          d='M64.4,201.4c.4-8.4.7-16.8,1.1-25.1.2-3.9,1.7-7.8,0-11.8-3.2-7.4-6.5-15-10-22.8-1.3,8.2-2.4,16-.5,24,2.1,8.7,3.8,17.7,5.5,26.5.6,3.1,1.1,6.2,1.4,9.1.8.1,1.7.2,2.5.2Z'
        />
        <path
          fill={currentFillThighs}
          d='M88,201.5c1.9-10,3.6-19.9,5.8-29.8,1.9-6.5,2.7-13.3,2.4-20.1-.4-3.3-.9-6.5-1.3-9.8-.7,1-1.2,2.1-1.6,3.2-2.5,5.8-5.1,11.7-7.6,17.5-1.3,3-1.7,6.3-1.4,9.6.8,7.7,1.2,15.6,1.5,23.5,0,1.9-.3,3.9-.4,5.8h2.5Z'
        />
        <path
          fill={currentFillThighs}
          d='M68,171.7c-.3,3.4-.8,6.7-1,10.1-.3,6-.4,12.1-.4,18.1s0,4.1,2.5,4.2c2.5,0,2.8-2.4,3.1-4.2,1.5-9.6,0-19.5-4.3-28.2Z'
        />
        <path
          fill={currentFillThighs}
          d='M82.9,171.4h-1c-3.6,8.6-4.9,17.9-4,27.1.2,1.5.7,3,1.4,4.3,1.1,1.7,2.9,1.5,3.8-.4.3-.7.5-1.4.6-2.2-.2-9.6-.6-19.1-.9-28.9h0Z'
        />
        <path
          fill={currentFillThighs}
          d='M96.1,169.1c-3,10.5-5.2,21.2-6.4,32.1,0,.6.6,1.3,1.2,2.4,3.2-11.2,4.9-22.8,5.2-34.5Z'
        />
        <path
          fill={currentFillThighs}
          d='M60,202.8c-.3-11.3-2.1-22.5-5.5-33.2,0,11.3,2,22.5,5.5,33.2Z'
        />
      </g>
      <g id='knees'>
        <path
          fill={currentFillKnees}
          d='M86.9,204.3c-2.1,0-3.6,1.2-3.6,2.8.1.9.5,1.7,1.1,2.4.6.7,1.4,1.1,2.3,1.3.9-.2,1.7-.6,2.3-1.3.6-.7,1-1.5,1.1-2.4,0-2.1-1.7-2.5-3.2-2.8Z'
        />
        <path
          fill={currentFillKnees}
          d='M60.5,208.1c.9,1,2,1.9,3.2,2.5,1.4.5,3.7-2.1,3.5-3.7-.2-2-1.7-2.7-3.5-2.6-1.6,0-3.1.7-3.2,3.8Z'
        />
      </g>
      <g id='arms'>
        <path
          fill={currentFillArms}
          d='M31.5,94.6c-3.9,4.1-6.5,9.4-7.2,15.1-1.9,8.1-3.6,16.5-8.8,23.5.6-.1,1.2-.5,1.5-1,3.8-6,7.3-12.1,11.3-18,1.9-2.8,3.2-6.1,3.8-9.4.6-3.4.3-6.9-.6-10.2Z'
        />
        <path
          fill={currentFillArms}
          d='M134.7,133.2c.2,0,.4-.3.6-.4-4.2-6-7.1-12.9-8.3-20.1-1.2-4.5-2.6-8.9-4.3-13.2-1-1.8-2.1-3.6-3.5-5.1-1,3.5-1.2,7.1-.6,10.7.6,3.6,2,6.9,4.2,9.8,3.8,5.6,7.2,11.6,10.9,17.3.2.4.7.7,1.1,1.1Z'
        />
        <path
          fill={currentFillArms}
          d='M35.9,110.1c-9.4,5.1-11,15.6-16.5,23.4,5.5-7.7,11-15.6,16.5-23.4Z'
        />
        <path
          fill={currentFillArms}
          d='M131.1,133.4c-5.4-7.4-7-17.9-16.1-22.8,5.4,7.5,10.7,15.3,16.1,22.8Z'
        />
        <path
          fill={currentFillArms}
          d='M42.6,100.2c-4.7,1.8-9.6,6.4-10.2,9.8,2.4-1.3,4.9-2.6,7.4-3.9,2.7-1.4,3.3-2.6,2.8-5.9Z'
        />
        <path
          fill={currentFillArms}
          d='M118.7,110.2c-2.5-4.5-6.3-8.1-10.9-10.3-.3,2.4,0,4.3,1.7,5.4,2.9,1.8,5.8,3.2,9.2,4.9Z'
        />
        <path
          fill={currentFillArms}
          d='M122.6,130.2c-4.1-7.5-8.1-15.2-12.3-22.7,1.7,8.8,7.2,15.6,12.3,22.7Z'
        />
        <path
          fill={currentFillArms}
          d='M40.5,108.1l-.6-.3c-3.8,7.1-7.6,14.4-11.5,21.5,4.8-6.7,10-13.1,12.1-21.2Z'
        />
        <path
          fill={currentFillArms}
          d='M127.9,135.6c.2,0,.4-.2.5-.4-3.1-7.5-7.5-14.5-12.9-20.6,4.2,7.1,8.3,14.1,12.5,21Z'
        />
        <path
          fill={currentFillArms}
          d='M21.8,135.1c.3.2.6.3.9.5,4.1-6.9,8.1-13.8,12.3-20.8-.4-.2-.7-.4-1.1-.6-4.1,7-8,13.9-12.1,20.9Z'
        />
        <path
          fill={currentFillArms}
          d='M203.4,104.1c-.3-.2-.5-.4-.8-.6-2.8,8.3-5.7,16.7-8.5,24.9,6.3-7.4,11-16,14-25.3-1.7.4-3.3.7-4.7,1Z'
        />
        <path
          fill={currentFillArms}
          d='M275.5,103.2c1.1,6.2,9.1,21.2,13.4,24.8-1.2-4.1-2.2-8.2-3.7-12.3-1.4-4.1-3.2-8.1-4.7-12.2l-.6.6c-1.5-.2-3-.6-4.4-1Z'
        />
        <path
          fill={currentFillArms}
          d='M294.1,133.7c.5-5.9-4.7-26.2-7.3-29.9,0,10.4,2.5,20.7,7.3,29.9Z'
        />
        <path
          fill={currentFillArms}
          d='M196.3,104.6c-3.9,9.6-6.4,19.8-7.5,30.1,5-9.2,7.6-19.6,7.5-30.1Z'
        />
        <path
          fill={currentFillArms}
          d='M296.9,134.7c1.7-.7,4.1-.5,3.2-3.1-2.1-7.1-4.2-14.2-6.5-21.2-1.2-3.5-2.8-6.9-4.2-10.4-.2,0-.5.2-.7.3,4.4,11,7.1,22.6,8.2,34.4Z'
        />
        <path
          fill={currentFillArms}
          d='M194.1,101.7c-.3,0-.5-.2-.8-.3-1.2,2.9-2.5,5.7-3.5,8.7-2.2,6.9-4.1,13.8-6.3,20.7-.9,2.7,0,3.8,3,3.5,1.1-11.1,3.6-22.1,7.5-32.6Z'
        />
        <path
          fill={currentFillArms}
          d='M198.9,108.8c1.4-3.6,2.8-6.9,4.3-10.8-1.8,1.1-3.2,2.7-4,4.7-.8,2-.9,4.1-.3,6.2Z'
        />
        <path
          fill={currentFillArms}
          d='M284.1,108.4c.6-1.8.6-3.8-.1-5.5-.7-1.8-2-3.2-3.7-4.1,1.3,3.3,2.6,6.5,3.9,9.7Z'
        />
      </g>
      <g id='biceps'>
        <path
          fill={currentFillBiceps}
          d='M45.1,69c-1.6.7-3.3,1.3-4.8,1.9-.6.3-1.4.8-1.4,1.3-1.4,5.7-3,11.5-4.1,17.3,0,.9,0,1.7.4,2.5.3.8.9,1.5,1.5,2,1.9,1.2,3.7-.6,5-2,.3-.3.5-.7.7-1.1,2.9-4.6,4.7-9.8,5.4-15.2.6-3,.7-5.5-2.7-6.8Z'
        />
        <path
          fill={currentFillBiceps}
          d='M104.8,68.5c-1,1.4-2.7,2.8-2.6,3.9.3,5.7,1.8,11.3,4.4,16.3,1,1.8,2.3,3.4,3.9,4.7.4.4.9.7,1.5.8.6.1,1.1,0,1.7-.1.5-.2,1-.6,1.3-1,.3-.5.5-1,.5-1.6.3-1.1.3-2.2.2-3.3-.8-3.8-1.6-7.5-2.4-11.4-.8-3.6-2.1-6.6-6.3-7.2-.6,0-1.1-.5-2.1-1.1Z'
        />
        <path
          fill={currentFillBiceps}
          d='M37,72.5c-4.7,3.8-6.1,21.4-1.7,25.8-3.6-9.1-1.8-17.5,1.7-25.8Z'
        />
        <path
          fill={currentFillBiceps}
          d='M113.6,72.6c2,4,3.2,8.3,3.4,12.8.3,4.4-.3,8.9-1.8,13.1,4.2-4.6,2.9-22.1-1.6-25.9Z'
        />
        <path
          fill={currentFillBiceps}
          d='M35,100.4c2.1-.7,4-1.9,5.5-3.4,1.5-1.6,2.7-3.5,3.4-5.6.3.3.6.7.9,1-3.2,2.7-6.5,5.3-9.8,8Z'
        />
        <path
          fill={currentFillBiceps}
          d='M115.2,100.8l.8-.8c-3.6-2.7-7.1-5.5-10.7-8.2.3-.4.7-.7,1-1.1.7,2.2,1.9,4.2,3.5,5.9s3.4,3.1,5.5,4.1Z'
        />
      </g>
      <g id='chest'>
        <path
          fill={currentFillChest}
          d='M102.8,68c-2.3-1.5-4.2-2.8-6.1-4.2-1.8-1.4-3.7-2.9-5.6-4.2-2.9-1.9-5.8-3.6-8.9-5.1-.6-.3-1.3-.5-2-.5-.7,0-1.4.1-2,.4-.9,1.1-1.3,2.5-1.2,3.9,0,3.7.3,7.4.5,11.2,0,.3-.1.7-.3,1-.9,3.3,0,4.8,3.4,5.4,8.6,1.5,15.3-3.1,22.1-7.9Z'
        />
        <path
          fill={currentFillChest}
          d='M47.8,67.9c4.5,4,10.1,6.8,16,8,2,.3,4.1.3,6.1,0,3.4-.6,4.2-2,3.4-5.2-.1-.6-.2-1.2-.3-1.7,0-4.1.4-8.1.4-12.4,0-.5,0-.9-.3-1.4-.2-.4-.5-.8-.9-1-.4-.3-.9-.4-1.3-.4-.5,0-.9,0-1.4.3-1.9.7-3.8,1.6-5.5,2.7-5.4,3.5-10.6,7.1-16.2,11.1Z'
        />
        <path
          fill={currentFillChest}
          d='M62.4,87.7c3.4-1.1,6.6-1.9,9.8-3,.3-.2.6-.4.8-.7.2-.3.4-.6.4-1,.2-1.2.2-2.4,0-3.6,0-.3-.3-.6-.5-.9-.2-.3-.5-.4-.9-.6-1.5-.2-3,0-4.4.5-1.4.5-2.7,1.4-3.7,2.5-.9.8-1.5,1.9-1.8,3.1-.3,1.2-.2,2.4.2,3.6Z'
        />
        <path
          fill={currentFillChest}
          d='M87.9,87.7c1.3-4.4-1-8-6-9.6-4-1.1-4.9-.4-4.7,3.7,0,1,.5,2.5,1.2,2.7,3,1.3,6.2,2.1,9.6,3.2Z'
        />
        <path
          fill={currentFillChest}
          d='M100.3,85.8c-2.3,3.1-4.7,6-6.8,9.1-.6.8-.9,1.8-.9,2.9,0,1,.2,2,.7,2.9,4.3-2.3,7-8.1,7-14.9Z'
        />
        <path
          fill={currentFillChest}
          d='M50.1,85.7c.4,6.1,1.6,11.5,7,15.4.6-1,.9-2.2.8-3.3,0-1.2-.5-2.3-1.3-3.2-1.8-3-4.2-5.7-6.5-8.9Z'
        />
        <path
          fill={currentFillChest}
          d='M52.6,84.4c.1,1.6.7,3.2,1.7,4.5,1,1.3,2.3,2.4,3.8,3,1.1-4.1-.6-6.5-5.5-7.5Z'
        />
        <path
          fill={currentFillChest}
          d='M92,85c.3.1.6.3,1,.4,1.4-2.7,2.8-5.3,4.2-8-.2,0-.5-.2-.7-.4-5.4,3.6-5.6,4.1-4.4,8Z'
        />
        <path
          fill={currentFillChest}
          d='M53.7,76.7c.4,3.4,2.1,6.5,4.6,8.7,1.4-3.8,1-4.7-4.6-8.7Z'
        />
        <path
          fill={currentFillChest}
          d='M54.4,82.6c-1.3-2-2.1-3.6-3.3-5.5-1.4,4-.8,5.3,3.3,5.5Z'
        />
        <path
          fill={currentFillChest}
          d='M96.2,82.6c3.9,0,4.6-1.7,3-5.3-1,1.7-1.8,3.4-3,5.3Z'
        />
        <path
          fill={currentFillChest}
          d='M89.8,78.2c.3.4.7.8,1,1.2,1.2-1.2,2.4-2.2,3.6-3.4-.2-.2-.3-.4-.5-.6-1.4,1-2.7,1.8-4.1,2.8Z'
        />
        <path
          fill={currentFillChest}
          d='M64.3,281.6l-.6-.3c-1.2,1.9-2.4,3.8-3.6,5.7.2.2.5.3.7.5,2.9-.9,2.2-4.1,3.5-5.9Z'
        />
        <path
          fill={currentFillChest}
          d='M92.9,92.9c2.2-3,4-5.4,6.2-8.4-5.4.2-8.1,4.2-6.2,8.4Z'
        />
      </g>
      <g id='neck'>
        <path
          fill={currentFillNeck}
          d='M76.5,51.8c3.7-6,7.8-12,7.8-19.8-4.6,6-8.4,12-7.8,19.8Z'
        />
        <path
          fill={currentFillNeck}
          d='M66.2,32.1c0,7.9,4.1,13.7,7.5,19.9,1.5-4.8-1.5-12.5-7.5-19.9Z'
        />
        <path
          fill={currentFillNeck}
          d='M71.4,36.2c1.4,1.8,2.6,3.8,3.9,5.5,1.3-1.7,2.5-3.7,3.8-5.5-1.1-.8-2.4-1.3-3.8-1.3s-2.7.5-3.8,1.3Z'
        />
        <path
          fill={currentFillNeck}
          d='M84.8,47.5c-.7-1.7-1.2-3-1.6-4.4-.8,1.7-1.4,3.1-2.2,5,1.5-.3,2.6-.4,3.9-.6Z'
        />
        <path
          fill={currentFillNeck}
          d='M69.8,48.3c-1.1-2-1.7-3.4-2.6-5.1-.6,1.6-1,2.9-1.4,4.3,1.1.2,2.1.4,4.1.8Z'
        />
        <path
          fill={currentFillNeck}
          d='M244.6,23.3c-.4,0-.8,0-1.2,0-.5.9-.8,2-.9,3,.6,6.9,1.4,13.7,1.9,20.6.3,3.3.7,3.6,3.8,2.6,4-1.3,7.9-2.4,11.7-3.6-2.2-1.7-4.9-3.7-7.5-5.7-5.4-4.3-9.7-9-7.8-16.8Z'
        />
        <path
          fill={currentFillNeck}
          d='M223.5,45.8c3.6,1.1,7.3,2.2,11.2,3.5,3.4,1.1,3.9.8,4.1-2.7,0-.7.1-1.4.3-2,1.4-6.1,2-12.4,1.7-18.7-.2-1-.6-1.9-1.2-2.8-.3,0-.5.2-.8.3,0,.9.3,1.8.4,2.7.1,2.1-.3,4.2-1.1,6.2-.9,1.9-2.2,3.7-3.8,5l-10.8,8.6Z'
        />
      </g>
      <g id='shoulders'>
        <path
          fill={currentFillShoulders}
          d='M38.6,69.1c7.1-.2,13.2-7.3,16.5-18.1-.9-.4-1.8-.5-2.7-.3-.9.2-1.8.6-2.5,1.2-5.4,4.5-9.4,10.5-11.3,17.2Z'
        />
        <path
          fill={currentFillShoulders}
          d='M95.9,50.2c2.7,11,9,18.9,16.2,18.8-2-6.6-5.9-12.6-11.2-17-1.6-.8-3.3-1.4-5-1.8Z'
        />
        <path
          fill={currentFillShoulders}
          d='M101.1,65.3c-1.8-3.2-3.6-6-5.1-8.9-.7-1.4-1.7-2.6-2.9-3.5-1.2-.9-2.6-1.6-4.1-2-1.4-.4-2.8-.5-4.3-.2-1.4.3-2.7.9-3.9,1.8,8.1,1.8,13.7,7.9,20.3,12.8Z'
        />
        <path
          fill={currentFillShoulders}
          d='M49.5,65.2c6.6-4.8,12.3-11,20.6-13-1.3-.8-2.8-1.3-4.3-1.5-1.5-.2-3.1-.1-4.5.3-1.5.4-2.8,1.1-4,2.1-1.2,1-2.2,2.1-2.9,3.5-1.3,2.9-3.1,5.6-4.8,8.7Z'
        />
        <path
          fill={currentFillShoulders}
          d='M36.1,69.5c3.4-6.7,6.2-13.6,12.7-18.3-2.1-.7-4.3-.7-6.3.2-2,.9-3.6,2.5-4.4,4.6-1.8,4.2-2.5,8.8-2,13.4Z'
        />
        <path
          fill={currentFillShoulders}
          d='M114.4,69.4c.3-5.5.2-11.1-3.4-15.8-1.1-1.3-2.5-2.2-4.1-2.6-1.6-.4-3.3-.3-4.9.3,6.3,4.6,9.2,11.3,12.4,18.2Z'
        />
        <path
          fill={currentFillShoulders}
          d='M84.7,40.6c.3,1.2.8,2.4,1.5,3.3.7,1,1.7,1.8,2.8,2.4,1.1.6,2.3.9,3.5,1,1.2,0,2.5-.1,3.6-.6-3.9-2-7.6-4.1-11.5-6.2Z'
        />
        <path
          fill={currentFillShoulders}
          d='M54.3,46.9c1.2.4,2.4.6,3.6.5,1.2,0,2.4-.4,3.5-1,1.1-.6,2-1.4,2.8-2.4.8-1,1.3-2.1,1.6-3.3-4,1.9-7.7,4-11.5,6.2Z'
        />
        <path
          fill={currentFillShoulders}
          d='M212.7,48.7c0,.2,0,.5,0,.7,6.4,0,9.8,3.6,12.2,9,2.5,6.4,6.4,12.2,11.3,16.9.8.7,1.6,1.3,2.8,2.2.3-1.2.7-1.7.6-2.4-.2-6-.3-12.1-.6-18.2,0-1.3-.4-2.7-1.2-3.7s-2-1.8-3.3-2.1c-4.8-1.3-9.9-2.7-14.8-3.5-2.3,0-4.6.4-6.9,1.1Z'
        />
        <path
          fill={currentFillShoulders}
          d='M270.7,49.2c-.4-.3-.9-.5-1.4-.7-7.5-2.1-14.4.5-21.2,2.9-1.1.4-2.1,1.1-2.7,2-.7,1-1,2.1-.9,3.3-.2,6-.4,12.1-.5,18.2,0,.8.2,1.7.4,2.5.8-.4,1.6-.9,2.2-1.5,2.5-2.7,4.9-5.5,7.1-8.5,2.4-3.7,4.4-7.6,6.2-11.7.7-1.5,1.7-2.8,2.9-3.8,1.3-1,2.8-1.7,4.4-2,1.2-.1,2.4-.3,3.6-.6Z'
        />
        <path
          fill={currentFillShoulders}
          d='M218.1,53.1c-1.6-1.2-3.5-1.9-5.4-2.1-2-.1-3.9.3-5.7,1.3-2.4,2.2-4,5.2-4.6,8.4-.6,3.2-.2,6.5,1.2,9.5,4.7-5.6,9.6-11.3,14.5-17.1Z'
        />
        <path
          fill={currentFillShoulders}
          d='M265.2,53.1c4.9,5.8,9.8,11.5,14.5,17.1.3,0,.7-.2,1-.3.3-2.9.4-5.7.3-8.6-.9-9.2-8.2-12.8-15.7-8.2Z'
        />
        <path
          fill={currentFillShoulders}
          d='M226.5,70.8c-1.9-4.6-3.6-8.5-5.2-12.5-.8-1.6-2.2-2.4-3.8-1.1-3.3,2.8-5.5,6.5-6.3,10.7,4.9,1,9.9,1.8,15.3,2.8Z'
        />
        <path
          fill={currentFillShoulders}
          d='M256.8,70.8c5.4-1,10.3-1.9,15.3-2.8-.7-3.7-2.5-7.2-5.2-9.9-2-2.2-3.7-2-4.9.7-1.7,3.6-3.2,7.4-5.1,12Z'
        />
      </g>
      <g id='Cuádriceps'>
        <path
          fill={currentFillQuadriceps}
          d='M249.4,212.6c.4,0,.7,0,1.1,0,.8-2,1.6-4.1,2.4-6.2,1.6-4.6,3.6-9.1,4.8-13.9,2.8-11.2,1.1-22.3-.3-33.4-.1-1.4-.8-2.7-1.9-3.6-1.1-.9-2.4-1.4-3.8-1.3-1.3,8,.5,15.9,1.2,24,.6,6.6.7,13.2.2,19.8-.8,3.5-1.8,7-3.2,10.3-.4,1.4-.5,2.8-.5,4.2Z'
        />
        <path
          fill={currentFillQuadriceps}
          d='M231.7,154c-4,.6-5.6,2.2-6,5.8-.5,4.9-1.3,10-1.4,15-.3,5.2,0,10.4.9,15.5,1.8,7.6,4.7,15.1,7.3,22.8,2.5-2.2,1.4-4.3.5-6.1-4.5-9.9-4-20-2.4-30.2,1.3-7.5,1.6-15.1,1.1-22.7Z'
        />
        <path
          fill={currentFillQuadriceps}
          d='M263.2,209.2h.4c0-2.4.3-4.7.4-7.1,0-3.3.2-6.5.8-9.8,2.2-8.1,2.3-16.6.4-24.7-.8-4-2-7.4-5.6-9.1.5,5.2,1.4,10.7,1.5,16.1,0,6-1.1,12.1-.7,18.1.6,5.6,1.6,11.1,2.9,16.5Z'
        />
        <path
          fill={currentFillQuadriceps}
          d='M220,209.7c1-4.3,1.9-8.3,2.5-12.3.4-2.4.5-4.9.4-7.3,0-4.8-.7-9.7-.5-14.5.2-5.6,1-11.3,1.5-17.8-1.7,2-3.9,3.4-4.3,5.1-2.3,8.3-4.1,16.8-1.7,25.4,1.4,4.9,2,10,1.6,15.1,0,2.1.2,4.2.5,6.3h0Z'
        />
        <path
          fill={currentFillQuadriceps}
          d='M238.1,150.4c-3.5.3-4.1.9-4,3.8,0,3.2-.2,6.4,0,9.7.3,5.6.8,11.3,1.2,16.9h.8c1.6-10,2.3-20.2,2-30.3Z'
        />
        <path
          fill={currentFillQuadriceps}
          d='M247.7,180.9c.2-1.4.4-2.4.6-3.6.4-3.7,1-7.3,1.1-11.1,0-4.1-.4-8.1-.2-12.2.2-2.8-1.2-3.6-3.5-3.8-1.2,5.4.3,26.4,2,30.6Z'
        />
        <path
          fill={currentFillQuadriceps}
          d='M248.6,206.3c3.7-6.9,4.1-14.3,1.6-30.4-2.1,6.9-3.2,26.6-1.6,30.4Z'
        />
        <path
          fill={currentFillQuadriceps}
          d='M234.8,206.6c1.2-10.1.6-20.3-1.7-30.2-.4,3.6-.6,7.1-1.1,10.8-1.2,6.6-.3,13.4,2.8,19.4Z'
        />
      </g>
      <g id='legs'>
        <path
          fill={currentFillLegs}
          d='M80.3,275.5l.9.6c.5-.8.9-1.6,1.2-2.4,2.6-11.3,5.3-22.4,7.8-33.7,1.4-6.3,2.5-12.7,3.5-19,.2-1.4-.7-3.8-1.5-4.1-2.1-.6-2.5,1.7-3.3,3.2-.5.9-.8,1.9-1,2.9-.8,5-1.7,10.2-2.2,15.4-.8,7.6-.8,15.6-1.7,23.2-1,4.7-2.1,9.4-3.6,14Z'
        />
        <path
          fill={currentFillLegs}
          d='M69.6,276c.3-.2.5-.5.8-.7-3.1-8.8-4.8-17.9-5.2-27.2,0-6-.4-12.1-1.1-18.1-.6-3.8-1.6-7.6-3-11.2-.3-1-1.8-1.4-2.7-2.2-.6.9-1.1,1.9-1.4,3-.1,2.1,0,4.1.3,6.2,1.5,7.1,3.2,14.5,4.8,21.6,2,8.8,4.1,17.8,6.2,26.6.2.8.7,1.5,1.3,2Z'
        />
        <path
          fill={currentFillLegs}
          d='M55.9,230.5h-.8c0,3.1.2,6.2.7,9.3,2.6,11,5.4,21.8,8.2,32.7.3,1.4.7,2.7,1.1,4.4,1.1-2.2-7.5-44.1-9.2-46.5Z'
        />
        <path
          fill={currentFillLegs}
          d='M95.1,230.5c-.2,0-.4,0-.6,0-.3.5-.6,1-.7,1.5l-9.3,43.5c0,.3.5.8,1,1.5,1-4.4,1.8-8.2,2.8-12.2,2.2-8.7,4.6-17.5,6.7-26.3.3-2.6.4-5.3,0-7.9Z'
        />
        <path
          fill={currentFillLegs}
          d='M77.5,202.5c-.3,2.7-.2,5.4,0,8,1.5,5.7,3.6,11.4,5.4,17.1,1.1-4.4.6-9-1.5-13-1.6-3.9-2.9-8-4-12.1Z'
        />
        <path
          fill={currentFillLegs}
          d='M73,203.7c-1.5,4.2-2.8,8.6-4.6,12.9-1.5,3.5-1.8,7.4-.8,11,.5-2.6,1.4-5.1,2.5-7.4,2.7-5.1,3.7-10.8,2.9-16.5Z'
        />
        <path
          fill={currentFillLegs}
          d='M80.1,222.9c-1.9,6.5-2.2,13.4-.8,20,3.1-6.6,2-13.2.8-20Z'
        />
        <path
          fill={currentFillLegs}
          d='M71.3,242.9c2.1-6.7.5-13.3-.9-19.8-1.1,6.7-2.6,13.3.9,19.8Z'
        />
        <path
          fill={currentFillLegs}
          d='M82.5,242.3c-.4,0-.8,0-1.2-.2-3.7,8.2.8,16.8-1.3,25.1.3,0,.7,0,1,0,.5-8.3,1-16.6,1.4-25Z'
        />
        <path
          fill={currentFillLegs}
          d='M69.1,265.5h.6c.2-4,.5-7.8.7-11.9.4-7.7.2-9.3-2.2-11.5.3,8,.6,15.7,1,23.4Z'
        />
        <path
          fill={currentFillLegs}
          d='M94.8,199.7c-.2,0-.3,0-.5,0-1.6,5.1-3.3,10.2-5,15.7,1.3-.9,2.6-1.9,3.9-2.9.7-.5,1.2-1.2,1.5-2,.2-3.6,0-7.1,0-10.7Z'
        />
        <path
          fill={currentFillLegs}
          d='M61.2,215.2c-1.4-4.7-2.8-9-4.2-13.4-.2-.6-.5-1.1-1-2.2v12.3c1.8,1.2,3.3,2.1,5.2,3.4Z'
        />
        <path
          fill={currentFillLegs}
          d='M64.8,218c.8-2.4,1.3-4.2,1.8-6-1.3.4-2.2.7-3.4,1,.4,1.5.9,3,1.5,5Z'
        />
        <path
          fill={currentFillLegs}
          d='M85.8,218c.6-1.8,1.1-3.4,1.5-5.1-1.2-.3-2.2-.6-3.4-.9.6,2,1.2,3.9,1.8,6Z'
        />
        <path
          fill={currentFillLegs}
          d='M234.7,247.4c5-5.9-1.4-41.1-7.4-43.6,0,4.9,0,10.2,0,15.4.2,6,.7,12.1,1,18.2.2,2.1.8,4.1,2,5.8,1.1,1.8,2.7,3.2,4.5,4.2Z'
        />
        <path
          fill={currentFillLegs}
          d='M256.8,203.4c-.3,0-.5-.2-.8-.4-.8,1.2-1.5,2.5-2.1,3.9-1.1,2.8-1.8,5.7-2.8,8.5-2.6,7.1-4.2,14.6-4.6,22.2-.5,3.5.3,7,2.3,9.9,3.2-2.7,6.1-5,6.3-9.6.3-8.3.9-16.7,1.4-25,0-3.3.2-6.4.4-9.6Z'
        />
        <path
          fill={currentFillLegs}
          d='M260.6,200.7c-.9.3-1.6.8-2.1,1.5-.5.7-.7,1.6-.6,2.5,0,4.6-.3,9.4,0,14,.5,6.6,0,13.3-1.4,19.8-.3.6-.4,1.2-.4,1.9,0,.7.1,1.3.3,1.9.2.6.6,1.2,1.1,1.6.5.5,1,.8,1.6,1.1.2,0,.5-.2.6-.4.3-.2.5-.5.7-.8,3.1-5.3,4.5-11.4,4-17.6-1-6.9-2-13.8-3.1-20.7-.2-1.6-.3-3.3-.5-5Z'
        />
        <path
          fill={currentFillLegs}
          d='M224.1,245.2c3.7-2.6,3.4-2.6,2.9-6.4-.8-5.9-1.2-12-1.4-18-.3-5.6-.2-11.4-.4-17.1,0-1.1-1.1-2-1.5-3.1-.3,0-.6.3-.9.4-.5,3.7-1,7.4-1.4,11.2-.8,6-1.9,12.2-2.1,18.2,0,5.3,1.7,10.5,4.9,14.8Z'
        />
        <path
          fill={currentFillLegs}
          d='M230.7,287.4h.9c0-1,.2-1.8.3-2.8.7-7.8,1.2-15.8,1.9-23.7.6-5.4,1.7-11-3-15.3-.9-.8-2.6-1.6-3.4-1.3-1.5.7-3.2,1.7-2.5,4.2.8,2.7,1.4,5.5,1.8,8.3,1.3,9.5,2.4,18.7,3.7,28.2,0,.8,0,1.6.3,2.3Z'
        />
        <path
          fill={currentFillLegs}
          d='M251.9,287.4h.9c0-.8.3-1.4.4-2.2.9-7.6,1.5-15.5,2.6-23.1.6-4.5,1.7-9.1,2.7-13.6.5-2.2-1.2-3.3-2.5-4-.8-.4-2.4.5-3.2,1.2-4,3.5-4,8-3.5,12.8.9,8.8,1.5,17.7,2.2,26.5,0,.8.2,1.6.4,2.4h0Z'
        />
        <path
          fill={currentFillLegs}
          d='M255.1,287c.3,0,.7.2,1,.3.3-.8.5-1.5.7-2.3,0-1.4-.2-2.7,0-4.1.5-3.8,1.4-7.4,1.7-11.2.3-3.5,0-7,0-10.6h-1.3c-.7,9.3-1.4,18.5-2.2,27.9Z'
        />
        <path
          fill={currentFillLegs}
          d='M227.5,287.4c0-5.1.3-10,0-14.6-.4-4.5-1.4-9-2-13.6-.3,0-.5,0-.8,0,0,3.2-.2,6.4,0,9.6.2,3.3.7,6.5,1.6,9.7,1,2.8-1.1,6.3,1.2,8.9Z'
        />
      </g>
      <g id='back'>
        <path
          fill={currentFillBack}
          d='M239.7,128.9c.2-.7.4-1.5.4-2.2-.4-12-.7-23.8-1.3-35.7.2-3.4-.7-6.8-2.6-9.6-3.7-4.9-9.2-8.3-15.3-9.5-3.1-.4-6.1-1-9.8-1.5.5,1.9.7,3.1,1.1,4.2,4.3,12.5,8.6,24.8,13.1,37.2.8,2,2,3.8,3.4,5.4,2.6,3.1,5.4,6,8.1,9,1,1,1.7,1.6,2.8,2.7Z'
        />
        <path
          fill={currentFillBack}
          d='M272,70.9c-1,0-1.9,0-2.9,0-4.2.7-8.3,1.6-12.4,2.8-4.6,2-8.4,5.4-10.9,9.7-.6.8-.9,1.9-1,2.9-.7,13-1.3,26-1.8,39,0,1.1.2,2.1.3,3.2.5.3.9.7,1.4,1,.3-.9.7-1.8,1.2-2.6,2.3-2.8,4.9-5.5,7.2-8.4,1.9-2.1,3.5-4.4,4.7-6.9,3.8-9.9,7.2-19.7,10.8-29.7,1.2-3.6,2.1-7.1,3.4-11Z'
        />
        <path
          fill={currentFillBack}
          d='M225,116.3c-1.5-4.4-2.9-8.8-4.3-13.3,0,0-.2,0-.3.2-.2,4.8-.5,9.8-.7,14.7,1.7-.5,3.3-1,5.3-1.5Z'
        />
        <path
          fill={currentFillBack}
          d='M263.8,117.7c-.4-4.8-.7-9.4-1-13.8-.2,0-.4,0-.6,0-1.3,4.1-2.5,8.2-3.9,12.5,2.2.7,3.7,1.1,5.4,1.5Z'
        />
      </g>
      <g id='glutes'>
        <path
          fill={currentFillGlutes}
          d='M55.8,192.2c-.8-5.1-1.6-10.4-2.2-15.6-1.2-9.5-1.3-19-.5-28.5.6-6.3,1.2-12.6,1.6-18.8,0-1.1-.3-2.1-.7-3.1-.3,0-.6,0-1,.2-5.2,21.8-4.3,44.5,2.7,65.8Z'
        />
        <path
          fill={currentFillGlutes}
          d='M94.7,193.2c7-21.6,7.8-44.8,2.3-66.8-.6.5-1,1.2-1.2,1.9,0,1.6,0,3.3.2,4.9.6,7.3,1.4,14.8,1.7,22.2.5,12.7-.6,25.3-3.1,37.8Z'
        />
        <path
          fill={currentFillGlutes}
          d='M72.6,176.7c-2.9-16.4-10.3-31.2-16.5-46.9-.5,4.5.2,9.1,2,13.3,4.6,11.1,9.6,22.3,14.5,33.6Z'
        />
        <path
          fill={currentFillGlutes}
          d='M78.5,176.2c1.2-3,2.2-6.1,3.5-9.1,3.4-7.8,7-15.7,10.3-23.7,1.9-4.2,2.6-8.8,2-13.3-6.1,15.2-13.2,29.8-15.8,46.1Z'
        />
        <path
          fill={currentFillGlutes}
          d='M79.5,164.4c.9-2.9,1.8-5.8,2.6-8.8.2-1.1.1-2.2-.3-3.2-1.4-3-3.1-5.8-4.6-8.5-1.2,6.9-.4,14,2.3,20.5Z'
        />
        <path
          fill={currentFillGlutes}
          d='M71.1,165c2.4-6.9,3.2-14.3,2.3-21.6-1.4,2.7-3,5.4-4.3,8.1-.6.9-1,2-1,3.1.8,3.4,1.8,6.7,3,10.4Z'
        />
        <path
          fill={currentFillGlutes}
          d='M66,137.9c-3.4,4.9-2.1,9.4,1.4,13.4,5.7-8.5,5.4-9.5-1.4-13.4Z'
        />
        <path
          fill={currentFillGlutes}
          d='M84.3,137.4c-1.6,1.4-3.3,2.9-4.8,4.4-.3.4-.5,1-.4,1.5,1.2,2.6,2.3,5.2,3.7,8.2,3.9-4.5,5.3-8.8,1.5-14.2Z'
        />
        <path
          fill={currentFillGlutes}
          d='M101.3,140.6c.2-5.3-.4-10.6-1.8-15.6-.3,0-.6,0-.9,0,1,5.1,1.8,10.3,2.7,15.6Z'
        />
        <path
          fill={currentFillGlutes}
          d='M88.3,134.6c-2.9,1.7-3,3.9-.2,6.2,1.3-2,2.2-4.1.2-6.2Z'
        />
        <path
          fill={currentFillGlutes}
          d='M62,134.6c-.7.9-1,2.1-.9,3.2.1,1.1.6,2.2,1.4,3,2.5-2.7,2.3-4.7-.6-6.2Z'
        />
        <path
          fill={currentFillGlutes}
          d='M48.8,139.5c.2,0,.4,0,.6,0,.8-4.7,1.6-9.6,2.4-14.3-.4,0-.8,0-1.2-.2-.7,4.7-1.3,9.5-1.8,14.4Z'
        />
        <path
          fill={currentFillGlutes}
          d='M219.3,160.2c2.9-3.8,6.7-6.8,11.2-8.5.7-.3,1.4-.7,2-1.2,1.4-.7,2.4-1.8,3-3.2.6-1.4.6-3,.2-4.4-.9-4.4-1.6-8.9-2.2-13.5-.7-4.9-1.3-5.3-5.8-3.2,0,0,0,0-.2,0-8.8,4.3-12.9,14.2-10.4,25.1.6,2.7,1.4,5.5,2.2,8.8h0Z'
        />
        <path
          fill={currentFillGlutes}
          d='M264.6,159.3c.9-4.2,1.7-8.5,2.1-12.7.6-4.4-.4-8.9-2.7-12.7-2.3-3.8-5.8-6.7-10-8.3-2.9-1.1-3.6-.7-4.1,2.4-.7,4.3-1.4,8.6-2.1,13-1.2,6.6-.5,7.7,5.4,11.1,3.9,2.2,7.7,4.5,11.3,7.1Z'
        />
        <path
          fill={currentFillGlutes}
          d='M266.8,135.4c-1-4.3-1.6-8.7-2.9-13,0-.6-.3-1.2-.6-1.7-.3-.5-.7-1-1.2-1.3-.5-.4-1.1-.6-1.7-.8-.6-.1-1.2-.2-1.8,0-1.3,0-2.6.5-3.6,1.3-1,.8-1.8,1.9-2.2,3.2q10.3,6,14,12.5Z'
        />
        <path
          fill={currentFillGlutes}
          d='M216.6,135c.2,0,.5.2.7.3,1.6-7.1,7.2-10.1,13.5-12.4-.6-1.4-1.6-2.6-2.9-3.4-1.3-.8-2.8-1.2-4.4-1-3.1.4-4.1,2.6-4.6,5.1-1,3.9-1.5,7.6-2.3,11.4Z'
        />
        <path
          fill={currentFillGlutes}
          d='M239,145.8c.3-.1.7-.2,1.1-.2,0-1.7.1-3.4.4-5,.4-1.1.5-2.3.4-3.4,0-1.2-.4-2.3-1-3.3-.6-1-1.3-1.9-2.2-2.7-.9-.7-2-1.3-3.1-1.6,1.4,5.6,3,10.9,4.4,16.2Z'
        />
        <path
          fill={currentFillGlutes}
          d='M243.3,145.6c3-4.6,4.7-10,4.7-15.6-1.8.4-3.3,1.5-4.3,3.1-1,1.6-1.3,3.4-.9,5.2.3,2.5.4,4.9.5,7.2Z'
        />
        <path
          fill={currentFillGlutes}
          d='M215.1,170.8c1.6-2.7,2.4-5.7,2.4-8.8s-.8-6.1-2.4-8.8v17.6Z'
        />
        <path
          fill={currentFillGlutes}
          d='M267,171.5h.9v-17.6c-1.2,1.7-2,3.7-2.2,5.8.2,4.1,1,7.9,1.4,11.8Z'
        />
      </g>
      <g id='triceps'>
        <path
          fill={currentFillTriceps}
          d='M273.9,66.3c-.4,4.1-.8,7.8-1.1,11.7-.3,3.1-.4,6.2-.3,9.3.5,4.3,2.4,8.2,5.3,11.4.4-5.7.5-11.6,1.1-17.3.3-2.7,0-5.5-.9-8.1-.9-2.6-2.3-5-4.1-7Z'
        />
        <path
          fill={currentFillTriceps}
          d='M205,98.7c1.8-1.6,3.3-3.6,4.3-5.8,1-2.2,1.6-4.6,1.6-7.1,0-6.4-.9-12.9-1.4-19.5-2,2.1-3.5,4.7-4.4,7.5-.9,2.8-1.1,5.8-.6,8.7,1,5.4,1.2,10.9.4,16.3Z'
        />
        <path
          fill={currentFillTriceps}
          d='M198.6,93.9c1.4-6.9,3-13.8,4.6-21.4-3.7,6.5-5.4,14-4.6,21.4Z'
        />
        <path
          fill={currentFillTriceps}
          d='M280.1,72.4c1.6,7.5,3.2,14.9,4.7,22.2.8-7.7-.9-15.5-4.7-22.2Z'
        />
        <path
          fill={currentFillTriceps}
          d='M280.9,81.7h-.8c0,4,0,8,0,12.1,0,.6.8,1.3,1.2,1.8.5-.7,1.4-1.4,1.3-1.9-.5-4-1.2-7.9-1.7-12Z'
        />
        <path
          fill={currentFillTriceps}
          d='M203.4,81.7h-1c-.6,4-1.2,7.8-1.5,11.9,0,.7.9,1.4,1.4,2,.4-.7,1.1-1.4,1.1-2,.2-1.9,0-4,0-5.9v-6Z'
        />
      </g>
      <g id='head'>
        <path
          fill={currentFillHead}
          d='M74.5,7.9c0-1.8,0-4.1,0-6.3-.2-.4-.5-.7-.8-1-.4-.3-.8-.4-1.2-.5-4.8,0-6.4,2.7-4.8,7.1,2.5.2,4.8.5,7,.7Z'
        />
        <path
          fill={currentFillHead}
          d='M83.2,7.3c.4-1,.6-2.1.5-3.2-.4-1.2-1.2-2.3-2.3-2.9-1.6-.5-3.2-.8-4.8-.9,0,0-.3.4-.3.7-.2,2.4-.4,4.8-.5,6.8,2.5-.2,4.9-.3,7.4-.5Z'
        />
        <path
          fill={currentFillHead}
          d='M69.8,25.7c2.2,3.3,9.3,3.2,10.9,0h-10.9Z'
        />
        <path
          fill={currentFillHead}
          d='M83.7,14c0-3.3-1-5.1-2.8-5.4-2-.4-3.8,1.2-4.5,4.3.5-.4,1.2-.7,1.8-.9.7-.2,1.4-.2,2-.1.7,0,1.3.3,1.9.7.6.4,1.1.8,1.5,1.4Z'
        />
        <path
          fill={currentFillHead}
          d='M74.1,12.8c-.5-3-2.1-4.5-4.2-4.2-1.9.3-3.1,2.1-2.9,5,.9-1,2.1-1.6,3.4-1.7,1.3-.1,2.6.2,3.7.9Z'
        />
        <path
          fill={currentFillHead}
          d='M76.7,13.9c.4,1.1,1.2,2.1,2.3,2.7,1,.6,2.3.8,3.4.5.8-.2,1.2-1.4,2-2.6-3.2-.3-5.3-.4-7.7-.6Z'
        />
        <path
          fill={currentFillHead}
          d='M69.7,24.2h11.1c-1.6-1.3-3.5-2-5.6-2s-4,.7-5.6,2Z'
        />
        <path
          fill={currentFillHead}
          d='M74,13.9c-2.4.2-4.7.4-7.5.6.5,1,.6,2.1,1.3,2.5,1.7,1,5.3-.8,6.3-3.1Z'
        />
        <path
          fill={currentFillHead}
          d='M82.3,27.9c-3.7.2-4.7,2.7-6.1,5.5,3.5-.5,4.8-2.8,6.1-5.5Z'
        />
        <path
          fill={currentFillHead}
          d='M85.4,14.8c2.1-4,1.9-7.4-.2-9.6-1.7,3.2.6,6.1.2,9.6Z'
        />
        <path
          fill={currentFillHead}
          d='M65.2,5.2c-2.2,2.2-2.3,4.4-.6,9.4.5-3.3,1.9-6.2.6-9.4Z'
        />
        <path
          fill={currentFillHead}
          d='M73.9,33.3c-1.2-4-2.1-4.9-5.6-5.3.3,1.3,1,2.6,2,3.5,1,.9,2.2,1.6,3.6,1.8Z'
        />
        <path
          fill={currentFillHead}
          d='M85.8,21.2c-1.2,3.1-2.1,5.9-3.2,8.7,3.5-2.1,5.2-6.4,3.2-8.7Z'
        />
        <path
          fill={currentFillHead}
          d='M67.7,30c-1-2.7-1.6-4.9-2.4-7.2-.2-.5-.5-.9-.9-1.3-.2.5-.7,1-.7,1.4,0,1.4.3,2.8,1,4.1.7,1.3,1.7,2.3,2.9,3.1Z'
        />
        <path
          fill={currentFillHead}
          d='M82.1,24.2c.9-1,1.7-2.1,2.4-3.3.2-.4.2-1.3,0-1.4-.3-.3-1.4-.4-1.4-.2-1,1.4-2.4,2.7-.9,4.9Z'
        />
        <path
          fill={currentFillHead}
          d='M68.2,24c1.9-1.7.3-3.1-.4-4.4-.2-.3-1.1-.3-1.6-.5,0,.6-.5,1.3-.3,1.7.7,1.1,1.5,2.2,2.3,3.2Z'
        />
        <path
          fill={currentFillHead}
          d='M70.1,21.8c2.4-.7,2-2.2,1.5-4.1-1.1.3-1.9.6-3,.9.5,1.2.9,2,1.4,3.2Z'
        />
        <path
          fill={currentFillHead}
          d='M82,18.6c-1.2-.3-2.1-.6-3.1-.9q-.5,3,1.5,4c.5-1.1,1-2.1,1.5-3.1Z'
        />
        <path
          fill={currentFillHead}
          d='M239.7,7.6c-2.9,1.6-5.8,3-8.4,4.8-.9.6-.7,2.2,1.1,2.2,1.4,0,2.7-.2,4.1-.6,3.7-.8,4.3-1.9,3.3-6.5Z'
        />
        <path
          fill={currentFillHead}
          d='M243.6,7.7c-1.1,4.3-.4,5.5,3.3,6.4.7.2,1.5.4,2.2.5,1.1-.1,2.2-.4,3.3-.7-.7-.9-1.5-1.8-2.3-2.6-1-.8-2-1.4-3.1-1.9-1.1-.6-2.2-1.2-3.4-1.6Z'
        />
        <path
          fill={currentFillHead}
          d='M234.2,30.9c4.2-4.2,4.2-7.2,0-11.9v11.9Z'
        />
        <path
          fill={currentFillHead}
          d='M249.1,18.5c-4.2,5.4-4.2,8.9-.4,12.7.9-4.2,1-8.5.4-12.7Z'
        />
        <path
          fill={currentFillHead}
          d='M251.1,25.2c.4,0,.8,0,1.2,0,0-1.7.2-3.6.2-5.3s-.8-.7-1.2-1.1c-.3.4-1,.9-1,1.3.2,1.8.4,3.5.8,5.2Z'
        />
        <path
          fill={currentFillHead}
          d='M231.1,25.2h1.3c.2-1.7.5-3.5.6-5.1,0-.4-.6-.9-.9-1.3-.4.4-1.1.8-1.1,1.2,0,1.7,0,3.5,0,5.2Z'
        />
        <path
          fill={currentFillHead}
          d='M243.5.8c-.3.5-.5.9-.8,1.4,2.3,1,4.6,1.9,7.1,2.9,0-.3.3-.5.4-.8l-6.7-3.5Z'
        />
        <path
          fill={currentFillHead}
          d='M233.4,5c2.4-1,4.7-1.9,7.5-3.1-1.4-.4-2.9-.3-4.3.2-1.4.6-2.5,1.6-3.2,2.9Z'
        />
      </g>
      <g id='hands'>
        <path
          fill={currentFillHands}
          d='M17.9,136.9c-1.8,1.5-3.4,3.1-5.1,4.4-1.6,1.2-3.6,2-5.3,3.2-2,1.4-2,2.8.3,3.7,2.6.9,5.2,1.5,7.9,1.8,3,.4,3.5-.4,2.6-3.3-.3-.7-.4-1.3-.5-2,0-2.5,0-5.1,0-7.8Z'
        />
        <path
          fill={currentFillHands}
          d='M133.2,138c-.5,2.9-1,6.5-1.5,10.2-.3,1.7,1,1.9,2,1.8,2.6-.3,5.3-.7,7.8-1.4,1.1-.3,1.9-1.4,3-2.2-.8-.9-1.6-1.8-2.5-2.6-3.1-2.2-6.2-4.2-8.8-5.9Z'
        />
        <path
          fill={currentFillHands}
          d='M5.4,139.9c5.6,1.4,9.7-.3,10.7-4.2-2-.3-4,0-5.9.6-1.9.7-3.5,1.9-4.8,3.5Z'
        />
        <path
          fill={currentFillHands}
          d='M134.2,135.7c.4,1,1,1.9,1.8,2.6.8.7,1.7,1.3,2.7,1.7,1,.4,2.1.5,3.1.5,1.1,0,2.1-.3,3.1-.8-1.3-1.5-3-2.6-4.8-3.3-1.9-.7-3.9-.9-5.8-.6Z'
        />
        <path
          fill={currentFillHands}
          d='M140.6,150.3l-.6.9c1.1,2.4,2,4.8,3.2,7.2.3.6,1.1.9,1.5,1.4.2-.7.3-1.5.2-2.2-.8-2-1.7-4.1-2.7-6.1-.3-.6-1.1-.8-1.6-1.2Z'
        />
        <path
          fill={currentFillHands}
          d='M9.5,150.2c-.3,0-.5,0-.8,0-1.2,2.6-2.3,5.1-3.5,7.7-.2.5.2,1.2.3,1.7.5-.4,1.3-.6,1.4-1.1,1.1-2.1,2.1-4.3,2.9-6.6.4-.5-.2-1.3-.4-1.9Z'
        />
        <path
          fill={currentFillHands}
          d='M144.8,142.9c1.5,1,2.8,1.8,4.2,2.6.5.2,1.2-.2,1.8-.3,0-.6-.1-1.3-.4-1.8-.8-.7-1.6-1.3-2.5-1.8-1.6-1.3-2.6-.8-3.2,1.4Z'
        />
        <path
          fill={currentFillHands}
          d='M6.2,149.6c-.2-.3-.4-.8-.6-.8-.2,0-.4,0-.6,0-.2,0-.4.1-.6.2-1.4,2.1-2.7,4.3-4,6.6,0,.2,0,.4,0,.6,0,.2.2.3.3.5,0,0,.8,0,.9,0,1.5-2.2,3-4.5,4.4-7h0Z'
        />
        <path
          fill={currentFillHands}
          d='M138.9,160.1c.4,0,.7-.2,1.1-.3.4-3-1.4-5.4-2.2-8.1,0-.3-1-.4-2.1-.7,1.3,3.4,2.3,6.3,3.3,9.1Z'
        />
        <path
          fill={currentFillHands}
          d='M149.1,157.2c.4-.2.9-.5,1.3-.7-1.2-2.7-2.7-5.3-4.4-7.7,0-.2-1,.3-1.7.5,1.7,2.7,3.3,5.2,4.9,7.9Z'
        />
        <path
          fill={currentFillHands}
          d='M10.6,160c.3,0,.7,0,1,.2,1-2.7,1.8-5.5,2.7-8.2,0-.2-.6-.8-.8-.7-.4.2-.8.5-1.1.9-.8,2-1.4,4.1-2,6.1-.2.5,0,1.2.2,1.7Z'
        />
        <path
          fill={currentFillHands}
          d='M130.3,145.7c.4,0,.8,0,1.3-.2,0-2.2-.2-4.5-.5-6.8,0-.4-.7-.8-1-1.2-.4.4-1,.9-1,1.3.3,2.3.8,4.6,1.2,6.9Z'
        />
        <path
          fill={currentFillHands}
          d='M19.4,137.1c-.2,3.1-.3,5.6-.4,8.1,3-3.5,3.1-6.3.4-8.1Z'
        />
        <path
          fill={currentFillHands}
          d='M15.1,158.3c.4,0,.8.2,1.3.3.7-2.1,1.4-4.2,1.9-6.4,0-.2-.3-.8-.4-.8-.4,0-1,.2-1,.4-.5,2-1.2,4.2-1.8,6.5Z'
        />
        <path
          fill={currentFillHands}
          d='M134.1,158.6c.3,0,.5,0,.8-.2.2-1.4,0-2.8-.5-4.1-.5-1.3-1.4-2.4-2.5-3.3.8,2.7,1.4,5.2,2.2,7.5Z'
        />
        <path
          fill={currentFillHands}
          d='M304.7,150.1c-.2.3-.4.5-.6.8,1,2.5,1.7,4.9,2.8,7.4.4.6.9,1.1,1.5,1.4,0-.8.5-1.5.3-2.2-.6-2-1.3-4-2.2-6-.4-.7-1.3-1-1.8-1.5Z'
        />
        <path
          fill={currentFillHands}
          d='M174.2,159.6c.4,0,.7.3,1.1.4,1.7-2.8,3-5.8,3.8-8.9,0,0-.6-.7-.9-.7-.5.1-.9.4-1.2.8-.8,1.7-1.4,3.5-2,5.3-.3,1-.5,2-.8,3.1Z'
        />
        <path
          fill={currentFillHands}
          d='M311.2,140.6c-.5.3-1,.8-1.4,1.3,0,.2-.1.4-.1.7s0,.5.1.7c1.3,1,2.6,1.9,4.1,2.7.2,0,.5,0,.7,0,.2,0,.5-.2.6-.3.3-.3.4-1.2,0-1.4-1.3-1.3-2.7-2.5-4.2-3.7Z'
        />
        <path
          fill={currentFillHands}
          d='M172.3,140.7c-1.3.9-2.6,1.8-3.9,2.9-.4.4-.3,1.3-.4,1.9.7,0,1.5.4,2,0,.9-.4,1.5-1.2,2.3-1.5,1.9-1.1,1.6-2.1,0-3.4Z'
        />
        <path
          fill={currentFillHands}
          d='M175.1,149.1c-2.3-.3-5.4,4.8-4.8,7.9,1.9-2.4,3.5-5.1,4.8-7.9Z'
        />
        <path
          fill={currentFillHands}
          d='M300.5,150.6l-.5.5c.7,2.5,1.3,5,2,7.5,0,.4.9.6,1.3.9.2-.4.6-1,.5-1.3-.6-2.2-1.2-4.4-1.9-6.6,0-.5-.9-.8-1.4-1.1Z'
        />
        <path
          fill={currentFillHands}
          d='M313.4,157.1c.3-.2.5-.4.8-.6-1.3-2.4-2.5-4.9-3.8-7.3-.2-.3-.9-.3-1.3-.4-.2.4-.2.9-.2,1.4,1,2,2,4.1,3.2,6.1.2.5.9.6,1.3.9Z'
        />
        <path
          fill={currentFillHands}
          d='M179.1,159.7c1,0,1.4,0,1.4,0,.9-2.6,1.7-5.3,2.5-7.9,0-.2-.4-.7-.6-.7-.4,0-.8.1-1.1.4-.8,2.5-1.5,5.3-2.3,8.3Z'
        />
        <path
          fill={currentFillHands}
          d='M307.4,144.5c0-1.5-.5-2.9-1.2-4.1-.7-1.2-1.8-2.3-3-3-.2,0-.3,0-.5,0-.2,0-.3.1-.4.3-.1.4-.1.8,0,1.2,1.5,1.7,3.2,3.5,5.1,5.7Z'
        />
        <path
          fill={currentFillHands}
          d='M181.5,138.1l-.3-.6c-.6,0-1.4,0-1.6.4-1.5,1.7-4.6,2.6-3.5,6.5,1.8-2.3,3.6-4.2,5.4-6.3Z'
        />
        <path
          fill={currentFillHands}
          d='M185.9,149.9c-.6,2.9-1.1,5.3-1.4,7.7.2,0,.5,0,.7,0,1.5-2.2,2.2-6.2.8-7.8Z'
        />
        <path
          fill={currentFillHands}
          d='M297.7,158c.3,0,.6,0,.9-.2.2-1.4,0-2.8-.4-4.2-.5-1.3-1.3-2.5-2.3-3.5.7,2.9,1.3,5.3,1.8,7.8Z'
        />
        <path fill={currentFillHands} d='M178.4,144.6l.7,2,3.2-5.7-3.9,3.7Z' />
        <path fill={currentFillHands} d='M181.6,146.8h1.5l.9-5.3-2.4,5.3Z' />
        <path fill={currentFillHands} d='M185.2,146.8h1.5l.5-5.8-2,5.8Z' />
        <path fill={currentFillHands} d='M296.3,141.5l.7,5.3h1.4l-2-5.3Z' />
        <path
          fill={currentFillHands}
          d='M299.6,141.4l1.1,5.4h1.4v-1.3l-2.4-4.2Z'
        />
        <path fill={currentFillHands} d='M302,140.3l2.3,6.3,1-1.5-3.3-4.7Z' />
      </g>
      <g id='feet'>
        <path
          fill={currentFillFeet}
          d='M67.4,287.4l.7.7c.6-.6,1.6-1,1.7-1.6.4-2.5.6-5,.8-7.6,0-.5-.6-1-1-1.5-.4.4-1.1.8-1.2,1.3-.5,2.8-.8,5.7-1.1,8.8Z'
        />
        <path
          fill={currentFillFeet}
          d='M82.4,288l.7-.7c-.3-2.9-.6-5.8-1-8.6,0-.5-.8-.9-1.2-1.4-.4.6-1.1,1.2-1.1,1.6.2,2.5.5,4.9.9,7.3.2.7,1.1,1.2,1.6,1.6Z'
        />
        <path
          fill={currentFillFeet}
          d='M86.1,287.9c-.6-3.5-.4-6.8-2.3-9.5,0,2.8.3,5.6.8,8.3,0,.6,1,.8,1.5,1.2Z'
        />
        <path
          fill={currentFillFeet}
          d='M63.9,287.8c2.1-.4,3.4-5.3,3-9.4-.3,0-.5,0-.8-.2-.8,3-1.4,6.1-2.2,9.6Z'
        />
        <path
          fill={currentFillFeet}
          d='M73.1,278.4h-.9c-.3,2.7-.6,5.4-.8,8.1,0,.4.6.8,1,1.2.2-.4.7-.8.7-1.2v-8.1Z'
        />
        <path
          fill={currentFillFeet}
          d='M78.5,278.4h-1v8.3c0,.3.6.7,1,.9,0,0,.8-.5.8-.7-.3-2.9-.6-5.7-.8-8.5Z'
        />
        <path
          fill={currentFillFeet}
          d='M86.1,280.2c1.2,6,2.1,7.3,4.1,6.4-1.4-2-2.6-4.1-4.1-6.4Z'
        />
        <path
          fill={currentFillFeet}
          d='M71.3,293.8c.9,0,1.5-1,1.5-2.3s-.7-2.3-1.5-2.3-1.5,1-1.5,2.3.7,2.3,1.5,2.3Z'
        />
        <path
          fill={currentFillFeet}
          d='M79,293.8c.9,0,1.5-1,1.5-2.3s-.7-2.3-1.5-2.3-1.5,1-1.5,2.3.7,2.3,1.5,2.3Z'
        />
        <path
          fill={currentFillFeet}
          d='M84.6,292.9h-.2c-.1.2-.3.2-.5.2-.2,0-.3-.1-.4-.3l-.8-1.4c0-.1-.1-.3,0-.5,0-.2.1-.3.3-.4h.2c.1-.2.3-.2.5-.2.2,0,.3.1.4.3l.8,1.4c0,.1.1.3,0,.5,0,.2-.1.3-.3.4Z'
        />
        <path
          fill={currentFillFeet}
          d='M87.8,292.9h-.2c-.1.2-.3.2-.5.2-.2,0-.3-.1-.4-.3l-.8-1.4c0-.1-.1-.3,0-.5,0-.2.1-.3.3-.4h.2c.1-.2.3-.2.5-.2.2,0,.3.1.4.3l.8,1.4c0,.1.1.3,0,.5,0,.2-.1.3-.3.4Z'
        />
        <path
          fill={currentFillFeet}
          d='M90.3,292h-.2c-.1.2-.3.2-.5.2-.2,0-.3-.1-.4-.3l-.8-1.4c0-.1-.1-.3,0-.5,0-.2.1-.3.3-.4h.2c.1-.2.3-.2.5-.2.2,0,.3.1.4.3l.8,1.4c.2.4,0,.8-.2.9Z'
        />
        <path
          fill={currentFillFeet}
          d='M92.5,291.3h-.2c-.1.2-.3.2-.5.2-.2,0-.3-.1-.4-.3l-.8-1.4c0-.1-.1-.3,0-.5,0-.2.1-.3.3-.4h.2c.1-.2.3-.2.5-.2.2,0,.3.1.4.3l.8,1.4c0,.1.1.3,0,.5,0,.2-.1.3-.3.4Z'
        />
        <path
          fill={currentFillFeet}
          d='M65.3,293.3h.2c.1.2.3.2.5.2.2,0,.3-.1.4-.3l.8-1.4c0-.1.1-.3,0-.5s-.1-.3-.3-.4h-.2c-.1-.2-.3-.2-.5-.2-.2,0-.3.1-.4.3l-.8,1.4c0,.1-.1.3,0,.5,0,.2.1.3.3.4Z'
        />
        <path
          fill={currentFillFeet}
          d='M62.6,292.8h.2c.1.2.3.2.5.2.2,0,.3-.1.4-.3l.8-1.4c0-.1.1-.3,0-.5,0-.2-.1-.3-.3-.4h-.2c-.1-.2-.3-.2-.5-.2s-.3.1-.4.3l-.8,1.4c0,0-.1.1-.1.2,0,0,0,.2,0,.3,0,0,0,.2.1.2,0,0,.1.1.2.1Z'
        />
        <path
          fill={currentFillFeet}
          d='M60.2,292h.2c.1.2.3.2.5.2.2,0,.3-.1.4-.3l.8-1.4c0-.1.1-.3,0-.5,0-.2-.1-.3-.3-.4h-.2c-.1-.2-.3-.2-.5-.2-.2,0-.3.1-.4.3l-.8,1.4c0,.1-.1.3,0,.5,0,.2.1.3.3.4Z'
        />
        <path
          fill={currentFillFeet}
          d='M58,291.2h.2c.1.2.3.2.5.2.2,0,.3-.1.4-.3l.8-1.4c0-.1.1-.3,0-.5,0-.2-.1-.3-.3-.4h-.2c-.1-.2-.3-.2-.5-.2-.2,0-.3.1-.4.3l-.8,1.4c-.2.4,0,.8.2.9Z'
        />
        <path
          fill={currentFillFeet}
          d='M228,291.8c0-.7,0-1.5-.3-2.1s-.6-1.3-1.1-1.8c-.5-.5-1.1-.9-1.8-1.2-.7-.3-1.4-.4-2.1-.3,1.7,1.8,3.4,3.6,5.3,5.5Z'
        />
        <path
          fill={currentFillFeet}
          d='M255.1,291.2c1.2-.4,2.3-1.1,3.2-2.1.9-1,1.5-2.1,1.7-3.4-3.4,1.4-5.4,3.5-4.9,5.5Z'
        />
        <path
          fill={currentFillFeet}
          d='M249.3,288.6c.4-.2.7-.3,1.1-.5-.8-1.6-1.5-3.3-2.2-4.9-.4.2-.7.3-1.1.5-1.4,2.5,2.1,3,2.2,4.9Z'
        />
        <path
          fill={currentFillFeet}
          d='M232.9,288.1c.2,0,.5.2.7.3q3.4-3.8,1.4-5.2l-2,4.9Z'
        />
        <path
          fill={currentFillFeet}
          d='M231.4,291h-.4c-.3,0-.5-.1-.7-.3-.2-.2-.3-.5-.3-.7v-.4c0-.3.1-.5.3-.7.2-.2.5-.3.7-.3h.4c.3,0,.5.1.7.3s.3.5.3.7v.4c0,.3-.1.5-.3.7-.2.2-.5.3-.7.3Z'
        />
        <path
          fill={currentFillFeet}
          d='M252.5,291h-.4c-.3,0-.5-.1-.7-.3-.2-.2-.3-.5-.3-.7v-.4c0-.3.1-.5.3-.7s.5-.3.7-.3h.4c.3,0,.5.1.7.3.2.2.3.5.3.7v.4c0,.1,0,.3,0,.4,0,.1-.1.3-.2.4-.1.1-.2.2-.4.2s-.3,0-.4,0Z'
        />
      </g>
    </svg>
  )
}

export default Body
