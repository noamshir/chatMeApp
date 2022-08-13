import React from 'react'
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';

export default function NoMsg() {
    return (
        <div className="no-msgs flex column">
            <h1>No messages yet...</h1>
            <CommentsDisabledIcon className="no-msgs-icon" />
        </div>
    )
}
