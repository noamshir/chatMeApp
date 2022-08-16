import React, { useState } from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ImageIcon from '@mui/icons-material/Image';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import { socketService, SOCKET_EMIT_TYPING } from '../../services/socket.service';
import EmojiBox from './EmojiBox';
import { chatService } from '../../services/chat.service';
import Loader from '../Loader';
import { getReceiver } from '../../utils/chat_utils';
export default function ChatMsgSend({ sendMsg, chat, user }) {

    const [txt, setTxt] = useState('');
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState('');
    const [fileToSend, setFileToSend] = useState(null);

    const handleChange = ({ target }) => {
        setTxt(target.value)
        const chatId = chat._id
        if(chatId) {
            const receiver = getReceiver(chat.users, user)
            const receiverId = receiver._id
            socketService.emit(SOCKET_EMIT_TYPING, {chatId, receiverId})
        }
    }

    const onSendMsg = async () => {
        let msg = { txt, from: user, sentAt: Date.now(), viewers: [user._id] };
        if (fileToSend) {
            setIsSending(true);
            try {
                const url = await chatService.uploadImg(fileToSend);
                msg.imgUrl = url
                await sendMsg(msg);
                setIsSending(false);
                setSelectedImageSrc('');
                setFileToSend(null)
            } catch (error) {
                console.log("failed in uploading img");
                setSelectedImageSrc('');
                setFileToSend(null)
                return
            }
        } else {
            await sendMsg(msg)
        }
        setTxt('');
    }

    const handlePress = ev => {
        if (ev.key === "Enter") {
            onSendMsg();
        }
    }

    const addEmoji = (emoji) => {
        const str = txt + emoji;
        setTxt(str);
    }

    const onFileSelected = ({ target }) => {
        const file = target.files[0];
        previewImage(file)
        setFileToSend(file);
    }

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.onload = ({ target }) => {
            setSelectedImageSrc(target.result)
        }
        reader.readAsDataURL(file)
    }

    const onRemoveUserFiles = () => {
        setSelectedImageSrc('');
        setFileToSend(null)
    }

    return (
        <div className="chat-send-container flex">
            <input type="text" className="msg-send-txt" value={txt} onChange={handleChange} placeholder="Type your message" onKeyPress={handlePress} />
            {selectedImageSrc &&
                <div className="selected-img-container" onClick={onRemoveUserFiles}>
                    <img className="selected-img-preview" src={selectedImageSrc} />
                    <DeleteIcon className="remove-selected-img" />
                </div>
            }
            <div className="chat-msg-btns flex" >
                <div onClick={() => setIsEmojiOpen(!isEmojiOpen)} className="btn-1"><EmojiEmotionsOutlinedIcon />
                    {isEmojiOpen && <EmojiBox addEmoji={addEmoji} />}
                </div>
                <input type="file" id="file" accept="image/*" onInput={onFileSelected} />
                <label htmlFor="file" className="img-pick-btn"><ImageIcon /></label>
                <button className="btn-3" onClick={onSendMsg}><SendOutlinedIcon className="send-icon" /></button>
            </div>
            {isSending && <div className="sending-msg-container">
                <Loader />
            </div>}
        </div>
    )
}
