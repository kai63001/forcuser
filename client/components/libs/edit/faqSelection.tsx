import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface FaqSelectionProps {
  title: string
  children: any
}

const FaqSelection = ({ children, title }: FaqSelectionProps) => {
  const [openToggle, setOpenToggle] = useState(false)

  const toggleOpen = (e: any) => {
    e.preventDefault()
    setOpenToggle(!openToggle)
  }

  return (
    <div>
      <div
        onClick={toggleOpen}
        className="flex cursor-pointer text-xl justify-between items-center"
      >
        <div>{title}</div>
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
