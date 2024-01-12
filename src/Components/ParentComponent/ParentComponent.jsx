import React, { useState } from 'react'
import './ParentComponent.scss'
import Cover from '../cover/cover'

export default function MinwifeComponent() {
  const [active, setActive] = useState('')
  return (
    <div className='midwifeComponent-container'>
      <Cover />
      <div className='navigation-container'>
        <ul>
          <li onClick={() => setActive('news-feed')} style={active === 'news-feed' ? { background: '#fff', color: 'green', fontWeight: 'bold' } : {}}>News Feed</li>
        </ul>
      </div>
      {/* <Parent /> */}
      {
                active === 'news-feed' ? <p>News Feed</p> : null
      }
    </div>
  )
}
