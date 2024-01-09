import React, { useEffect, useState } from 'react';
import './MidwifeAdd.scss'
import instance from '../../../../utility/AxiosInstance';
export default function MidwifeAdd(props) {

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
            name: e.target['midwife-name'].value,
            service_start_date: e.target['midwife-service-start-date'].value,
            nic: e.target['midwife-nic'].value,
            email: e.target['midwife-email'].value,
            phone: e.target['midwife-mobile'].value,
            service_id: e.target['midwife-service-id'].value,
            area_id: selectedArea
        }

        instance.post('/admin/create-midwife', formData).then((res) => {
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
                    <h4>Adding the Midwife</h4>
                </div>
                <form onSubmit={submit}>
                    <div className="input-section">
                        <div className="input-wrapper">
                            {/* <input type="text" name="category-name" placeholder='Enter the Select Area'  required /> */}
                            {/* <select className='inputfieds' style={{ height: '35px', width: '91%' }}>
                                <option value="someOption">Login As a Admin</option>
                                <option value="otherOption">Login As a Midwife</option>
                                <option value="otherOption">Login As a Medical Officer</option>
                            </select> */}
                            <select className='inputfieds' style={{ height: '35px', width: '91%' }} value={selectedArea} onChange={handleAreaChange}>
                                {/* <option value="">Select an Area</option> */}
                                {getArea.map(area => (
                                    <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
                                ))}
                            </select>

                            <input type="text" name="midwife-name" id='midwife-name' placeholder='Enter the Midwife Name' className='inputfieds' required />
                            <input type="text" name="midwife-nic" id='midwife-nic' placeholder='Enter the NIC' className='inputfieds' required />
                            <input type="date" name="midwife-service-start-date" id='midwife-service-start-date' placeholder='Enter the Service Start Date' className='inputfieds' required />
                            <input type="text" name="midwife-service-id" id='midwife-service-id' placeholder='Enter the Service_Id' className='inputfieds' required />
                            <input type="text" name="midwife-email" id='midwife-email' placeholder='Enter the Email' className='inputfieds' required />
                            <input type="text" name="midwife-mobile" id='midwife-mobile' placeholder='Enter the Mobile Number' className='inputfieds' required />
                        </div>
                    </div>
                    <div className="submission-btn">
                        {/* <div  type="submit">Submit</div> */}
                        <input className="submit-btn" type="submit" />
                        <div className="cancel-btn" onClick={() => props.setDisplayMidwifeAdd(false)}>Cancel</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
