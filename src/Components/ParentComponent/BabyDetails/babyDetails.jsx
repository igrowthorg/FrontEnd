import React, { useEffect, useState } from 'react';
import '../../MidwifeComponent/BabyDetails/BabyDetails.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import instance from '../../../utility/AxiosInstance'


const GetDevelopment = (props) => {

    const [development, setDevelopment] = useState(null);
    const [trigger, setTrigger] = useState(false);

    const childID = props.childID;

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get(`parent/child/development/${childID}`);
                setDevelopment(res.data)
                console.log(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [childID, trigger])

    const makeAsDone = async (done_development_id, development_id) => {
        console.log(done_development_id, development_id);

        // Ask yes no question from user to make as done
        const userConfirmation = window.confirm("Are you sure you want to make as done?");

        if (userConfirmation) {
            try {
                const res = await instance.post(`/midwife/child/vaccine/${childID}/${done_development_id}/${development_id}`);
                console.log(res.data);
                setTrigger(!trigger);
                alert("Successfully made as done")
            }
            catch (err) {
                console.log(err);
                alert("Can't make as done")
            }
        }
    }

    if (development !== null) return (
        <div className='vaccine-card-fram'>
            {development.map((data, index) => (
                <div className='vaccine-fram' key={index} style={data.status === "eligible" ? { background: '#98fb98' } : data.status === "not_eligible" ? { background: '#dcdcdc' } : data.status === "done" ? { background: '#6495ed' } : null}>
                    <p className='vaccine_name'>{data.devlopment_name}</p>
                    {
                        data.status === "eligible" && <button onClick={() => makeAsDone(data.time_table_id, data.vaccine_id)}>Make as taken</button>
                    }
                </div>
            ))}
        </div>

    )
}

export default function BabyDetails() {

    const month = [
        { month: '2M', no: 2 },
        { month: '4M', no: 4 },
        { month: '6M', no: 6 },
        { month: '9M', no: 9 },
        { month: '12M', no: 12 },
        { month: '18M', no: 18 },
        { month: '24M', no: 24 },
        { month: '36M', no: 36 },
        { month: '48M', no: 48 },
        { month: '60M', no: 60 },
    ]

    const [showDetail, setShowDetail] = useState(false);

    const [selectedBaby, setSelectedBaby] = useState(null);

    const [apiData, setApiData] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState(2);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get('/midwife/child');
                setApiData(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])

    const handleViewDetail = (babyDetail) => {
        setSelectedBaby(babyDetail);
        setShowDetail(true);
    }

    const handleCloseViewDetail = () => {
        setSelectedBaby(null);
        setShowDetail(false);
    }


    if (apiData !== null) return (
        <div className='baby-details-container'>
            <div className='babyDetail-bottom'>
                <table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Child ID</td>
                            <td>Child Name</td>
                            <td>Birthday</td>
                            <td>Gender</td>
                            <td>More</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            apiData.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.child_id}</td>
                                            <td>{data.child_name}</td>
                                            <td>{data.child_birthday.split('T')[0]}</td>
                                            <td>{data.child_gender}</td>
                                            <td className='crud-btn'>
                                                <div className='top-detail' onClick={() => handleViewDetail(data)} >View Detail</div>
                                            </td>

                                            {showDetail && selectedBaby && selectedBaby.child_id === data.child_id && (
                                                <div className='babyDetail-view-container'>
                                                    <div className="cardView">
                                                        <div className="close-icon"><AiFillCloseCircle size={25} color='red' className='icon' onClick={handleCloseViewDetail} /></div>
                                                        <div className="card-section">
                                                            <div className='top-section'>
                                                                <h3>Details:</h3>
                                                                <div className='detail-body'>
                                                                    <div className='detail'><h4>Children ID :</h4>{data.child_id}</div>
                                                                    <div className='detail'><h4>Name :</h4>{data.child_name}</div>
                                                                    <div className='detail'><h4>Birthday :</h4>{data.child_birthday.split('T')[0]}</div>
                                                                    <div className='detail'><h4>Gender :</h4>{data.child_gender}</div>
                                                                    <div className='detail'><h4>Guardian Name :</h4>{data.guardian_name}</div>
                                                                    <div className='detail'><h4>Address :</h4>{data.address}</div>
                                                                    <div className='detail'><h4>Guardian Mobile :</h4>{data.phone}</div>
                                                                    <div className='detail'><h4>Bron Weight :</h4>{data.child_born_weight}</div>
                                                                </div>
                                                            </div>
                                                            <hr style={{ width: '1200px' }} />
                                                            <div className='bottom-section'>
                                                                <div className='bottom-left'>
                                                                    <h3>Development Activities</h3>
                                                                    <div className='development-activites-top'>
                                                                        {month.map((data, index) => (
                                                                            <div className={selectedMonth === data.no ? 'month-fram active' : 'month-fram'} key={index} onClick={() => setSelectedMonth(data.no)}>
                                                                                <p>{data.month}</p>
                                                                            </div>
                                                                        ))}
                                                                        <GetDevelopment childID={data.child_id} />
                                                                    </div>

                                                                </div>
                                                                <hr style={{ height: '400px' }} />
                                                                <div className='bottom-right'>
                                                                    <h3>Vaccine Details</h3>                                                                 
                                                                </div>
                                                                    <div className='development-activites-bottom'>
                                                                        <Vaccine childID={data.child_id}/>
                                                                    </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </tr>
                                    )
                                
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const Vaccine = (props) => {
    const child_id = props.childID;

    const [vaccine, setVaccine] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get(`/parent/vaccine/${child_id}`);
                console.log(res.data);
                // setActivity(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [child_id])

    if (vaccine.length < 1) return (
        <p>No taken vaccine</p>
    )

    return (
        <table style={{ width: '80%', height: '20px' }}>
            {
                vaccine.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td className='number'>{index + 1}</td>
                            <td>{data.vaccine_name}</td>
                        </tr>
                    )
                })
            }
        </table>
    )
}