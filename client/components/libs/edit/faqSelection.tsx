import { faAngleDown, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface FaqSelectionProps {
  title: string
  children: any
  icon: IconDefinition
}

const FaqSelection = ({ children, title, icon }: FaqSelectionProps) => {
  const [openToggle, setOpenToggle] = useState(false)

  const toggleOpen = (e: any) => {
    e.preventDefault()
    setOpenToggle(!openToggle)
  }

  return (
    <div className='select-none'>
      <div
        onClick={toggleOpen}
        className="flex cursor-pointer text-xl justify-between items-center"
      >
        <div className='flex items-center'><FontAwesomeIcon icon={icon} className='mr-2' /> {title}</div>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`${openToggle && 'rotate-180'}`}
        />
      </div>
      {openToggle && <div className='mt-2'>{children}</div>}
    </div>
  )
}

export default FaqSelection
