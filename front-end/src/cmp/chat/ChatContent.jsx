import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatHeader from './ChatHeader'
import ChatList from './ChatList'
import ChatMsgSend from './ChatMsgSend'

import { socketService, SOCKET_EMIT_CONNECTED, SOCKET_EMIT_NEWMSG, SOCKET_ON_ADDCHAT, SOCKET_ON_ADDMSG, SOCKET_ON_UPDATE_CHAT } from '../../services/socket.service'
import NoMsg from './NoMsg'
import { ChatContext } from '../../context/chatContext'
import { updateChat } from '../../store/chat.action'

export default function ChatContent({ chat, openUserDetails, onReceivedMsg, onChatUpdated, onAddChat }) {

    const { user } = useSelector(({ userModule }) => userModule);
    const { chats } = useSelector(({ chatModule }) => chatModule);
    const dispatch = useDispatch()

    const { currChat, setChat, isMobile } = useContext(ChatContext);

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_CONNECTED, user._id)
        socketService.on(SOCKET_ON_ADDMSG, onReceivedMsg)
        socketService.on(SOCKET_ON_UPDATE_CHAT, onChatUpdated)
        socketService.on(SOCKET_ON_ADDCHAT, onAddChat)
        return () => {
            socketService.off(SOCKET_ON_ADDMSG);
            socketService.off(SOCKET_ON_UPDATE_CHAT);
            socketService.off(SOCKET_ON_ADDCHAT);
        }
    }, [isMobile, user, chats, currChat])

    const addMsg = (msg) => {
        const chat = { ...currChat };
        chat.msgs.push(msg);
        setChat(chat);
        const updatedChat = { ...chat };
        updatedChat.users = [user, chat.user];
        delete updatedChat.user;
        const receiverId = (chat.user._id)
        socketService.emit(SOCKET_EMIT_NEWMSG, { updatedChat, receiverId });
        dispatch(updateChat(updatedChat));
    }

    return (
        <section className="chat flex column">
            {(!chat || !chat.msgs) ? <NoMsg /> :
                <>
                    <ChatHeader user={chat.user} openUserDetails={openUserDetails} />
                    <ChatList msgs={chat.msgs} chatId={chat._id} />
                    <ChatMsgSend sendMsg={addMsg} chat={chat} user={user} />
                </>
            }
        </section>
    )
}
