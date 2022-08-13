import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Search from './Search'
import Options from '../general/Options';

export default function SideBarHeader({ isMobile, openProfile, toggleAddChatModal, logout }) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const getOptions = () => {
        return [
            {
                label: 'Profile',
                action: openProfile
            },
            {
                label: 'Add chat',
                action: toggleAddChatModal
            },
            {
                label: 'Logout',
                action: logout
            }
        ]
    }

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen)
    }

    return (
        <header className="side-bar-header flex">
            <h1>chatMe</h1>
            {isMobile && <Search />}
            {(!isMobile) && <div className='options-container-sidebar-header'>
                <button className='options-btn' onClick={toggleOptions}><MoreVertIcon /></button>
                {isOptionsOpen && <Options options={getOptions()} />}
            </div>}
        </header>
    )
}
