import React from 'react'
import './cover.css'
import Logo from '../../images/logo192.png'
import instance from '../../utility/AxiosInstance'
import { useNavigate } from 'react-router-dom'

export default function Cover() {

    const navigation = useNavigate()

    const logout = async () => {
        try {
            const res = await instance.post('/admin/logout')
            console.log(res.data)
            navigation('/')
        }
        catch (err) {
            console.log(err)
        }

        try {
            const res = await instance.post('/midwife/logout')
            console.log(res.data)
            navigation('/')
        }
        catch (err) {
            console.log(err)
        }

        try {
            const res = await instance.post('/officer/logout')
            console.log(res.data)
            navigation('/')
        }
        catch (err) {
            console.log(err)
        }

        try {
            const res = await instance.post('/parent/logout')
            console.log(res.data)
            navigation('/')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='cover-container'>
            <div className='title'>
                <img src={Logo} alt="" />
                {/* <p> I-Growth</p> */}
                <p >Monitor Baby Growth & Suggest Advice</p>
            </div>
            <button style={{ marginRight: '20px' }} onClick={logout}>Log Out</button>
        </div>
    )
}
