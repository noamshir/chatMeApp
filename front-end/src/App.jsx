import React from 'react'
import Chat from './screens/Chat'
import { useSelector } from 'react-redux'
import Sign from './screens/Sign'

export default function App() {
    const user = useSelector(({ userModule }) => userModule.user)
    return (
        <section className="main-app">
            {(user) ? <Chat /> : <Sign />}
        </section>
    )
}
