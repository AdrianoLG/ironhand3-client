import { iCompletedCleaningTask } from '../types/cleaningTasks'

const CompletedCleaningTaskInfo = ({
  completedCleaningTask
}: {
  completedCleaningTask: iCompletedCleaningTask
}) => (
  <div className='flex flex-col'>
    <div className='relative'>
      <img
        className='border-secondary bg-secondaryLightest absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 transform rounded-full border-1 p-1'
        src={`./src/assets/img/svg/${completedCleaningTask.cleaningTask.slug}.svg`}
        alt={completedCleaningTask.cleaningTask.name}
      />
      <img
        className='w-full'
        src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/cleaning/${completedCleaningTask.cleaningTask.img}`}
        alt={completedCleaningTask.cleaningTask.name}
      />
    </div>
    <div className='p-4'>
      <p className='mb-3 text-center'>
        <span className='border-secondaryLighter border-b-2'>
          {completedCleaningTask.cleaningTask.name}
        </span>
      </p>
      {completedCleaningTask.rooms && (
        <p className='text-center text-xs'>
          Habitaciones: {completedCleaningTask.rooms.length}
        </p>
      )}
      {completedCleaningTask.rooms && (
        <ul className='text-center text-xs'>
          {completedCleaningTask.rooms.map((room, index) => (
            <li key={index} className='text-center text-xs'>
              • {room.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
)

export default CompletedCleaningTaskInfo
