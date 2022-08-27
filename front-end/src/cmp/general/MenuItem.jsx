import React from 'react'
import IconMenuItem from './IconMenuItem'

export function MenuItem({ action, label, Icon, withIcons }) {
  return (
    <li className='option-item flex clean-list' onClick={action}>
      {(!Icon || !withIcons) && label}
      {withIcons && Icon && <IconMenuItem Icon={Icon} label={label} />}
    </li>
  )
}
