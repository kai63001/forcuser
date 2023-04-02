import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const FaqSelection = (props: any) => {
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
        <div>Background Color</div>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`${openToggle && 'rotate-180'}`}
        />
      </div>
      {openToggle && <div className='mt-2'>{props.children}</div>}
    </div>
  )
}

export default FaqSelection
