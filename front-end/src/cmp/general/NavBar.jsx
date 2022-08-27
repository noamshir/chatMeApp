import React from 'react'
import MenuItemsList from './MenuItemsList'

export default function Options({ options }) {
  return (
    <section className='options-container'>
      <MenuItemsList options={options} withIcons={false} />
    </section>
  )
}
