import React from 'react'
import './cover.css'
import Logo from '../../images/logo192.png'

export default function cover() {

    const log_out = () => {
        localStorage.clear()
        window.location.reload();
    }

    return (
        <div className='cover-container'>
            <div className='title'>
                <img src={Logo} alt="" />
                {/* <p> I-Growth</p> */}
                <p >Monitor Baby Growth & Suggest Advice</p>
            </div>
            <button style={{ marginRight: '20px' }} onClick={log_out}>Log Out</button>
        </div>
    )
}
