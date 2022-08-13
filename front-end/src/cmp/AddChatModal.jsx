import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import { userService } from '../services/user.service';
import { useSelector } from 'react-redux';

export default function AddChatModal({ toggleModal, addChat }) {
    const [users, setUsers] = useState([]);
    const [selctedUser, setSelctedUser] = useState()
    const user = useSelector(({ userModule }) => userModule.user)
    useEffect(() => {
        loadUsers();
    }, [])
    const defaultProps = {
        options: users,
        getOptionLabel: (user) => user.username,
    };
    const loadUsers = async () => {
        const usersOptions = await userService.getUsers();
        if (usersOptions) setUsers(usersOptions)
    }
    const selectUser = (ev, val) => {
        setSelctedUser(val)
    }

    const startChat = () => {
        if (!selctedUser) return;
        const chat = { users: [selctedUser, user], msgs: [] }
        addChat(chat);
        toggleModal();
    }
    return (
        <div className="screen" >
            <div className="add-chat-modal flex column">
                <button className="close-modal-btn" onClick={toggleModal}><CloseIcon /></button>
                <h2 className="modal-title">Start New Chat</h2>
                <div className="container-sub-combo flex column">
                    <h1 className="modal-subtitle">select user to start a chat</h1>
                    <div className="combo-box-users">
                        <Autocomplete disablePortal
                            {...defaultProps}
                            sx={{ width: 200 }}
                            onChange={selectUser}
                            renderInput={(params) => <TextField {...params} label="Users" variant="standard" />} />
                    </div>
                </div>
                <button className="start-chat-btn" onClick={startChat}>Start Chat</button>
            </div>
        </div>
    )
}
