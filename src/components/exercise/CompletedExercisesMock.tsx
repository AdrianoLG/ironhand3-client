import { iCompletedExercises } from '../../utils/types'

export const CompletedExercisesMock: iCompletedExercises[] = [
  {
    _id: '1',
    date: '2024-12-24',
    exercises: [
      {
        _id: 'a',
        name: 'Flexiones',
        parts: ['Pecho', 'Brazos', 'Bíceps', 'Abdominales'],
        repetitions: 20
      },
      {
        _id: 'b',
        name: 'Dominadas',
        parts: ['Espalda', 'Brazos', 'Cuello', 'Hombros', 'Bíceps'],
        repetitions: 15
      }
    ],
    totalTime: 2
  },
  {
    _id: '2',
    date: '2024-12-23',
    exercises: [
      {
        _id: 'c',
        name: 'Sentadillas',
        parts: ['Piernas', 'Glúteos', 'Cuádriceps'],
        repetitions: 20
      },
      {
        _id: 'd',
        name: 'Cuerda',
        parts: ['Bíceps', 'Brazos', 'Abdominales'],
        cardio: 10,
        time: 2
      }
    ],
    totalTime: 2
  },
  {
    _id: '3',
    date: '2024-12-22',
    exercises: [
      {
        _id: 'a',
        name: 'Flexiones',
        parts: ['Pecho', 'Brazos', 'Bíceps', 'Abdominales'],
        repetitions: 20
      },
      {
        _id: 'b',
        name: 'Dominadas',
        parts: ['Espalda', 'Brazos', 'Cuello', 'Hombros', 'Bíceps'],
        repetitions: 15
      },
      {
        _id: 'd',
        name: 'Cuerda',
        parts: ['Bíceps', 'Brazos', 'Abdominales'],
        cardio: 10,
        time: 2
      }
    ],
    totalTime: 4
  },
  {
    _id: '4',
    date: '2024-12-21',
    exercises: [
      {
        _id: 'a',
        name: 'Flexiones',
        parts: ['Pecho', 'Brazos', 'Bíceps', 'Abdominales'],
        repetitions: 20
      },
      {
        _id: 'b',
        name: 'Dominadas',
        parts: ['Espalda', 'Brazos', 'Cuello', 'Hombros', 'Bíceps'],
        repetitions: 15
      }
    ],
    totalTime: 2
  },
  {
    _id: '5',
    date: '2024-12-20',
    exercises: [
      {
        _id: 'e',
        name: 'Caminar',
        parts: ['Piernas', 'Muslos', 'Cuádriceps', 'Pies'],
        time: 30
      }
    ],
    totalTime: 2
  }
]
