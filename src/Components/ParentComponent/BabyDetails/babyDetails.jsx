import React, { useEffect, useState } from 'react';
import './BabyDetails.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import instance from '../../../utility/AxiosInstance'


const GetVaccine = (props) => {

    const [vaccine, setVaccine] = useState(null);
    const [trigger, setTrigger] = useState(false);

    const childID = props.childID;

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get(`parent/vaccine/${childID}`);
                setVaccine(res.data)
                console.log(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [childID, trigger])

    const makeAsTaken = async (time_table_id, vaccine_id) => {
        console.log(time_table_id, vaccine_id);

        // Ask yes no question from user to make as taken confirm
        const userConfirmation = window.confirm("Are you sure you want to make as taken?");

        if (userConfirmation) {
            try {
                const res = await instance.post(`/midwife/child/vaccine/${childID}/${time_table_id}/${vaccine_id}`);
                console.log(res.data);
                setTrigger(!trigger);
                alert("Successfully made as taken")
            }
            catch (err) {
                console.log(err);
                alert("Can't make as taken")
            }
        }

    }

    if (vaccine !== null) return (
        <div className='vaccine-card-fram'>
            {vaccine.map((data, index) => (
                <div className='vaccine-fram' key={index} style={data.status === "eligible" ? { background: '#98fb98' } : data.status === "not_eligible" ? { background: '#dcdcdc' } : data.status === "taken" ? { background: '#6495ed' } : null}>
                    <p className='vaccine_name'>{data.vaccine_name}</p>
                </div>
            ))}
        </div>

    )
}

export default function BabyDetail() {

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

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(2);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get('/parent/child');
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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    if (apiData !== null) return (
        <div className='baby-details-container'>
            <div className='babyDetail-top'>
                <div className='searchbar'>
                    <input type="text" placeholder="Search.." name="search" className='search' value={searchQuery} onChange={handleSearchChange} />
                </div>
            </div>
            <div className='babyDetail-bottom'>
                <table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Child ID</td>
                            <td>Child Name</td>
                            <td>Birthday</td>
                            <td>Gender</td>
                            <td>Gardiant Name</td>
                            {/* <td>Mobile</td> */}
                            <td>More</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            apiData.map((data, index) => {
                                if ((data.child_id.toString().includes(searchQuery.toLowerCase()))) {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.child_id}</td>
                                            <td>{data.child_name}</td>
                                            <td>{data.child_birthday.split('T')[0]}</td>
                                            <td>{data.child_gender}</td>
                                            <td>{data.guardian_name}</td>
                                            {/* <td>{data.phone}</td> */}
                                            <td className='crud-btn'>
                                                <div className='top-detail' onClick={() => handleViewDetail(data)} >View Detail</div>
                                                {/* <div className='bottom-detail'>
                                                <div className='update'>Update</div>
                                                <div className='delete'>Delete</div>
                                                </div> */}
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
                                                                    <div className='detail'><h4>Gudiunt Name :</h4>{data.guardian_name}</div>
                                                                    <div className='detail'><h4>Address :</h4>{data.address}</div>
                                                                    {/* <div className='detail'><h4>Gudiunt Mobile :</h4>{data.phone}</div> */}
                                                                    <div className='detail'><h4>Bron Weight :</h4>{data.child_born_weight}</div>
                                                                    {/* <div className='detail'><h4>BMI :</h4>---</div>
                                                        <div className='detail'><h4>Stage :</h4>----</div> */}
                                                                </div>
                                                            </div>
                                                            <hr style={{ width: '1200px' }} />
                                                            <div className='bottom-section'>
                                                                <div className='bottom-left'>
                                                                    <h3>Vaccine Detail</h3>
                                                                    <GetVaccine childID={data.child_id} />

                                                                </div>
                                                                <hr style={{ height: '400px' }} />
                                                                <div className='bottom-right'>
                                                                    <h3>Development Activites</h3>
                                                                    <div className='development-activites-top'>
                                                                        {month.map((data, index) => (
                                                                            <div className={selectedMonth === data.no ? 'month-fram active' : 'month-fram'} key={index} onClick={() => setSelectedMonth(data.no)}>
                                                                                <p>{data.month}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className='development-activites-bottom'>
                                                                        <DevelopmentActivityTable childID={data.child_id} selectedMonth={selectedMonth} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const DevelopmentActivityTable = (props) => {
    const child_id = props.childID;
    const selected_month = props.selectedMonth;

    const [activity, setActivity] = useState([]);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get(`parent/dev-activity/${child_id}`);
                console.log(res.data);
                setActivity(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [child_id, selected_month, trigger])

    const MakeDone = async (id) => {
        try {
            const res = await instance.post(`parent/dev-activity/${child_id}/${id}`);
            console.log(res.data);
            setTrigger(prv => !prv)
            alert("Successfully made as done")
        }
        catch (err) {
            console.log(err);
        }
    }

    if (activity.length < 1) return (
        <p>No Activities</p>
    )

    return (
        <table style={{ width: '80%', height: '20px' }}>
            {
                activity.map((data, index) => {
                    if (data.activity_month === selected_month) return (
                        <tr key={index}>
                            <td className='number'>{index + 1}</td>
                            <td>{data.activity_name}</td>
                            {
                                data.done ? <td><button className='done'>Done</button></td> : <td><button className='makeAsDone' onClick={() => MakeDone(data.activity_id)}>Make as Done</button></td>
                            }
                        </tr>
                    )
                    return null
                })
            }
        </table>
    )
}