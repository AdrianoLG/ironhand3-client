import { iPlant } from '../types/garden'
import { getCategoryOrder } from '../utils/categoryOrder'
import Plant from './Plant'

const PlantList = ({ plants }: { plants: iPlant[] }) => {
  const grouped = plants.reduce<Record<string, iPlant[]>>((acc, plant) => {
    const category = plant.specie?.category || 'Otros'
    if (!acc[category]) acc[category] = []
    acc[category].push(plant)
    return acc
  }, {})

  const categoryOrder = getCategoryOrder(grouped)

  return (
    <div className='flex flex-col'>
      {categoryOrder.map(category => (
        <div key={category} className='mb-4'>
          <h3 className='text-secondary mb-2 text-sm font-semibold'>
            {category}
          </h3>
          <div className='flex flex-col gap-2'>
            {grouped[category]
              .slice()
              .sort(
                (a, b) => Number(Boolean(a.death)) - Number(Boolean(b.death))
              )
              .map(plant => (
                <div key={plant._id}>
                  <Plant plant={plant} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
export default PlantList
