import React, { useState } from 'react'

export default function IconMenuItem({ Icon, label }) {
  const [isHovered, setIsHovered] = useState(false)

  const toggleHoverState = () => {
    setIsHovered(!isHovered)
  }

  const isHoveredClassName = isHovered ? 'hovered' : ''
  return (
    <div
      className='icon-menu-item-container flex'
      onMouseOver={toggleHoverState}
      onMouseOut={toggleHoverState}
    >
      <Icon className={`icon-menu-item ${isHoveredClassName}`} />
      <p className={`icon-label clean-paragraph ${isHoveredClassName}`}>
        {label}
      </p>
    </div>
  )
}
