import React, { useState, useEffect } from 'react'
import './ParentDataAdd.scss'
import instance from '../../../../utility/AxiosInstance';

export default function ParentDataAdd(props) {

    const [getArea, setGetArea] = useState([]);
    const [activeArea, setActiveArea] = useState();

    const [selectedArea, setSelectedArea] = useState("Select_an_Area");

    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        instance.get("/public/areas")
            .then(res => {
                if (res.data !== "No data found") {
                    setGetArea(res.data)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))

        instance.get("/midwife/area")
            .then(res => {
                if (res.data !== "No data found") {
                    setActiveArea(res.data.area)
                    setSelectedArea(res.data.area);
                    console.log(res.data.area)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [])

    const handleAreaChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedArea(selectedValue);
        console.log(selectedArea);
    };

    const checkNICValidity = (nic) => {
        if(nic.length === 10 || nic.length === 12){
            if(nic.length === 10){
                if(nic[9] === 'V' || nic[9] === 'v'){
                    return true;
                }
                else{
                    return false;
                }
            }
            if(nic.length === 12){
                return true;
            }
        }
        else{
            return false;
        }
    }

    const submit = async (e) => {
        e.preventDefault();

        if (selectedArea === "Select_an_Area") {
            alert("Please select an area");
            document.getElementById('select_area_001003').focus();
            return;
        }

        setIsWaiting(true);

        const formData = {
            guardian_nic: e.target['guardian-nic'].value,
            guardian_name: e.target['guardian-name'].value,
            mother_name: e.target['mother-name'].value,
            father_name: e.target['father-name'].value,
            phone: e.target['mobile'].value,
            email: e.target['email'].value,
            address: e.target['address'].value,
            area_id: selectedArea
        }

        if(checkNICValidity(formData.guardian_nic)){
            try {
                const res = await instance.post('/midwife/parent', formData);
                props.setTrigger((prevTrigger) => !prevTrigger);
    
                if (res.status === 200) {
                    props.setDisplayParentAdd(false);
                    alert('Parent Data Successfully');
                }
            } catch (err) {
                console.log(err.response.data.message);
                alert(err.response.data.message);
            } finally {
                setIsWaiting(false);
            }
        }else{
            alert("Please enter a valid NIC");
            setIsWaiting(false);
            document.getElementById('guardian-nic').focus();
        }

        
    }

    return (
        <div className='parentAdd-container'>
            <div className="card-container">
                <div className="header">
                    <h4>Adding the Parent</h4>
                </div>
                <form onSubmit={submit} style={{ height: '68vh' }}>
                    <div className="input-section">
                        <div className="input-wrapper">
                            <select className='inputfieds' style={{ height: '35px', width: '91%' }} id='select_area_001003' onChange={handleAreaChange} value={activeArea} disabled={true}>
                                <option style={{ display: 'none' }} value="Select_an_Area">Select an Area</option>
                                {getArea.map(area => (
                                    <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
                                ))}
                            </select>
                            <input type="text" name="guardian-nic" id='guardian-nic' placeholder='Enter the Guardian NIC' className='inputfieds' required />
                            <input type="text" name="guardian-name" id='guardian-name' placeholder='Enter the Guardian Name' className='inputfieds' required />
                            <input type="text" name="mother-name" id='mother-name' placeholder='Enter the Mother Name' className='inputfieds' required />
                            <input type="text" name="father-name" id='father-name' placeholder='Enter the Father Number' className='inputfieds' required />
                            <input type="text" name="mobile" id='mobile' placeholder='Enter the Mobile Number' className='inputfieds' required />
                            <input type="email" name="email" id='email' placeholder='Enter the Email Address' className='inputfieds' required />
                            <input type="text" name="address" id='address' placeholder='Enter the Address' className='inputfieds' required />
                        </div>
                    </div>
                    <div className="submission-btn">
                        {/* <div  type="submit">Submit</div> */}
                        <input className="submit-btn" type="submit" value={isWaiting ? "Waiting..." : "Add"} disabled={isWaiting} />
                        <div className="cancel-btn" onClick={() => props.setDisplayParentAdd(false)}>Cancel</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
