import React, { useState } from 'react'
import './ParentComponent.scss'
import Cover from '../cover/cover'
import Profile from './Profile/profile'
import BabyDetails from './BabyDetails/babyDetails'

export default function ParentComponent() {
  const [active, setActive] = useState('')
  return (
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
                 active === 'news-feed' ? <p>News Feed</p> : null
      }
    </div>
  )
}
