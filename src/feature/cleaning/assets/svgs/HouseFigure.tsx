import Attic from './house/Attic'
import AtticBathroom from './house/AtticBathroom'
import Basement from './house/Basement'
import BasementBathroom from './house/BasementBathroom'
import Garage from './house/Garage'
import Kitchen from './house/Kitchen'
import KitchenBathroom from './house/KitchenBathroom'
import LivingRoom from './house/LivingRoom'
import MainRoom from './house/MainRoom'
import MainRoomBathroom from './house/MainRoomBathroom'
import NorthTerrace from './house/NorthTerrace'
import SouthTerrace from './house/SouthTerrace'
import Stairs from './house/Stairs'
import Studio from './house/Studio'
import StudioBathroom from './house/StudioBathroom'
import Workshop from './house/Workshop'
import { iHouseFigure } from './types'

const HouseFigure = ({
  color,
  currentFillStairs,
  currentFillLivingRoom,
  currentFillMainRoom,
  currentFillNorthTerrace,
  currentFillBasementRoom,
  currentFillKitchen,
  currentFillStudio,
  currentFillSouthTerrace,
  currentFillBasement,
  currentFillAtticBathroom,
  currentFillKitchenBathroom,
  currentFillWorkshop,
  currentFillGarage,
  currentFillStudioBathroom,
  currentFillMainroomBathroom,
  currentFillAttic
}: iHouseFigure) => {
  return (
    <svg
      className='w-full'
      viewBox='0 0 1560 1422'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
    >
      <Stairs fillColor={currentFillStairs} />
      <LivingRoom fillColor={currentFillLivingRoom} />
      <MainRoom fillColor={currentFillMainRoom} />
      <NorthTerrace fillColor={currentFillNorthTerrace} />
      <BasementBathroom fillColor={currentFillBasementRoom} />
      <Kitchen fillColor={currentFillKitchen} />
      <Studio fillColor={currentFillStudio} />
      <SouthTerrace fillColor={currentFillSouthTerrace} />
      <Basement fillColor={currentFillBasement} />
      <AtticBathroom fillColor={currentFillAtticBathroom} />
      <KitchenBathroom fillColor={currentFillKitchenBathroom} />
      <Workshop fillColor={currentFillWorkshop} />
      <Garage fillColor={currentFillGarage} />
      <StudioBathroom fillColor={currentFillStudioBathroom} />
      <MainRoomBathroom fillColor={currentFillMainroomBathroom} />
      <Attic fillColor={currentFillAttic} />
    </svg>
  )
}
export default HouseFigure
