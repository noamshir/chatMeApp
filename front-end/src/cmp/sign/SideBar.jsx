import React from 'react'

export default function SideBar({ isLogin, setForm }) {
    const loginTexts = { title: "Welcome back", subTitle: "chat with your contacts and friends", btn: "Login" }
    const registerTexts = { title: "Hello, friend!", subTitle: "Enter your personal info and start your journy with us", btn: "Create" }
    const texts = (isLogin) ? registerTexts : loginTexts;
    return (
        <section className="sign-side-bar flex">
            <div className="sign-side-bar-content flex column">
                <h2>{texts.title}</h2>
                <h1>{texts.subTitle}</h1>
                <button onClick={setForm} >{texts.btn}</button>
            </div>
        </section>
    )
}
