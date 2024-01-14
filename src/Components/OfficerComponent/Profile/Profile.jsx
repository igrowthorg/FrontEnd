import React, { useEffect, useState, useRef } from 'react'
import './Profile.scss';
import instance from '../../../utility/AxiosInstance';
import { useNavigate } from 'react-router-dom'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Profile() {

    const navigation = useNavigate()

    const [authenticated, setAuthenticated] = useState(false)

    const [trigger, setTrigger] = useState(false);

    const [summery, setSummery] = useState()

    const [profile, setProfile] = useState()

    // -------------------------------------

    const [name, setName] = useState("")

    const [phone, setPhone] = useState("")

    const [oldPass, setOldPass] = useState("")

    const [newPass, setNewPass] = useState("")

    const [confirmPass, setConfirmPass] = useState("")

    const handleOfficerName = (e) => {
        setName(e.target.value)
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleOldPassword = (e) => {
        setOldPass(e.target.value);
    };

    const handleNewPassword = (e) => {
        setNewPass(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPass(e.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (newPass !== confirmPass) {
            alert("Password don't match");
            return;
        }


        const formData = {
            name: name,
            phone: phone,
            old_password: oldPass,
            new_password: newPass
        }

        try {
            // Make PATCH request to update category
            await instance.put(`/officer/profile`, formData);
            alert("Update Successful")
            // Close the update popup
            setTrigger(!trigger);
            setOldPass("")
            setNewPass("")
            setConfirmPass("")

        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                if (error.response.data.message) {
                    alert(error.response.data.message)
                }
            }
        }
    };


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await instance.get('/officer/check-auth')
                console.log(res.data)
                setAuthenticated(true)
            }
            catch (err) {
                setAuthenticated(false)
                console.log({ error: err })
                navigation('/auth')
            }
        }
        checkAuth()
    }, [trigger])

    useEffect(() => {
        instance.get("/officer/profile")
            .then(res => {
                if (res.data !== "No data found") {
                    setProfile(res.data)
                    setName(res.data.officer_name)
                    setPhone(res.data.phone)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        instance.get("/officer/report-summary")
            .then(res => {
                if (res.data !== "No data found") {
                    setSummery(res.data)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [])

    const pdfRef = useRef();
    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfwidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfwidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfwidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('summery.pdf');
        });
    };

    if (authenticated && profile && summery) return (
        <div className='profile-container'>
            <div className='profile-top'><span>Medical Officer Profile</span></div>
            <div className='profile-bottom'>
                <div className='buttom-left'>
                    <div className='left-header'>
                        <div className='inputField-cover'><label>Officer ID : </label><input type="text" placeholder='Officer ID' disabled={true} value={profile.officer_id} /></div>
                        <div className='inputField-cover'><label>Service ID : </label><input type="text" placeholder='Service ID' disabled={true} value={profile.service_id} /></div>
                        <div className='inputField-cover'><label>Area : </label><input className='area' type="text" placeholder='Area' disabled={true} value={profile.area_name} /></div>
                    </div>
                    <div className='left-body'>
                        <form onSubmit={submit} id='officerUpdate'>
                            <div className='inputField-cover'><label>Name :</label><input onChange={handleOfficerName} value={name} type='text' id='officer-name' name='officer-name' required={true} /></div>

                            <div className='inputField-cover'><label>NIC :</label><input value={profile.nic} type='text' placeholder='NIC' disabled={true} required={true} /></div>

                            <div className='inputField-cover'><label>Email :</label><input value={profile.email} type='text' placeholder='Email' disabled={true} required={true} /></div>

                            <div className='inputField-cover'><label>Phone number :</label><input onChange={handlePhone} value={phone} type='text' id='phone' name='phone' required={true} /></div>

                            {/* <div className='inputField-cover'><label>Address :</label><input type='text' placeholder='address' /></div> */}

                            <div className='inputField-cover'><label>Current Password :</label><input value={oldPass} onChange={handleOldPassword} type='text' placeholder='Current Password' id='current-password' name='current-password' /></div>

                            <div className='inputField-cover'><label>New Password :</label><input value={newPass} onChange={handleNewPassword} type='password' placeholder='New Password' id='new-password' name='new-password' /></div>

                            <div className='inputField-cover'><label>Conform Password :</label><input value={confirmPass} onChange={handleConfirmPassword} type='password' placeholder='Confirm Password' id='confirm-password' name='confirm-password' /></div>

                            <div className='profile-update-btn'>
                                <input type="submit" value={"Update"} />
                            </div>
                        </form>
                    </div>
                </div>
                <div className='butom-right'>
                    <div className='summery-card' ref={pdfRef}>
                        <div className='summery-header'>
                            <span>Summery Report</span>
                        </div>
                        <div className='summery-body'>
                            <div className='summery-body-cover'><span className='span-title' style={{ paddingRight: '50px' }}>Total Parent </span><span className='span-body'>:{summery.total_parent ?? 0}</span></div>
                            <div className='summery-body-cover'><span className='span-title' style={{ paddingRight: '50px' }}>Total Child </span><span className='span-body'>:{summery.child_in_60_month ?? 0}</span></div>
                            <div className='summery-body-cover'><span className='span-title' style={{ paddingRight: '65px' }}>Total Measurement's </span><span></span></div>
                            <div className='summery-body-cover'><span className='span-title' style={{ paddingLeft: '50px' }}>Over Weight </span><span className='span-body'>:{summery.wight_group.over_weight ?? 0}</span></div>
                            <div className='summery-body-cover'><span className='span-title' style={{ paddingLeft: '50px' }}>Proper Weight </span><span className='span-body'>:{summery.wight_group.proper_weight ?? 0}</span></div>
                            <div className='summery-body-cover'><span className='span-title' style={{ paddingLeft: '50px' }}>Risk For Under Weight </span><span className='span-body'>:{summery.wight_group.risk_for_under_weight ?? 0}</span></div>
                            <div className='summery-body-cover'><span className='span-title' style={{ paddingLeft: '50px' }}>Medium Under Weight </span><span className='span-body'>:{summery.wight_group.medium_under_weight ?? 0}</span></div>
                            <div className='summery-body-cover'><span className='span-title' style={{ paddingLeft: '50px' }}>Sever Under Weight </span><span className='span-body'>:{summery.wight_group.severe_under_weight ?? 0}</span></div>
                            <div>
                                <Chart groups={summery.wight_group} />
                            </div>
                        </div>
                    </div>
                    <div className='download-button'><input type="submit" onClick={downloadPDF} value={"Download"} /></div>
                </div>
            </div>
        </div>
    )
}

const Chart2 = (props) => {
    const groups = props.groups;
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: groups.over_weight, label: 'Over Weight' },
                        { id: 1, value: groups.proper_weight, label: 'Proper Weight' },
                        { id: 2, value: groups.risk_for_under_weight, label: 'Risk for Under Weight' },
                        { id: 3, value: groups.medium_under_weight, label: 'Medium Under Weight' },
                        { id: 4, value: groups.severe_under_weight, label: 'Severe Under Weight' },
                    ],
                },
            ]}
            width={400}
            height={200}
        />
    );
}




const Chart = (props) => {
    const groups = props.groups;
    let data = [
        { value: groups.over_weight, label: 'Over Weight' },
        { value: groups.proper_weight, label: 'Proper Weight' },
        { value: groups.risk_for_under_weight, label: 'Risk for Under Weight' },
        { value: groups.medium_under_weight, label: 'Medium Under Weight' },
        { value: groups.severe_under_weight, label: 'Severe Under Weight' }
    ]

    const size = {
        width: 350,
        height: 350,
    };

    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 45,
                    data,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                },
            }}
            {...size}
        />
    );
}