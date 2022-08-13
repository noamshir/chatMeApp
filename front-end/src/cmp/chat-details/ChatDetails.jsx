import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import { ChatContext } from '../../context/chatContext';
import UserProfileImage from '../profile/UserProfileImage';

export default function ChatDetails({ close }) {
    const { currChat, setChat } = useContext(ChatContext);
    const user = currChat.user;
    return (
        <section className="chat-details flex column">
            <button className="close-btn" onClick={close}><CloseIcon /></button>
            <div className="chat-user-info flex column">
                <UserProfileImage user={user} isLarge={true} />
                <h1 className="username">{user.username}</h1>
                <h2 className="status">CEO Meta co.</h2>
            </div>
            <div className="chat-user-details flex column">
                <div className="chat-user-item-container flex" >
                    <LocationSearchingIcon />
                    <h1>Tel Aviv, Israel</h1>
                </div>
                <div className="chat-user-item-container flex">
                    <PhoneIphoneIcon />
                    <h1>{user.phone}</h1>
                </div>
            </div>
        </section>
    )
}
