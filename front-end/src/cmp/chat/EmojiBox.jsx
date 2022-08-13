import React from 'react'

export default function EmojiBox({ addEmoji }) {

    const emojis = ["❤️", "⭐️","👍", "😀","🤣","😍"]

    const onEmojiClick = (ev, emoji) => {
        ev.stopPropagation();
        addEmoji(emoji)
    }

    return (
        <div className="emoji-container flex">
            {emojis && emojis.map((emoji) => <button key={emoji} className="emoji-btn" onClick={(ev) => onEmojiClick(ev, emoji)}>{emoji}</button>)}
        </div>
    )
}
