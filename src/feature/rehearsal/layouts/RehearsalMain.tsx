import { Button } from '../../../components/atoms'
import Emptylist from '../../../components/molecules/EmptyList'
import RehearsalList from '../components/RehearsalList'
import { iCompletedRehearsal, iSheet } from '../types/rehearsals'
import { getInstrumentIcon } from '../utils/iconMap.ts'

const RehearsalMain = ({
  completedRehearsals,
  data,
  setShowDialog,
  setSelectedSheet,
  removeSheet
}: {
  completedRehearsals: iCompletedRehearsal[]
  data: { sheets: iSheet[] } | undefined
  setShowDialog: (show: boolean) => void
  setSelectedSheet: (sheet: iSheet | null) => void
  removeSheet: (id: string) => void
}) => (
  <main className='w-full pb-8 md:w-2/3 md:pl-10 xl:pl-36'>
    {completedRehearsals && (
      <RehearsalList completedRehearsals={completedRehearsals} />
    )}
    {!data && (
      <Emptylist
        message={'No hay ejercicios creados aún.☹️\n¡Crea uno nuevo! 💪'}
      />
    )}
    {data && (
      <div className='my-12 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {data.sheets.map((sheet: iSheet) => (
          <div
            key={sheet._id}
            className='group/Card border-secondaryLighter relative flex items-end justify-center overflow-hidden rounded-md border-1'
          >
            <div className='h-full w-full py-2'>
              <h2 className='text-md text-secondary left-0 w-full truncate px-4 font-semibold opacity-100 transition-all duration-200 ease-out group-focus-within/Card:opacity-0 group-hover/Card:opacity-0 group-focus/Card:opacity-0'>
                {sheet.title}
              </h2>
              <h3 className='text-secondaryLighter left-0 w-full px-4 text-sm font-semibold opacity-100 transition-all duration-200 ease-out group-focus-within/Card:opacity-0 group-hover/Card:opacity-0 group-focus/Card:opacity-0'>
                {sheet.artist}
              </h3>
              <div className='text-secondaryLighter left-0 flex w-full gap-2 px-4 pt-2 text-sm font-semibold opacity-100 transition-all duration-200 ease-out group-focus-within/Card:opacity-0 group-hover/Card:opacity-0 group-focus/Card:opacity-0'>
                {sheet.possibleInstruments.map(instrument => (
                  <img
                    key={instrument._id}
                    className='w-8'
                    src={getInstrumentIcon(instrument.slug)}
                    alt={instrument.name}
                  />
                ))}
              </div>
            </div>
            <div className='hover-group-within/Card:opacity-100 absolute bottom-1/2 left-0 flex w-full translate-y-1/2 justify-center gap-2 opacity-0 transition-all duration-100 ease-out group-focus-within/Card:opacity-100 group-hover/Card:opacity-100 group-focus/Card:opacity-100'>
              <Button
                text='Actualizar'
                onMouseClick={() => {
                  setShowDialog(true)
                  setSelectedSheet(sheet)
                }}
                type='submit'
                xsmall
                isFit
              />
              <Button
                text='Borrar'
                onMouseClick={() => {
                  removeSheet(sheet._id)
                }}
                xsmall
                outline
                isFit
                secondary
                classes='pointer-events-auto'
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </main>
)
export default RehearsalMain
