import { useLayoutEffect, useState } from 'react';

import HouseFigure from '../assets/svgs/HouseFigure';
import { iCompletedCleaningTasks } from '../types/exercises';
import chosenColor from '../utils/chosenColor';

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
  const [currentFillNorthTerrace, setCurrentFillNorthTerrace] = useState('current')
  const [currentFillBasementRoom, setCurrentFillBasementRoom] = useState('current')
  const [currentFillKitchen, setCurrentFillKitchen] = useState('current')
  const [currentFillStudio, setCurrentFillStudio] = useState('current')
  const [currentFillSouthTerrace, setCurrentFillSouthTerrace] = useState('current')
  const [currentFillBasement, setCurrentFillBasement] = useState('current')
  const [currentFillAtticBathroom, setCurrentFillAtticBathroom] = useState('current')
  const [currentFillKitchenBathroom, setCurrentFillKitchenBathroom] = useState('current')
  const [currentFillWorkshop, setCurrentFillWorkshop] = useState('current')
  const [currentFillGarage, setCurrentFillGarage] = useState('current')
  const [currentFillStudioBathroom, setCurrentFillStudioBathroom] = useState('current')
  const [currentFillMainroomBathroom, setCurrentFillMainroomBathroom] = useState('current')
  const [currentFillAttic, setCurrentFillAttic] = useState('current')

  useLayoutEffect(() => {
    /*
     * Calculate the total repetitions and weight for each body part
     * and calculate the punctuation based on the type of exercise
     */
    const completedCleaningTasksCount = completedCleaningTasks.reduce(
      (acc: { [key: string]: number }, completedCleaningTask) => {
        const count = completedCleaningTask.count || 0
        completedCleaningTask.rooms.forEach(room => {
          if (!acc[room]) {
            acc[room] = 0
          }
          acc[room] += count
        })
        return acc
      },
      {}
    )

    /*
     * Map the body parts to their respective state setters
     * to update the fill colors based on the calculations
     */
    const fills: {
      [key: string]: React.Dispatch<React.SetStateAction<string>>
    } = {
      stairs: setCurrentFillStairs,
      livingRoom: setCurrentFillLivingRoom,
      mainRoom: setCurrentFillMainRoom,
      northTerrace: setCurrentFillNorthTerrace,
      basementRoom: setCurrentFillBasementRoom,
      kitchen: setCurrentFillKitchen,
      studio: setCurrentFillStudio,
      southTerrace: setCurrentFillSouthTerrace,
      basement: setCurrentFillBasement,
      atticBathroom: setCurrentFillAtticBathroom,
      kitchenBathroom: setCurrentFillKitchenBathroom,
      workshop: setCurrentFillWorkshop,
      garage: setCurrentFillGarage,
      studioBathroom: setCurrentFillStudioBathroom,
      mainroomBathroom: setCurrentFillMainroomBathroom,
      attic: setCurrentFillAttic
    }
    /*
     * Set the fill color for each body part based on
     * the calculations received
     */
    for (const bodyPart in fills) {
      fills[bodyPart](
        completedCleaningTasks[bodyPart]
          ? chosenColor(completedCleaningTasks[bodyPart], 'strength')
          : chosenColor(0, 'strength')
      )
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
