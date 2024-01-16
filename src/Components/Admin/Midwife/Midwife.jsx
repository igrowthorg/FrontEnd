import React, { useEffect, useState } from 'react';
import './Midwife.scss'
import MidwifeAdd from './MidwifeAdd/MidwifeAdd';
import { AiFillPlusSquare, AiFillCloseCircle } from 'react-icons/ai'
import instance from '../../../utility/AxiosInstance'

export default function Mifwife() {

    const [trigger, setTrigger] = useState(false);

    const [getArea, setGetArea] = useState([]);

    const [selectedArea, setSelectedArea] = useState("");

    const [displayMidwifeAdd, setDisplayMidwifeAdd] = useState(false);

    const [selectedMidwife, setSelectedMidwife] = useState(null);

    const [showDetail, setShowDetail] = useState(false);

    const [getAllMidwifes, setGetAllMidwifes] = useState([]);

    const [showMidwifeUpdate, setShowMidwifeUpdate] = useState(false);

    const [midwifeName, setMidwifeName] = useState("");

    const [nic, setNic] = useState("");

    const [serviceStartDate, setServiceStartDate] = useState("");

    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");

    const [serviceId, setServiceId] = useState("");

    const handleMidwifeNameChange = (e) => {
        setMidwifeName(e.target.value);
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
        setDisplayMidwifeAdd(true);
    }

    const handleViewDetail = (midwifes) => {
        setSelectedMidwife(midwifes);
        setShowDetail(true);
    }

    const handleCloseViewDetail = () => {
        setSelectedMidwife(null);
        setShowDetail(false);
    }

    const handleUpdateWindow = (midwifes) => {
        setMidwifeName(midwifes.name);
        setNic(midwifes.nic);
        setServiceStartDate(midwifes.service_start_date);
        setEmail(midwifes.email);
        setPhone(midwifes.phone);
        setServiceId(midwifes.service_id);
        setSelectedMidwife(midwifes);
        setShowMidwifeUpdate(true)
    }

    const handleCloseUpdateWindow = () => {
        setSelectedMidwife(null);
        setShowMidwifeUpdate(false);
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
        instance.get("/admin/midwifes")
            .then(res => {
                if (res.data !== "No data found") {
                    setGetAllMidwifes(res.data)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [trigger])

    const submit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target['midwife-name'].value,
            service_start_date: e.target['midwife-service-start-date'].value,
            nic: e.target['midwife-nic'].value,
            email: e.target['midwife-email'].value,
            phone: e.target['midwife-mobile'].value,
            service_id: e.target['midwife-service-id'].value,
        }

        try {
            // Make PATCH request to update category
            await instance.put(`/admin/midwife/${selectedMidwife.midwife_id}`, formData);

            // Close the update popup
            setShowMidwifeUpdate(false);
            setTrigger(!trigger);

        } catch (error) {
            console.error("Error updating Midwife: ", error);
        }
    };

    // const handleDeleteMidwife = async (midwife) => {
    //     const confirmDelete = window.confirm(`Are you sure, you want to delete "${midwife.name}"?`);
    //     if (confirmDelete) {
    //         try {
    //             await instance.delete(`/admin/midwife/${midwife.midwife_id}`);
    //             setTrigger(!trigger);
    //         } catch (error) {
    //             console.error("Error deleting Midwife: ", error);
    //         }
    //     }
    // };


    const inputDateString = "2011-12-09T18:30:00.000Z";
    const inputDate = new Date(inputDateString);
    console.log(`${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()}`);

    return (
        <div className='midwife-container' style={{ height: '75vh' }}>
            {displayMidwifeAdd ? <MidwifeAdd setDisplayMidwifeAdd={setDisplayMidwifeAdd} setTrigger={setTrigger} /> : null}
            <div className="head">
                <div className="name"><h2>Midwife</h2></div>
                <AiFillPlusSquare fontSize={50} className='icon' onClick={showCode} />
            </div>
            <div className='body' style={{ height: '61vh', borderRadius: '0 0 8px 8px' }}>
                {
                    getAllMidwifes.map((data, index) => {
                        return (
                            <div className="card-fram" key={index}>
                                <div className="image-container">
                                    <div className='detail'>
                                        <h3 style={{ marginLeft: '50px' }}>{data.area_name}</h3>
                                    </div>
                                </div>
                                <div className="nameOfCard"><h3>{data.name}</h3></div>
                                <div className="crud-function">
                                    <div className="crud-btns">
                                        <div className="top">
                                            <div className="view-btn" onClick={() => handleViewDetail(data)} style={{ width: '150px' }}>View Details</div>
                                        </div>
                                        <div className="bottom" style={{ width: 'auto' }}>
                                            <div className="update" setTrigger={setTrigger} onClick={() => handleUpdateWindow(data)} style={{ width: '150px' }}>Update</div>
                                            {/* <div className="delete" style={{ width: '150px' }} onClick={() => handleDeleteMidwife(data)}>Delete</div> */}
                                        </div>
                                    </div>
                                </div>

                                {showDetail && selectedMidwife && selectedMidwife.midwife_id === data.midwife_id && (
                                    <div className='cardView-container'>
                                        <div className="cardView">
                                            <div className="close-icon"><AiFillCloseCircle size={25} color='red' className='icon' onClick={handleCloseViewDetail} /></div>
                                            <div className="card-section">
                                                <div className="view-card-fram">
                                                    <div className='header'><h2>Midwife Detail</h2></div>
                                                    <div className='detail-body'>
                                                        <div className='detail'><h4>Midwife ID :</h4>{selectedMidwife.midwife_id}</div>
                                                        <div className='detail'><h4>Name :</h4>{selectedMidwife.name}</div>
                                                        <div className='detail'><h4>Service ID :</h4>{selectedMidwife.service_id}</div>
                                                        <div className='detail'><h4>NIC :</h4>{selectedMidwife.nic}</div>
                                                        <div className='detail'><h4>Service Start Date :</h4>{selectedMidwife.service_start_date.split("T")[0]}</div>
                                                        <div className='detail'><h4>Gmail :</h4>{selectedMidwife.email}</div>
                                                        <div className='detail'><h4>Mobile :</h4>{selectedMidwife.phone}</div>
                                                        <div className='detail'><h4>Area :</h4>{selectedMidwife.area_name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showMidwifeUpdate && selectedMidwife && selectedMidwife.midwife_id === data.midwife_id && (
                                    // <div className='categoryUpdate-container'>
                                    //     <div className="card-container">
                                    //         <div className="header">
                                    //             <h4>{selectedMidwife.name}</h4>
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
                                                <h4>Update the Midwife</h4>
                                            </div>
                                            <form onSubmit={submit}>
                                                <div className="input-section">
                                                    <div className="input-wrapper">
                                                        {/* <input type="text" name="category-name" placeholder='Enter the Select Area'  required /> */}
                                                        <select className='inputfieds' style={{ height: '35px', width: '91%' }} value={getAllMidwifes[0].area_id} onChange={handleAreaChange} disabled={true} title='Midwife Service Area'>
                                                            {/* <option value="">Select an Area</option> */}
                                                            {getArea.map(area => (
                                                                <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
                                                            ))}
                                                        </select>
                                                        <input type="text" name="midwife-name" id='midwife-name' placeholder='Enter the Midwife Name' className='inputfieds' title='Name of Midwife' required value={midwifeName} onChange={handleMidwifeNameChange} />
                                                        <input type="text" name="midwife-nic" id='midwife-nic' placeholder='Enter the NIC' title='NIC Number' disabled={true} className='inputfieds' required value={nic} onChange={handleNicChange} />
                                                        <input type="text" name="midwife-service-start-date" id='midwife-service-start-date' title='Service Start Date' disabled={true} placeholder='Enter the Service Start Date' className='inputfieds' required value={serviceStartDate.split("T")[0]} onChange={handleserviceStartDatehange} />
                                                        <input type="text" name="midwife-service-id" id='midwife-service-id' disabled={true} title='Service ID' placeholder='Enter the Service_Id' className='inputfieds' required value={serviceId} onChange={handleServiceIdChange} />
                                                        <input type="text" name="midwife-email" id='midwife-email' disabled={true} placeholder='Enter the Email' className='inputfieds' title='Email' required value={email} onChange={handleEmailChange} />
                                                        <input type="text" name="midwife-mobile" id='midwife-mobile' placeholder='Enter the Mobile Number' className='inputfieds' title='Mobile Number' required value={phone} onChange={handleMobileChange} />
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
