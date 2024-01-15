import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.scss'
import Cover from '../cover/cover'
import Midwife from '../Admin/Midwife/Midwife'
import MedicalOfficer from './MedicalOfficer/MedicalOfficer'
import AddNews from '../public/AddNews'
import NewsFeed from '../public/NewsFeed'
import instance from '../../utility/AxiosInstance'
import SupperAdmin from './supperAdmin/SupperAdmin'

// Functional component
export default function Admin() {
    const navigation = useNavigate()
    const [active, setActive] = useState('midwife')
    const [authenticated, setAuthenticated] = useState(false);
    const [isSupperAdmin, setIsSupperAdmin] = useState(null);

// Check authentication
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await instance.get('/admin/check-auth')
                console.log(res.data)
                setAuthenticated(true)

                try{
                    const res = await instance.get('/admin/admin-type')
                    console.log("asfdasfcdsavcdvv",res.data.isSupperAdmin)
                    setIsSupperAdmin(res.data.isSupperAdmin)
                }
                catch(err){
                    console.log(err)
                }
            }
            catch (err) {
                setAuthenticated(false)    // If authentication fails, redirect to authentication page
                console.log({ error: err })
                navigation('/auth')
            }
        }
        checkAuth()
    }, [active])  
        // UseEffect runs only when 'active' changes

    if (isSupperAdmin === null) return <p>Loading...</p>

    if(authenticated && isSupperAdmin){
        return <SupperAdmin />
    }

    if (authenticated) return (
        <div className='admin-container'>
            <Cover />
            <div className='navigation-container'>
                <ul>
                    <li onClick={() => setActive('midwife')} style={active === 'midwife' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Midwife</li>
                    <li onClick={() => setActive('medical_officers')} style={active === 'medical_officers' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Medical officers</li>
                    <li onClick={() => setActive('addNews')} style={active === 'addNews' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Add News</li>
                    <li onClick={() => setActive('news')} style={active === 'news' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>News Feeds</li>
                    {/* <li onClick={() => setActive('baby_details')} style={active === 'baby_details' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Baby Details</li> */}
                </ul>
            </div>
            {/* <Midwife /> */}

            {/* Render different components based on active section */}
            {
                
                active === 'midwife' ? <Midwife /> :
                    active === 'medical_officers' ? <MedicalOfficer /> :
                        active === 'addNews' ? <AddNews /> :
                            active === 'news' ? <NewsFeed user="admin" /> : null
                // active === 'baby_details' ? <p>baby_details</p> : null
            }
        </div>
    )
}
