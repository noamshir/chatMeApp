import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

import { userService } from '../services/user.service'
import { useSelector } from 'react-redux'
import WithBlurScreen from '../hoc/WithBlurScreen'

function AddChatModal({
  toggleModal,
  addChat,
  selectedReceiver,
  setSelectedReceiver,
}) {
  const [users, setUsers] = useState([])
  const user = useSelector(({ userModule }) => userModule.user)

  useEffect(() => {
    loadUsers()
  }, [])

  const defaultProps = {
    options: users,
    getOptionLabel: (user) => user.username,
  }
  const loadUsers = async () => {
    const usersOptions = await userService.getUsers()
    if (usersOptions) setUsers(usersOptions)
  }
  const selectUser = (ev, val) => {
    setSelectedReceiver(val)
  }

  const startChat = () => {
    if (!selectedReceiver) return
    const chat = { users: [selectedReceiver, user], msgs: [] }
    addChat(chat)
    toggleModal()
  }

  return (
    <div className='add-chat-modal flex column'>
      <button className='close-modal-btn' onClick={toggleModal}>
        <CloseIcon />
      </button>
      <h2 className='modal-title'>Start New Chat</h2>
      <div className='container-sub-combo flex column'>
        <h1 className='modal-subtitle'>select user to start a chat</h1>
        <div className='combo-box-users'>
          <Autocomplete
            disablePortal
            {...defaultProps}
            sx={{ width: 200 }}
            onChange={selectUser}
            renderInput={(params) => (
              <TextField {...params} label='Users' variant='standard' />
            )}
          />
        </div>
      </div>
      <button className='start-chat-btn' onClick={startChat}>
        Start Chat
      </button>
    </div>
  )
}

export const AddChatModalScreen = WithBlurScreen(AddChatModal)
