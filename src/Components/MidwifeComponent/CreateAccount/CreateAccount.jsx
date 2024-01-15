import React, { useEffect, useState } from 'react';
import './CreateAccount.scss'
import { AiFillPlusSquare, AiFillCloseCircle } from 'react-icons/ai'
import ParentDataAdd from './ParentDataAdd/ParentDataAdd'
import instance from '../../../utility/AxiosInstance';

export default function CreateAccount() {

    const [inputData, setInputData] = useState({
        child_name: "",
        child_gender: "male",
        child_birthday: "",
        child_birth_certificate_no: "",
        child_born_weight: "",
        gardian_nic: ""
    })

    const [displayParentAdd, setDisplayParentAdd] = useState(false);

    const [displayParerntUpdate, setDisplayParerntUpdate] = useState(false);

    const [showParentDetail, setShowParerntDetail] = useState(false)

    const [selectedParent, setSelectedParent] = useState(null);

    const [allParent, setAllParent] = useState([]);

    const [trigger, setTrigger] = useState(false);

    const [motherName, setMontherName] = useState("");

    const [fatherName, setFatherName] = useState("");

    const [phone, setPhone] = useState("");

    const [address, setAddress] = useState("");

    const [guardianName, setGuardianName] = useState("");

    const [guardianNIC, setGuardianNIC] = useState("");

    const [email, setEmail] = useState();

    const [searchQuery, setSearchQuery] = useState('');

    const handleMontherNameChange = (e) => {
        setMontherName(e.target.value);
    };
    const handleFatherNameChange = (e) => {
        setFatherName(e.target.value);
    };
    const handleGuardianNameChange = (e) => {
        setGuardianName(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const handlephoneChange = (e) => {
        setPhone(e.target.value);
    };

    function showCode() {
        setDisplayParentAdd(true);
        console.log(displayParentAdd);
    }

    const showParentnDetailWindow = (parent) => {
        setSelectedParent(parent);
        setShowParerntDetail(true);
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
    }, [trigger])

    // const createChild = async (e) => {
    //     e.preventDefault();
    //     console.log(inputData);
    // }

    const submit = async (e) => {
        e.preventDefault();

        try {
            console.log(inputData);
            const res = await instance.post('/midwife/child', inputData);

            if (res.status === 200) {
                document.getElementById("childAddForm").reset();
                alert('Child Added Successfully');
            }
        } catch (err) {
            console.log(err.response.data.message);
            // alert(err.response.data.message);
            alert("Please Fill the recods correctly");
        }
    }

    const handleUpdateWindow = (parent) => {
        setSelectedParent(parent.guardian_nic);
        setFatherName(parent.father_name);
        setMontherName(parent.mother_name);
        setPhone(parent.phone);
        setAddress(parent.address);
        setGuardianName(parent.guardian_name);
        setGuardianNIC(parent.guardian_nic);
        setEmail(parent.email);
        setDisplayParerntUpdate(true);
    }

    const handleCloseUpdateWindow = () => {
        setSelectedParent(null);
        setDisplayParerntUpdate(false);
    }

    const updateParernt = async (e) => {
        e.preventDefault();

        const formData = {
            guardian_name: e.target['guardian-name'].value,
            mother_name: e.target['mother-name'].value,
            father_name: e.target['father-name'].value,
            phone: e.target['mobile'].value,
            address: e.target['address'].value,
        }

        console.log(selectedParent);

        try {
            // Make PATCH request to update category
            await instance.put(`/midwife/parent/${selectedParent}`, formData);

            // Close the update popup
            setDisplayParerntUpdate(false);
            setTrigger(!trigger);

        } catch (error) {
            console.error("Error updating Parent: ", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className='CreateAccount-container'>
            {displayParentAdd ? <ParentDataAdd setDisplayParentAdd={setDisplayParentAdd} setTrigger={setTrigger} /> : null}
            <div className='CreateAccount-left'>
                <h3>Parent Detail</h3>
                <div className='parent-section-top'>
                    <input type='text' placeholder='search...' value={searchQuery} onChange={handleSearchChange} />
                    <AiFillPlusSquare fontSize={40} className='icon' onClick={showCode} />
                </div>
                <div className='parent-section-bottom'>
                    <div className='detail-section'>
                        <table>
                            <thead>
                                <tr>
                                    <td>No</td>
                                    <td>Guardian NIC</td>
                                    <td>Guardian Name</td>
                                    {/* <td>Address</td> */}
                                    <td>Mobile</td>
                                    <td>More</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allParent.map((data, key) => {
                                        if ((data.guardian_nic.toString().includes(searchQuery.toLowerCase())) || ((data.guardian_name.toString().includes(searchQuery.toLowerCase()))) || ((data.phone.toString().includes(searchQuery.toLowerCase())))) {
                                            return (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{data.guardian_nic}</td>
                                                    <td>{data.guardian_name}</td>
                                                    {/* <td>4</td> */}
                                                    <td>{data.phone}</td>
                                                    <td className='crud-btn'>
                                                        <div className='top-detail' onClick={() => showParentnDetailWindow(data)}>View Detail</div>
                                                        <div className='update' setTrigger={setTrigger} onClick={() => handleUpdateWindow(data)}>Update</div>
                                                    </td>

                                                    {displayParerntUpdate && (
                                                        <div className='parentUpdate-container'>
                                                            <div className="card-container">
                                                                <div className="header">
                                                                    <h4>Adding the Parent</h4>
                                                                </div>
                                                                <form onSubmit={updateParernt} style={{ height: '68vh' }}>
                                                                    <div className="input-section">
                                                                        <div className="input-wrapper">
                                                                            <select className='inputfieds' style={{ height: '35px', width: '91%' }} disabled={true} id='select_area_001003' value={data.area_name}>
                                                                                <option style={{ display: 'none' }} >{data.area_name}</option>
                                                                            </select>
                                                                            <input type="text" name="guardian-nic" id='guardian-nic' placeholder='Enter the Guardian NIC' className='inputfieds' value={guardianNIC} disabled={true} required />
                                                                            <input type="text" name="guardian-name" id='guardian-name' placeholder='Enter the Guardian Name' className='inputfieds' value={guardianName} required onChange={handleGuardianNameChange} />
                                                                            <input type="text" name="mother-name" id='mother-name' placeholder='Enter the Mother Name' className='inputfieds' value={motherName} required onChange={handleMontherNameChange} />
                                                                            <input type="text" name="father-name" id='father-name' placeholder='Enter the Father Number' className='inputfieds' value={fatherName} required onChange={handleFatherNameChange} />
                                                                            <input type="text" name="mobile" id='mobile' placeholder='Enter the Mobile Number' className='inputfieds' value={phone} required onChange={handlephoneChange} />
                                                                            <input type="email" name="email" id='email' placeholder='Enter the Email Address' className='inputfieds' value={email} disabled={true} required onChange={handleAddressChange} />
                                                                            <input type="text" name="address" id='address' placeholder='Enter the Address' className='inputfieds' value={address} required />
                                                                        </div>
                                                                    </div>
                                                                    <div className="submission-btn">
                                                                        {/* <div  type="submit">Submit</div> */}
                                                                        <input className="submit-btn" type="submit" value={"Update"} />
                                                                        <div className="cancel-btn" onClick={handleCloseUpdateWindow}>Cancel</div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {showParentDetail && selectedParent && selectedParent.gardian_nic === data.gardian_nic && (
                                                        <div className='cardView-container'>
                                                            <div className="cardView">
                                                                <div className="close-icon"><AiFillCloseCircle size={25} color='red' className='icon' onClick={() => setShowParerntDetail(false)} /></div>
                                                                <div className="card-section">
                                                                    <div className="view-card-fram">
                                                                        <div className='header'><h2>Parent Detail</h2></div>
                                                                        <div className='detail-body'>
                                                                            <div className='detail'><h4>Guardian NIC :</h4>{selectedParent.guardian_nic}</div>
                                                                            <div className='detail'><h4>Guardian Name :</h4>{selectedParent.guardian_name}</div>
                                                                            <div className='detail'><h4>Father Name :</h4>{selectedParent.father_name}</div>
                                                                            <div className='detail'><h4>Monther Name :</h4>{selectedParent.mother_name}</div>
                                                                            <div className='detail'><h4>Address :</h4>{selectedParent.address}</div>
                                                                            <div className='detail'><h4>Area :</h4>{selectedParent.area_name}</div>
                                                                            <div className='detail'><h4>Gmail :</h4>{selectedParent.email}</div>
                                                                            <div className='detail'><h4>Mobile :</h4>{selectedParent.phone}</div>
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
            </div>
            <div className='CreateAccount-right'>
                <h3>Children Detail</h3>
                <div className='body-section'>
                    {/* <form onSubmit={createChild} > */}
                    <form onSubmit={submit} id='childAddForm'>
                        <div className="form-group">
                            <label htmlFor="name">Guardian NIC:</label>
                            <input
                                required={true}
                                type="text"
                                id="guardian_id"
                                name="guardian_id"
                                onChange={(e) => setInputData({ ...inputData, gardian_nic: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Baby's Name:</label>
                            <input
                                required={true}
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setInputData({ ...inputData, child_name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday">Birthday:</label>
                            <input
                                required={true}
                                type="date"
                                id="birthday"
                                name="birthday"
                                onChange={(e) => setInputData({ ...inputData, child_birthday: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="birthday">Birth Weight:</label>
                            <input
                                required={true}
                                type="number"
                                id="birth_weight"
                                name="birth_weight"
                                onChange={(e) => setInputData({ ...inputData, child_born_weight: e.target.value })}
                            />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <input
                                required={true}
                                type="text"
                                id="gender"
                                name="gender"
                                onChange={e => setInputData({ ...inputData, child_gender: e.target.value })}
                            />
                        </div> */}

                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <select name="gender" id="gender" onChange={e => setInputData({ ...inputData, child_gender: e.target.value || 'male' })}>
                                <option value="male" selected={true}>Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>


                        <div className="form-group">
                            <label htmlFor="gender">Birth Certificate Number:</label>
                            <input
                                required={true}
                                type="text"
                                id="registration_number"
                                name="registration_number"
                                onChange={e => setInputData({ ...inputData, child_birth_certificate_no: e.target.value })}
                            />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="parentName">Guardian's Name:</label>
                            <input
                                required={true}
                                type="text"
                                id="parentName"
                                name="parentName"
                                onChange={e => setInputData({ ...inputData, parent_name: e.target.value })}
                            />
                        </div> */}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
