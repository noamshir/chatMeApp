import React from 'react'
import { useSelector } from 'react-redux';

export default function ImageMsg({ msg }) {
    const { user } = useSelector(({ userModule }) => userModule)
    const className = (msg.from._id === user._id) ? "my-msg" : "";
    const includesTxtClass = (msg.txt) ? "with-txt" : ""
    return (
        <div className="img-msg-container flex column">
            <div className={`img-msg ${className} ${includesTxtClass}`}>
                <img src={msg.imgUrl} alt="Image" />
                {msg.txt &&
                    <div className="img-txt-msg-container">
                        <p className="img-txt-msg">{msg.txt}</p>
                    </div>
                }
            </div>
        </div>

    )
}
