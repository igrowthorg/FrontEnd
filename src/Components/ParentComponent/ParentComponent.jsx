import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../../utility/AxiosInstance'
import './ParentComponent.scss'
import Cover from '../cover/cover'
import NewsFeed from './NewsFeed/News'
import Profile from './Profile/profile'
import BabyDetails from './BabyDetails/babyDetails'

export default function ParentComponent() {
  const navigation = useNavigate()

  const [authenticated, setAuthenticated] = useState(false)
  const [active, setActive] = useState('measure')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await instance.get('/parent/check-auth')
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
    <div className='parentComponent-container'>
      <Cover />
      <div className='navigation-container'>
        <ul>
          <li onClick={() => setActive('news-feed')} style={active === 'news-feed' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>News Feed</li>
          <li onClick={() => setActive('child-details')} style={active === 'child-details' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Child Details</li>
          <li onClick={() => setActive('profile')} style={active === 'profile' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>Profile</li>
        </ul>
      </div>
      {/* <Parent /> */}
      {
                active === 'child-details' ? <BabyDetails />:              
                active === 'profile' ? <Profile/>:
                 active === 'news-feed' ? <NewsFeed/> : null
      }
    </div>
  )
}
