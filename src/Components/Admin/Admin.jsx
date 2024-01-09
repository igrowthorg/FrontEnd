import React, { useState } from 'react'
import './Admin.scss'
import Cover from '../cover/cover'
import Midwife from '../Admin/Midwife/Midwife'
import MedicalOfficer from './MedicalOfficer/MedicalOfficer'

export default function Admin() {
    const [active, setActive] = useState('midwife')
    return (
        <div className='admin-container'>
            <Cover />
            <div className='navigation-container'>
                <ul>
                    <li onClick={() => setActive('midwife')} style={active === 'midwife' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Midwife</li>
                    <li onClick={() => setActive('medical_officers')} style={active === 'medical_officers' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Medical officers</li>
                    <li onClick={() => setActive('news')} style={active === 'news' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>News Feeds</li>
                    <li onClick={() => setActive('baby_details')} style={active === 'baby_details' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Baby Details</li>
                </ul>
            </div>
            {/* <Midwife /> */}
            {
                active === 'midwife' ? <Midwife /> :
                    active === 'medical_officers' ? <MedicalOfficer /> :
                        active === 'news' ? <p>news feed</p> :
                            active === 'baby_details' ? <p>baby_details</p> : null
            }
        </div>
    )
}
