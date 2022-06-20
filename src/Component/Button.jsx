import React from 'react'

const Button = ({text, onClick, className, icon}) => {
  return (
    <button className={className} onClick={onClick}>{icon && icon()}{text}</button>
  )
}

export default Button