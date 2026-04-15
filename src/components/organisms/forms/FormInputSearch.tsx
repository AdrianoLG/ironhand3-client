import searchIcon from '../../../assets/img/svg/search.svg'

interface FormInputSearchProps {
  placeholder: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInputSearch = ({
  placeholder,
  value,
  onChange
}: FormInputSearchProps) => {
  return (
    <div className='relative mb-4'>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='focus:ring-secondary w-5/6 rounded-full border-1 px-4 py-2 pl-8 text-sm focus:ring-2 focus:outline-none'
      />
      <img
        src={searchIcon}
        alt='Search'
        className='absolute top-1/2 left-2 w-5 -translate-y-1/2'
      />
    </div>
  )
}

export default FormInputSearch
