import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
    return (
        <div className="search-container flex">
            <SearchIcon className="search-icon" />
            <input type="text" placeholder="Search Here..." />
        </div>
    )
}
