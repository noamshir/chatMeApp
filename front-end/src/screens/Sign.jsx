import React, { useState } from 'react'
import SideBar from '../cmp/sign/SideBar'
import SignIn from '../cmp/sign/SignIn'

export default function Sign() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <section className="sign-screen flex">
            <SideBar isLogin={isLogin} setForm={() => setIsLogin(!isLogin)} />
            <SignIn isLogin={isLogin} />
        </section>
    )
}
