import React from 'react'

export default function Error({ children }) {
    return (
        <div>
            <h1 className="error-input-msg">{children}</h1>
        </div>
    )
}
