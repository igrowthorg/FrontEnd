import React, { useEffect, useState } from 'react';
import './MidwifeAdd.scss'
import instance from '../../../../utility/AxiosInstance';
export default function MidwifeAdd(props) {

    const [getArea, setGetArea] = useState([]);


    const [isWaiting, setIsWaiting] = useState(false);
    const [selectedArea, setSelectedArea] = useState("Select_an_Area");

    useEffect(() => {
        instance.get("/admin/allowed-area")
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

        if (selectedArea === "Select_an_Area") {
            alert("Please select an area");
            document.getElementById('select_area_001001').focus();
            return;
        }

        setIsWaiting(true);

        const formData = {
            name: e.target['midwife-name'].value,
            service_start_date: e.target['midwife-service-start-date'].value,
            nic: e.target['midwife-nic'].value,
            email: e.target['midwife-email'].value,
            phone: e.target['midwife-mobile'].value,
            service_id: e.target['midwife-service-id'].value,
            area_id: selectedArea
        }

        try {
            const res = await instance.post('/admin/create-midwife', formData);
            props.setTrigger((prevTrigger) => !prevTrigger);

            if (res.status === 200) {
                props.setDisplayMidwifeAdd(false);
                alert('Midwife Added Successfully');
            }
        } catch (err) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        } finally {
            setIsWaiting(false);
        }
    }


    return (
        <div className='midwifeAdd-container'>
            <div className="card-container" style={{ height: '75vh' }}>
                <div className="header">
                    <h4>Adding the Midwife</h4>
                </div>
                <form onSubmit={submit} style={{ height: '80vh' }}>
                    <div className="input-section">
                        <div className="input-wrapper">
                            {/* <input type="text" name="category-name" placeholder='Enter the Select Area'  required /> */}
                            {/* <select className='inputfieds' style={{ height: '35px', width: '91%' }}>
                                <option value="someOption">Login As a Admin</option>
                                <option value="otherOption">Login As a Midwife</option>
                                <option value="otherOption">Login As a Medical Officer</option>
                            </select> */}
                            <select className='inputfieds' style={{ height: '35px', width: '91%' }} id='select_area_001001' onChange={handleAreaChange}>
                                <option style={{ display: 'none' }} value="Select_an_Area">Select an Area</option>
                                {getArea.map(area => (
                                    <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
                                ))}
                            </select>

                            <input type="text" name="midwife-name" id='midwife-name' placeholder='Enter the Midwife Name' className='inputfieds' required />
                            <input type="text" name="midwife-nic" id='midwife-nic' placeholder='Enter the NIC' className='inputfieds' required />
                            <input type="date" name="midwife-service-start-date" id='midwife-service-start-date' title='Select the Service Start Date' placeholder='Enter the Service Start Date' className='inputfieds' required />
                            <input type="text" name="midwife-service-id" id='midwife-service-id' placeholder='Enter the Service_Id' className='inputfieds' required />
                            <input type="email" name="midwife-email" id='midwife-email' placeholder='Enter the Email' className='inputfieds' required />
                            <input type="text" name="midwife-mobile" id='midwife-mobile' placeholder='Enter the Mobile Number' className='inputfieds' required />
                        </div>
                    </div>
                    <div className="submission-btn">
                        {/* <div  type="submit">Submit</div> */}
                        <input className="submit-btn" type="submit" value={isWaiting ? "Waiting..." : "Add"} disabled={isWaiting} />
                        <div className="cancel-btn" onClick={() => props.setDisplayMidwifeAdd(false)}>Cancel</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
