import React, { useEffect, useState } from 'react';
import './SuperAdminAdd.scss'
import instance from '../../../../utility/AxiosInstance';
export default function MidwifeAdd(props) {

    const [getArea, setGetArea] = useState([]);


    const [isWaiting, setIsWaiting] = useState(false);
    const [selectedArea, setSelectedArea] = useState("Select_an_Area");

    useEffect(() => {
        instance.get("/admin/district")
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
            username: e.target['user-name'].value,
            email: e.target['email'].value,
            district_id: selectedArea
        }

        try {
            const res = await instance.post('/admin/admin', formData);
            props.setTrigger((prevTrigger) => !prevTrigger);

            if (res.status === 200) {
                props.setAddAdmin(false);
                alert('Sub Admin Added Successfully');
            }
        } catch (err) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        } finally {
            setIsWaiting(false);
        }
    }


    return (
        <div className='superAdminAdd-container'>
            <div className="card-container" style={{ height: '45vh' }}>
                <div className="header">
                    <h4>Adding the Sub Admins</h4>
                </div>
                <form onSubmit={submit} style={{ height: '35vh' }}>
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
                                    <option key={area.district_id} value={area.district_id}>{area.district_name}</option>
                                ))}
                            </select>

                            <input type="text" name="user-name" id='user-name' placeholder='Enter the User Name' className='inputfieds' required />
                            <input type="email" name="email" id='email' placeholder='Enter the Email' className='inputfieds' required />
                        </div>
                    </div>
                    <div className="submission-btn">
                        {/* <div  type="submit">Submit</div> */}
                        <input className="submit-btn" type="submit" value={isWaiting ? "Waiting..." : "Add"} disabled={isWaiting} />
                        <div className="cancel-btn" onClick={() => props.setAddAdmin(false)}>Cancel</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
