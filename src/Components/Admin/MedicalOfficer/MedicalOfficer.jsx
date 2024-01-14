import React, { useEffect, useState } from 'react';
import './MedicalOfficer.scss'
import MidwifeAdd from './MidwifeAdd/MedicalOfficerAdd';
import { AiFillPlusSquare, AiFillCloseCircle } from 'react-icons/ai'
import instance from '../../../utility/AxiosInstance'

export default function MedicalOfficer() {

    const data = [
        { name: "Name", value: "Kagalugama", type: "text" },
        { name: "Email", value: "Thambala", type: "email" },
    ]

    const [trigger, setTrigger] = useState(false);

    const [getArea, setGetArea] = useState([]);

    const [selectedArea, setSelectedArea] = useState("");

    const [displayMedicalOfficerAdd, setDisplayMedicalOfficerAdd] = useState(false);

    const [selectedMedicalOfficer, setSelectedMedicalOfficer] = useState(null);

    const [showDetail, setShowDetail] = useState(false);

    const [medicalOfficer, setMedicalOfficer] = useState([]);

    const [showMedicalOfficerDetail, setShowMedicalOfficerDetail] = useState(false);

    const [medicalOfficerName, setMedicalOfficerName] = useState("");

    const [nic, setNic] = useState("");

    const [serviceStartDate, setServiceStartDate] = useState("");

    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");

    const [serviceId, setServiceId] = useState("");

    const handlemedicalOfficerNameChange = (e) => {
        setMedicalOfficerName(e.target.value);
    };

    const handleNicChange = (e) => {
        setNic(e.target.value);
    }

    const handleserviceStartDatehange = (e) => {
        setServiceStartDate(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleMobileChange = (e) => {
        setPhone(e.target.value);
    }

    const handleServiceIdChange = (e) => {
        setServiceId(e.target.value);
    }
    // formData.append('area_id', selectedArea);

    function showCode() {
        setDisplayMedicalOfficerAdd(true);
    }

    const handleViewDetail = (midwifes) => {
        setSelectedMedicalOfficer(midwifes);
        setShowDetail(true);
    }

    const handleCloseViewDetail = () => {
        setSelectedMedicalOfficer(null);
        setShowDetail(false);
    }

    const handleUpdateWindow = (midwifes) => {
        setMedicalOfficerName(midwifes.officer_name);
        setNic(midwifes.nic);
        setServiceStartDate(midwifes.service_start_date);
        setEmail(midwifes.email);
        setPhone(midwifes.phone);
        setServiceId(midwifes.service_id);
        setSelectedMedicalOfficer(midwifes);
        setShowMedicalOfficerDetail(true)
    }

    const handleCloseUpdateWindow = () => {
        setSelectedMedicalOfficer(null);
        setShowMedicalOfficerDetail(false);
    }

    useEffect(() => {
        instance.get("/public/areas")
            .then(res => {
                if (res.data !== "No data found") {
                    setGetArea(res.data)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [])

    const handleAreaChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedArea(selectedValue);
        console.log(selectedArea);
    };

    useEffect(() => {
        instance.get("/admin/get-all-officer")
            .then(res => {
                if (res.data !== "No data found") {
                    setMedicalOfficer(res.data)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [trigger])

    const submit = async (e) => {
        e.preventDefault();

        // Prepare form data
        // const formData = new FormData();

        // formData.append('name', midwifeName);
        // formData.append('service_start_date', serviceStartDate)
        // formData.append('nic', nic);
        // formData.append('email', email);
        // formData.append('phone', phone);
        // formData.append('service_id', serviceId);
        // formData.append('area_id',);

        const formData = {
            officer_name: e.target['medicalOfficer-name'].value,
            service_start_date: e.target['medicalOfficer-service-start-date'].value,
            nic: e.target['medicalOfficer-nic'].value,
            email: e.target['medicalOfficer-email'].value,
            phone: e.target['medicalOfficer-mobile'].value,
            service_id: e.target['medicalOfficer-service-id'].value,
            area_id: e.target['area'].value
        }

        try {
            // Make PATCH request to update category
            await instance.put(`/admin/officer/${selectedMedicalOfficer.officer_id}`, formData);

            // Close the update popup
            setShowMedicalOfficerDetail(false);
            setTrigger(!trigger);

        } catch (error) {
            console.error("Error updating Midwife: ", error);
        }
    };

    // const handleDeleteItem = (midwife) => {
    //     // Display a confirmation dialog
    //     const confirmDelete = window.confirm(`Are you sure you want to delete the category "${midwife.name}?"`);

    //     const chckAuth = async () => {
    //         // get token from local storage
    //         const token = await localStorage.getItem('loginToken');
    //         if (confirmDelete) {
    //             try {
    //                 await instance.delete(`/item/${item.item_id}`, config);
    //                 // After successful deletion, refetch categories
    //                 setTrigger(!trigger);

    //             } catch (error) {
    //                 console.error("Error deleting category: ", error);
    //             }
    //         }

    //     }
    //     chckAuth();
    // };

    const inputDateString = "2011-12-09T18:30:00.000Z";
    const inputDate = new Date(inputDateString);
    console.log(`${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()}`);

    return (
        <div className='midwife-container' style={{ height: '75vh' }}>
            {displayMedicalOfficerAdd ? <MidwifeAdd setDisplayMedicalOfficerAdd={setDisplayMedicalOfficerAdd} setTrigger={setTrigger} /> : null}
            <div className="head">
                <div className="name"><h2>Medical Officers</h2></div>
                <AiFillPlusSquare fontSize={50} className='icon' onClick={showCode} />
            </div>
            <div className='body' style={{ height: '61vh', borderRadius: '0 0 8px 8px' }}>
                {
                    medicalOfficer.map((data, index) => {
                        return (
                            <div className="card-fram" key={index}>
                                <div className="image-container">
                                    <div className='detail'>
                                        <h3 style={{ marginLeft: '50px' }}>{data.area_name}</h3>
                                    </div>
                                </div>
                                <div className="nameOfCard"><h3>{data.officer_name}</h3></div>
                                <div className="crud-function">
                                    <div className="crud-btns">
                                        <div className="top">
                                            <div className="view-btn" onClick={() => handleViewDetail(data)} style={{ width: '150px' }} >View Details</div>
                                        </div>
                                        <div className="bottom" style={{ width: 'auto' }}>
                                            <div className="update" onClick={() => handleUpdateWindow(data)} style={{ width: '150px' }} setTrigger={setTrigger}>Update</div>
                                            {/* <div className="delete">Delete</div> */}
                                        </div>
                                    </div>
                                </div>

                                {showDetail && selectedMedicalOfficer && selectedMedicalOfficer.midwife_id === data.midwife_id && (
                                    <div className='cardView-container'>
                                        <div className="cardView">
                                            <div className="close-icon"><AiFillCloseCircle size={25} color='red' className='icon' onClick={handleCloseViewDetail} /></div>
                                            <div className="card-section">
                                                <div className="view-card-fram">
                                                    <div className='header'><h2>Midwife Detail</h2></div>
                                                    <div className='detail-body'>
                                                        <div className='detail'><h4>Medical Officer ID :</h4>{selectedMedicalOfficer.officer_id}</div>
                                                        <div className='detail'><h4>Name :</h4>{selectedMedicalOfficer.officer_name}</div>
                                                        <div className='detail'><h4>Service ID :</h4>{selectedMedicalOfficer.service_id}</div>
                                                        <div className='detail'><h4>NIC :</h4>{selectedMedicalOfficer.nic}</div>
                                                        <div className='detail'><h4>Service Start Date :</h4>{selectedMedicalOfficer.service_start_date.split('T')[0]}</div>
                                                        <div className='detail'><h4>Gmail :</h4>{selectedMedicalOfficer.email}</div>
                                                        <div className='detail'><h4>Mobile :</h4>{selectedMedicalOfficer.phone}</div>
                                                        <div className='detail'><h4>Area :</h4>{selectedMedicalOfficer.area_id}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showMedicalOfficerDetail && selectedMedicalOfficer && selectedMedicalOfficer.midwife_id === data.midwife_id && (
                                    // <div className='categoryUpdate-container'>
                                    //     <div className="card-container">
                                    //         <div className="header">
                                    //             <h4>{selectedMedicalOfficer.name}</h4>
                                    //         </div>
                                    //         <form >
                                    //             <div className="input-section">
                                    //                 <div className="input-wrapper">
                                    //                     <input type="text" name="category-name" placeholder='Enter the Category Name' className='category-name' required
                                    //                         id='CategoryName'
                                    //                     // value={categoryName}
                                    //                     // onChange={handleCategoryNameChange} 
                                    //                     />
                                    //                     <div className="image-holder"><input type="file" id='UpdateImage' required /></div>
                                    //                 </div>
                                    //             </div>
                                    //             <div className="submission-btn">
                                    //                 <input className="submit-btn" type="submit" value={"Update"} />
                                    //                 <div className="cancel-btn" onClick={handleCloseUpdateWindow}>Cancel</div>
                                    //             </div>
                                    //         </form>
                                    //     </div>
                                    // </div>
                                    <div className='midwifeAdd-container'>
                                        <div className="card-container" style={{ height: '80vh' }}>
                                            <div className="header">
                                                <h4>Update the Medical Officers</h4>
                                            </div>
                                            <form onSubmit={submit}>
                                                <div className="input-section">
                                                    <div className="input-wrapper">
                                                        {/* <input type="text" name="category-name" placeholder='Enter the Select Area'  required /> */}
                                                        <select id='area' name='area' className='inputfieds' style={{ height: '35px', width: '91%' }} value={medicalOfficer[0].area_id} disabled onChange={handleAreaChange} title='Officer Service Area'>
                                                            {/* <option value="">Select an Area</option> */}
                                                            {getArea.map(area => (
                                                                <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
                                                            ))}
                                                        </select>
                                                        <input type="text" name="medicalOfficer-name" id='medicalOfficer-name' placeholder='Enter the medicalOfficer Name' className='inputfieds' title='Name of Officer' required value={medicalOfficerName} onChange={handlemedicalOfficerNameChange} />
                                                        <input type="text" name="medicalOfficer-nic" id='medicalOfficer-nic' title='NIC Number' disabled={true} placeholder='Enter the NIC' className='inputfieds' required value={nic} onChange={handleNicChange} />
                                                        <input type="text" name="medicalOfficer-service-start-date" title='Service Start Date' disabled={true} id='medicalOfficer-service-start-date' placeholder='Enter the Service Start Date' className='inputfieds' required value={serviceStartDate.split("T")[0]} onChange={handleserviceStartDatehange} />
                                                        <input type="text" name="medicalOfficer-service-id" title='Service ID' disabled={true} id='medicalOfficer-service-id' placeholder='Enter the Service_Id' className='inputfieds' required value={serviceId} onChange={handleServiceIdChange} />
                                                        <input type="email" name="medicalOfficer-email" title='Email' disabled={true} id='medicalOfficer-email' placeholder='Enter the Email' className='inputfieds' required value={email} onChange={handleEmailChange} />
                                                        <input type="text" name="medicalOfficer-mobile" id='medicalOfficer-mobile' placeholder='Enter the Mobile Number' className='inputfieds' title='Mobile Number' required value={phone} onChange={handleMobileChange} />
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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
