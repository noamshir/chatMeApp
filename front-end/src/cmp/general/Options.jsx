import React from 'react'

export default function Options({ options }) {
    return (
        <section className='options-container'>
            <ul className='options-list'>
                {options && options.map((option, idx) => {
                    const { label, action } = option
                    return <li className='option-item clean-list' key={idx} onClick={action}>{label}</li>
                })}
            </ul>
        </section>
    )
}
