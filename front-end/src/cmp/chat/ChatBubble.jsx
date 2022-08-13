import React from 'react'
import { useSelector } from 'react-redux'

import UserProfileImage from "../profile/UserProfileImage"
import {getTime } from '../../utils/time';

export default function ChatBubble({ msg }) {
    const user = useSelector(({ userModule }) => userModule.user)
    const isMyMsgCN = (msg.from._id === user._id) ? "my-msg" : "";
    const profile = msg.from._id === user._id ? user : msg.from;

    const time = getTime(msg.sentAt);
    return (
        <div className="msg-container flex column">
            <div className={`chat-bubble ${isMyMsgCN}`}>
                <p>{msg.txt}</p>
            </div>
            <div className={`sender-info flex column ${isMyMsgCN}`}>
                <UserProfileImage user={profile} withDot={false} />
                <h1 className="msg-time">{time}</h1>
            </div>
        </div>

    )
}
