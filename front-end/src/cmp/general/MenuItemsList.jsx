import React from 'react'
import { MenuItem } from './MenuItem'

export default function MenuItemsList({ options, withIcons }) {
  return (
    <ul className='options-list flex'>
      {options &&
        options.map((option, idx) => {
          const { label, action, icon } = option
          return (
            <MenuItem
              key={idx}
              label={label}
              action={action}
              Icon={icon}
              withIcons={withIcons}
            />
          )
        })}
    </ul>
  )
}
