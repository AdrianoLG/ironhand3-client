import { iCompletedExercise } from '../../../utils/types'
import chosenColor from '../utils/chosenColor'

const Stretch = ({
  width,
  completedExercises
}: {
  width: string
  completedExercises: iCompletedExercise[]
}) => {
  const countStretchExercises = completedExercises.filter(
    completedExercise => completedExercise.exercise.name === 'Estiramiento'
  ).length

  return (
    <svg
      width={width}
      viewBox='0 0 12 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Stretching icon</title>
      <path
        d='M8.35995 13L9.30395 12.454C10.3789 11.832 10.9159 11.521 10.9879 11.078C10.9986 11.0089 11.0019 10.9388 10.9979 10.869C10.9619 10.423 10.4519 10.079 9.43295 9.391L4.72595 6.214C2.87695 4.966 2.45195 2.69 3.74995 1M9.99995 3.5C9.99995 3.89782 9.84191 4.27936 9.56061 4.56066C9.2793 4.84196 8.89777 5 8.49995 5C8.10212 5 7.72059 4.84196 7.43929 4.56066C7.15798 4.27936 6.99995 3.89782 6.99995 3.5C6.99995 3.10218 7.15798 2.72064 7.43929 2.43934C7.72059 2.15804 8.10212 2 8.49995 2C8.89777 2 9.2793 2.15804 9.56061 2.43934C9.84191 2.72064 9.99995 3.10218 9.99995 3.5Z'
        stroke={chosenColor(countStretchExercises, 'stretch')}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.726 6.214C2.226 8.714 1 15.632 1 19M4.726 6.214C2.877 4.966 2.452 2.69 3.75 1M4.726 6.214L7.372 8M8.36 13L9.304 12.454C10.379 11.832 10.916 11.521 10.988 11.078C10.9986 11.0089 11.002 10.9388 10.998 10.869C10.962 10.423 10.452 10.079 9.433 9.391L7.373 8C6.67955 8.89746 6.08605 9.86786 5.603 10.894C5.163 11.821 4.944 12.284 4.985 12.814L2 12M9 19C8.027 17.865 7.026 16.3 6.05 14.858C5.367 13.848 5.025 13.342 4.985 12.813'
        stroke={chosenColor(countStretchExercises, 'stretch')}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Stretch
