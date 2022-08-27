import React from 'react'
import MenuItemsList from '../general/MenuItemsList'

export function BottomNavBar({ options }) {
  return (
    <section className='bottom-navbar-container'>
      <MenuItemsList options={options} withIcons={true} />
    </section>
  )
}
