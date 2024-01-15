import React, { useEffect, useState } from 'react'
import './OfficerComponent.scss'
import Cover from '../cover/cover'
import instance from '../../utility/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import NewsFeed from '../public/NewsFeed'
import AddOfficerNews from './AddOfficerNews/AddOfficerNews'
import Profile from './Profile/Profile'

export default function OfficerComponent() {

    const navigation = useNavigate()

    const [authenticated, setAuthenticated] = useState(false)
    const [active, setActive] = useState('profile')

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await instance.get('/officer/check-auth')
                console.log(res.data)
                setAuthenticated(true)
            }
            catch (err) {
                setAuthenticated(false)
                console.log({ error: err })
                navigation('/')
            }
        }
        checkAuth()
    }, [active])

    if (authenticated) return (
        <div className='officerComponent-container'>
            <Cover />
            <div className='navigation-container'>
                <ul>
                    {/* <li onClick={() => setActive('report')} style={active === 'report' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Monthly Report</li> */}
                    <li onClick={() => setActive('profile')} style={active === 'profile' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Profile</li>
                    <li onClick={() => setActive('add-news')} style={active === 'add-news' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Add News</li>
                    <li onClick={() => setActive('news-feeds')} style={active === 'news-feeds' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>News Feeds</li>
                </ul>
            </div>
            {/* <Midwife /> */}
            {
                //   active === 'report' ? <Measure /> :
                // active === 'report' ? <p>Report</p> :
                active === 'profile' ? <Profile /> :
                    active === 'add-news' ? <AddOfficerNews /> :
                        active === 'add-news' ? <p>Add News</p> :
                            active === 'news-feeds' ? <NewsFeed user="officer" /> : null
            }
        </div>
    )
}
