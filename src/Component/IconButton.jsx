import React from 'react'
import { IoIosClose } from "react-icons/io"

const IconButton = ({onClick}) => {
  return (
    <div className="icon-button" onClick={onClick} >
        <IoIosClose/>
    </div>
  )
}

export default IconButton