import React, { useEffect, useState } from 'react'
import './Login.css'
import instance from '../../utility/AxiosInstance'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [active, setActive] = useState('midwife')

    const navigation = useNavigate()

    useEffect(() => {
        console.log(active);
    }, [active])

    const submitForm = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;



        if (username && password) {
            if (active === "admin") {
                instance.post('/admin/login', {
                    username: username,
                    password: password
                }).then(res => {
                    console.log(res.data);
                    navigation('/admin');
                })
                    .catch(err => {
                        alert("Please Enter the Corrected Username and Password")
                        console.log(err);
                    })
            }
            else if (active === "midwife") {
                instance.post('/midwife/login', {
                    nic: username,
                    password: password
                }).then(res => {
                    console.log(res.data);
                    navigation('/midwife');
                })
                    .catch(err => {
                        alert("Please Enter the Corrected Username and Password")
                        console.log(err);
                    })

            }
            else {
                alert("Please select a user type.")
            }


        }
    }

    return (
        <div className='login-container'>
            <div className="login-card-container">
                <div className="card-header">
                    <h1 style={{ color: 'red' }}>i-Growth</h1>
                </div>
                <div className="body-section">

                    <form onSubmit={submitForm}>
                        <div className="title">
                            {/* <h2>Admin Login</h2> */}
                            <select onChange={(e) => setActive(e.target.value)} defaultValue={active} style={{ width: '365px', height: '35px' }}>
                                <option value="admin">Login As a Admin</option>
                                <option value="midwife">Login As a Midwife</option>
                                <option value="otherOption">Login As a Medical Officer</option>
                            </select>
                        </div>
                        <div className="input-feild-container">
                            <div className='label-container'><label>NIC Number</label></div>
                            <input type="text" name="username" placeholder='Enter the user name' id='username' />
                        </div>
                        <div className="input-feild-container">
                            <div className='label-container'><label>Password</label></div>
                            <input type="password" name="password" id="password" placeholder='Enter the password' />
                        </div>
                        <div className='error-massage' style={{ opacity: '0' }}>Enter the correct user name and password</div>
                        <div className="submitButton"><input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
