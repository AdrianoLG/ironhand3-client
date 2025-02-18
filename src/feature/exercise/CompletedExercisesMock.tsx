import { iCompletedExercise } from '../../utils/types'

export const CompletedExercisesMock: iCompletedExercise[] = [
  {
    _id: '1',
    date: new Date('2024-12-24'),
    exercise: {
      _id: 'a',
      name: 'Flexiones',
      bodyParts: ['Pecho', 'Brazos', 'Bíceps', 'Abdominales'],
      type: 'strength'
    },
    time: 2
  },
  {
    _id: '2',
    date: new Date('2024-12-23'),
    exercise: {
      _id: 'c',
      name: 'Sentadillas',
      type: 'strength',
      bodyParts: ['Piernas', 'Glúteos', 'Cuádriceps']
    },
    time: 2
  },
  {
    _id: '3',
    date: new Date('2024-12-22'),
    exercise: {
      _id: 'b',
      name: 'Dominadas',
      type: 'strength',
      bodyParts: ['Espalda', 'Brazos', 'Cuello', 'Hombros', 'Bíceps']
    },
    time: 4
  },
  {
    _id: '4',
    date: new Date('2024-12-21'),
    exercise: {
      _id: 'b',
      name: 'Dominadas',
      type: 'strength',
      bodyParts: ['Espalda', 'Brazos', 'Cuello', 'Hombros', 'Bíceps']
    },
    time: 2
  },
  {
    _id: '5',
    date: new Date('2024-12-20'),
    exercise: {
      _id: 'e',
      name: 'Caminar',
      type: 'cardio',
      bodyParts: ['Piernas', 'Muslos', 'Cuádriceps', 'Pies']
    },
    time: 2
  }
]
