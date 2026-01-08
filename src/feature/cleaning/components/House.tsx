import { useLayoutEffect, useState } from 'react'

import HouseFigure from '../assets/svgs/HouseFigure'
import { iCompletedCleaningTasks } from '../types/completedCleaningTasks'
import chosenColor from '../utils/chosenColor'

const House = ({
  color,
  completedCleaningTasks
}: {
  color: string
  completedCleaningTasks: iCompletedCleaningTasks[]
}) => {
  const [currentFillStairs, setCurrentFillStairs] = useState('current')
  const [currentFillLivingRoom, setCurrentFillLivingRoom] = useState('current')
  const [currentFillMainRoom, setCurrentFillMainRoom] = useState('current')
  const [currentFillNorthTerrace, setCurrentFillNorthTerrace] =
    useState('current')
  const [currentFillBasementRoom, setCurrentFillBasementRoom] =
    useState('current')
  const [currentFillKitchen, setCurrentFillKitchen] = useState('current')
  const [currentFillStudio, setCurrentFillStudio] = useState('current')
  const [currentFillSouthTerrace, setCurrentFillSouthTerrace] =
    useState('current')
  const [currentFillBasement, setCurrentFillBasement] = useState('current')
  const [currentFillAtticBathroom, setCurrentFillAtticBathroom] =
    useState('current')
  const [currentFillKitchenBathroom, setCurrentFillKitchenBathroom] =
    useState('current')
  const [currentFillWorkshop, setCurrentFillWorkshop] = useState('current')
  const [currentFillGarage, setCurrentFillGarage] = useState('current')
  const [currentFillStudioBathroom, setCurrentFillStudioBathroom] =
    useState('current')
  const [currentFillMainroomBathroom, setCurrentFillMainroomBathroom] =
    useState('current')
  const [currentFillAttic, setCurrentFillAttic] = useState('current')

  useLayoutEffect(() => {
    console.log('completedCleaningTasks:', completedCleaningTasks)

    /*
     * Calculate the total completed tasks for each room
     */
    const completedCleaningTasksCount = completedCleaningTasks.reduce(
      (acc: { [key: string]: number }, completedCleaningTask) => {
        completedCleaningTask.rooms.forEach(room => {
          const roomSlug = room.slug
          if (!acc[roomSlug]) {
            acc[roomSlug] = 0
          }
          acc[roomSlug] += 1
        })
        return acc
      },
      {}
    )

    console.log('completedCleaningTasksCount:', completedCleaningTasksCount)

    /*
     * Map the house parts to their respective state setters
     * to update the fill colors based on the calculations
     */
    const fills: {
      [key: string]: React.Dispatch<React.SetStateAction<string>>
    } = {
      stairs: setCurrentFillStairs,
      livingRoom: setCurrentFillLivingRoom,
      mainRoom: setCurrentFillMainRoom,
      northTerrace: setCurrentFillNorthTerrace,
      basementBathroom: setCurrentFillBasementRoom,
      kitchen: setCurrentFillKitchen,
      studio: setCurrentFillStudio,
      southTerrace: setCurrentFillSouthTerrace,
      basement: setCurrentFillBasement,
      atticBathroom: setCurrentFillAtticBathroom,
      kitchenBathroom: setCurrentFillKitchenBathroom,
      workshop: setCurrentFillWorkshop,
      garage: setCurrentFillGarage,
      studioBathroom: setCurrentFillStudioBathroom,
      mainRoomBathroom: setCurrentFillMainroomBathroom,
      attic: setCurrentFillAttic
    }
    /*
     * Set the fill color for each room based on
     * the calculations received
     */
    for (const room in fills) {
      const colorValue = completedCleaningTasksCount[room]
        ? chosenColor(completedCleaningTasksCount[room])
        : chosenColor(0)
      fills[room](colorValue)
    }
  }, [completedCleaningTasks])

  return (
    <HouseFigure
      color={color}
      currentFillStairs={currentFillStairs}
      currentFillLivingRoom={currentFillLivingRoom}
      currentFillMainRoom={currentFillMainRoom}
      currentFillNorthTerrace={currentFillNorthTerrace}
      currentFillBasementRoom={currentFillBasementRoom}
      currentFillKitchen={currentFillKitchen}
      currentFillStudio={currentFillStudio}
      currentFillSouthTerrace={currentFillSouthTerrace}
      currentFillBasement={currentFillBasement}
      currentFillAtticBathroom={currentFillAtticBathroom}
      currentFillKitchenBathroom={currentFillKitchenBathroom}
      currentFillWorkshop={currentFillWorkshop}
      currentFillGarage={currentFillGarage}
      currentFillStudioBathroom={currentFillStudioBathroom}
      currentFillMainroomBathroom={currentFillMainroomBathroom}
      currentFillAttic={currentFillAttic}
    />
  )
}

export default House
