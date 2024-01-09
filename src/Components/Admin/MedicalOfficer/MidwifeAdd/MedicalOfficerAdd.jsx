import React, { useEffect, useState } from 'react';
import './MedicalOfficerAdd.scss'
import instance from '../../../../utility/AxiosInstance';
export default function MedicalOfficerAdd(props) {

    const [getArea, setGetArea] = useState([]);

    const [selectedArea, setSelectedArea] = useState("");

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

    const submit = async (e) => {
        e.preventDefault();

        const formData = {
            officer_name: e.target['medicalOfficer-name'].value,
            service_start_date: e.target['medicalOfficer-service-start-date'].value,
            nic: e.target['medicalOfficer-nic'].value,
            email: e.target['medicalOfficer-email'].value,
            phone: e.target['medicalOfficer-mobile'].value,
            service_id: e.target['medicalOfficer-service-id'].value,
            area_id: selectedArea
        }

        console.log("tharindu", formData);

        instance.post('/admin/create-officer', formData).then((res) => {
            console.log(res);
            // props.setTrigger(prv => !prv)
            if (res.status === 200) {
                alert('Item Added Successfully');
            }
        }
        ).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className='midwifeAdd-container'>
            <div className="card-container">
                <div className="header">
                    <h4>Adding the Medical Officers</h4>
                </div>
                <form onSubmit={submit}>
                    <div className="input-section">
                        <div className="input-wrapper">
                            <select className='inputfieds' style={{ height: '35px', width: '91%' }} value={selectedArea} onChange={handleAreaChange}>
                                {getArea.map(area => (
                                    <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
                                ))}
                            </select>

                            <input type="text" name="medicalOfficer-name" id='medicalOfficer-name' placeholder='Enter the medicalOfficer Name' className='inputfieds' required />
                            <input type="text" name="medicalOfficer-nic" id='medicalOfficer-nic' placeholder='Enter the NIC' className='inputfieds' required />
                            <input type="date" name="medicalOfficer-service-start-date" id='medicalOfficer-service-start-date' placeholder='Enter the Service Start Date' className='inputfieds' required />
                            <input type="text" name="medicalOfficer-service-id" id='medicalOfficer-service-id' placeholder='Enter the Service_Id' className='inputfieds' required />
                            <input type="text" name="medicalOfficer-email" id='medicalOfficer-email' placeholder='Enter the Email' className='inputfieds' required />
                            <input type="text" name="medicalOfficer-mobile" id='medicalOfficer-mobile' placeholder='Enter the Mobile Number' className='inputfieds' required />
                        </div>
                    </div>
                    <div className="submission-btn">
                        {/* <div  type="submit">Submit</div> */}
                        <input className="submit-btn" type="submit" />
                        <div className="cancel-btn" onClick={() => props.setDisplayMedicalOfficerAdd(false)}>Cancel</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
