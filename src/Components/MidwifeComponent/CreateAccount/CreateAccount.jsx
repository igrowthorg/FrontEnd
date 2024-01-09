import React, { useEffect, useState } from 'react';
import './CreateAccount.scss'
import { AiFillPlusSquare } from 'react-icons/ai'
import ParentDataAdd from './ParentDataAdd/ParentDataAdd'
import instance from '../../../utility/AxiosInstance';

export default function CreateAccount() {

    const data = [
        { no: '01', parentId: '001', name: 'gamlath', mobile: '0123456789' },
        { no: '02', parentId: '002', name: 'john doe', mobile: '0789456123' },
        { no: '03', parentId: '003', name: 'sarah j', mobile: '7531592581' }
    ]

    const [displayParentAdd, setDisplayParentAdd] = useState(false);

    const [allParent, setAllParent] = useState([]);

    function showCode() {
        setDisplayParentAdd(true);
    }

    useEffect(() => {
        instance.get("/midwife/parents")
            .then(res => {
                if (res.data !== "No data found") {
                    setAllParent(res.data)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [])

    return (
        <div className='CreateAccount-container'>
            {displayParentAdd ? <ParentDataAdd setDisplayParentAdd={setDisplayParentAdd} /> : null}
            <div className='CreateAccount-left'>
                <h3>Parent Detail</h3>
                <div className='parent-section-top'>
                    <input type='text' placeholder='search...' />
                    <AiFillPlusSquare fontSize={40} className='icon' onClick={showCode} />
                </div>
                <div className='parent-section-bottom'>
                    <div className='detail-section'>
                        <table>
                            <thead>
                                <tr>
                                    <td>No</td>
                                    <td>Guardian NIC</td>
                                    <td>Name</td>
                                    {/* <td>Address</td> */}
                                    <td>Mobile</td>
                                    <td>More</td>
                                </tr>
                            </thead>
                            <tbody>
                                {allParent.map((data, key) => (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{data.guardian_nic}</td>
                                        <td>{data.guardian_name}</td>
                                        {/* <td>4</td> */}
                                        <td>{data.phone}</td>
                                        <td className='crud-btn'>
                                            <div className='top-detail'>View Detail</div>
                                            <div className='update'>Update</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <div className='CreateAccount-right'>
                <h3>Children Detail</h3>
                <div className='body-section'>
                    <form >
                        <div className="form-group">
                            <label htmlFor="name">Parent ID:</label>
                            <input
                                type="text"
                                id="parent_id"
                                name="parent_id"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Baby's Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday">Birthday:</label>
                            <input
                                type="date"
                                id="birthday"
                                name="birthday"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Month:</label>
                            <input
                                type="text"
                                id="month"
                                name="month"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <input
                                type="text"
                                id="gender"
                                name="gender"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Registration Number:</label>
                            <input
                                type="text"
                                id="registration_number"
                                name="registration_number"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="parentName">Parent's Name:</label>
                            <input
                                type="text"
                                id="parentName"
                                name="parentName"
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
