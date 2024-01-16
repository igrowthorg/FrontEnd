import React, { useEffect, useState } from 'react'
import './MidwifeComponent.scss'
import Cover from '../cover/cover'
import Measure from './MonthlyMeasurement/MonthlyMeasurement'
import BabyDetails from './BabyDetails/BabyDetails'
import CreateAccount from './CreateAccount/CreateAccount'
import Vaccine from './Vaccine/Vaccine'
import AddMidwifeNews from '../MidwifeComponent/AddNewsSection/AddMidwifeNews'
import NewsFeed from '../public/NewsFeed'
import { useNavigate } from 'react-router-dom'
import instance from '../../utility/AxiosInstance'

export default function MinwifeComponent() {
  const navigation = useNavigate()

  const [authenticated, setAuthenticated] = useState(false)
  const [active, setActive] = useState('measure')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await instance.get('/midwife/check-auth')
        console.log(res.data)
        setAuthenticated(true)
      }
      catch (err) {
        setAuthenticated(false)
        console.log({ error: err })
        navigation('/auth')
      }
    }
    checkAuth()
  }, [active])

  if (authenticated) return (
    <div className='midwifeComponent-container'>
      <Cover />
      <div className='navigation-container'>
        <ul>
          <li onClick={() => setActive('measure')} style={active === 'measure' ? { background: '#fff', color: 'purple', fontWeight: 'bold' } : {}}>Monthly Measure</li>
          <li onClick={() => setActive('baby_detail')} style={active === 'baby_detail' ? { background: '#fff', color: 'purple', fontWeight: 'bold' } : {}}>Baby Detail</li>
          <li onClick={() => setActive('vacc_detail')} style={active === 'vacc_detail' ? { background: '#fff', color: 'purple', fontWeight: 'bold' } : {}}>Vaccine Detail</li>
          <li onClick={() => setActive('create_account')} style={active === 'create_account' ? { background: '#fff', color: 'purple', fontWeight: 'bold' } : {}}>Create Account</li>
          <li onClick={() => setActive('add-news')} style={active === 'add-news' ? { background: '#fff', color: 'purple', fontWeight: 'bold' } : {}}>Add News</li>
          <li onClick={() => setActive('news-feeds')} style={active === 'news-feeds' ? { background: '#fff', color: 'purple', fontWeight: 'bold' } : {}}>News Feeds</li>
        </ul>
      </div>
      {/* <Midwife /> */}
      {
        active === 'measure' ? <Measure /> :
          active === 'baby_detail' ? <BabyDetails /> :
            active === 'vacc_detail' ? <Vaccine /> :
              active === 'create_account' ? <CreateAccount /> :
                active === 'add-news' ? <AddMidwifeNews /> :
                  active === 'news-feeds' ? <NewsFeed user="midwife" /> : null
      }
    </div>
  )
}
