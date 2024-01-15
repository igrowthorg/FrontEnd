import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SupperAdmin.scss'
import { AiFillPlusSquare, AiFillCloseCircle } from 'react-icons/ai'
import Cover from '../../cover/cover'
import SuperAdminAdd from './SuperAdminAdd/SuperAdminAdd'
import instance from '../../../utility/AxiosInstance'

const SupperAdmin = () => {

  const navigation = useNavigate()

  const [authenticated, setAuthenticated] = useState(false)

  const [trigger, setTrigger] = useState(false)

  const [addAdmin, setAddAdmin] = useState(false)

  const [allAdmin, setAllAdmin] = useState()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await instance.get('/admin/admin-type')
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
  }, [])

  useEffect(() => {
    instance.get("/admin/admins")
      .then(res => {
        if (res.data !== "No data found") {
          setAllAdmin(res.data)
          console.log(res.data)
        }
        else console.log("No data found");
      }).catch(err => console.log(err))
  }, [trigger])

  function showAddWindow() {
    setAddAdmin(true)
  }

  if (authenticated) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Cover />
      <div className='superAdmin-container' style={{ height: '85vh' }}>
        {addAdmin ? <SuperAdminAdd setAddAdmin={setAddAdmin} setTrigger={setTrigger} /> : null}
        <div className="head">
          <div className="name"><h2>Super Admin</h2></div>
          <AiFillPlusSquare fontSize={50} className='icon' onClick={showAddWindow} />
        </div>
        <div className='body' style={{ height: '70vh', borderRadius: '0 0 8px 8px' }}>

          {allAdmin && allAdmin.map((data, key) => (
            <div className="card-fram" key={key}>
              <p className='user-name'>{data.username}</p>
              <p>{data.email}</p>
              <p>{data.district_name}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default SupperAdmin