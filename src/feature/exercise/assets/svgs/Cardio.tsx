import { iCompletedExercise } from '../../types/exercises'
import chosenColor from '../../utils/chosenColor'

const Cardio = ({
  width,
  completedExercises
}: {
  width: string
  completedExercises: iCompletedExercise[]
}) => {
  const countCardioExercises = completedExercises.filter(
    completedExercise => completedExercise.exercise.type === 'cardio'
  ).length
  return (
    <svg
      width={width}
      viewBox='0 0 20 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Cardio icon</title>
      <path
        d='M5.5 0C4.04131 0 2.64236 0.579463 1.61091 1.61091C0.579463 2.64236 0 4.04131 0 5.5C0 6 0.09 6.5 0.22 7H4.3L5.57 3.63C5.87 2.83 7.05 2.75 7.43 3.63L9.5 9L10.09 7.58C10.22 7.25 10.57 7 11 7H19.78C19.91 6.5 20 6 20 5.5C20 4.04131 19.4205 2.64236 18.3891 1.61091C17.3576 0.579463 15.9587 0 14.5 0C12.64 0 11 0.93 10 2.34C9 0.93 7.36 0 5.5 0ZM1 8.5C0.734784 8.5 0.48043 8.60536 0.292893 8.79289C0.105357 8.98043 0 9.23478 0 9.5C0 9.76522 0.105357 10.0196 0.292893 10.2071C0.48043 10.3946 0.734784 10.5 1 10.5H3.44L9 16C10 16.9 10 16.9 11 16L16.56 10.5H19C19.2652 10.5 19.5196 10.3946 19.7071 10.2071C19.8946 10.0196 20 9.76522 20 9.5C20 9.23478 19.8946 8.98043 19.7071 8.79289C19.5196 8.60536 19.2652 8.5 19 8.5H11.4L10.47 10.8C10.07 11.81 8.92 11.67 8.55 10.83L6.5 5.5L5.54 7.83C5.39 8.21 5.05 8.5 4.6 8.5H1Z'
        fill={chosenColor(countCardioExercises, 'cardio')}
      />
    </svg>
  )
}

export default Cardio
