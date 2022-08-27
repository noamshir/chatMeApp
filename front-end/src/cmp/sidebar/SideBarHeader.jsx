import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import Search from './Search'
import Options from '../general/NavBar'

export default function SideBarHeader({ isMobile, options }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenuStatus = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='side-bar-header flex'>
      {!isMobile && (
        <div className='options-container-sidebar-header'>
          <button className='options-btn' onClick={toggleMenuStatus}>
            <MoreVertIcon />
          </button>
          {isMenuOpen && <Options options={options} />}
        </div>
      )}
      <h1>chatMe</h1>
      {isMobile && <Search />}
    </header>
  )
}
