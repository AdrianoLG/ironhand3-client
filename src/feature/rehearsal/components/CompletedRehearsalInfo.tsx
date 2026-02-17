import { iCompletedRehearsal } from '../types/rehearsals'

const CompletedRehearsalInfo = ({
  completedRehearsal
}: {
  completedRehearsal: iCompletedRehearsal
}) => (
  <div className='flex flex-col'>
    <div className='flex justify-center'>
      <img
        className='mt-2 block w-full max-w-30'
        src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/rehearsal/${completedRehearsal.instrument.img}`}
        alt={completedRehearsal.instrument.name}
      />
    </div>
    <div className='px-4 pb-4'>
      {completedRehearsal.sheets && (
        <p className='bg-secondaryLight text-textInv text-2xs my-1 mb-2 rounded-sm text-center'>
          Partituras ensayadas: {completedRehearsal.sheets.length}
        </p>
      )}
      {completedRehearsal.sheets && (
        <ul className='text-center text-xs'>
          {completedRehearsal.sheets.map((sheet, index) => (
            <div
              key={index}
              className='flex-column mb-2 flex items-start gap-1'
            >
              <p className='bg-secondaryLighter text-textInv mb-1 min-w-9 rounded-sm text-center text-xs'>
                {sheet.duration} min
              </p>
              <li className='flex flex-col items-start justify-start text-sm'>
                <p className='text-left leading-3'>{sheet.sheet.title}</p>
                <p className='text-xs'>{sheet.sheet.artist}</p>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  </div>
)

export default CompletedRehearsalInfo
