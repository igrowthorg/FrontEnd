import React, { useState, useEffect } from 'react'
import './Vaccine.scss'
import instance from '../../../utility/AxiosInstance';
import { TbVaccine } from "react-icons/tb";

export default function Vaccine() {

    const [vaccine, setVaccine] = useState([]);

    useEffect(() => {
        instance.get("/midwife/child/vaccine")
            .then(res => {
                if (res.data !== "No data found") {
                    setVaccine(res.data)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [])

    return (
        <div className='main-container'>
            <div className='card-fram' >
                {vaccine && vaccine.map((data, key) => (
                    <div className='card' key={key}>
                        <div className='vaccine-card-header'><TbVaccine size={25} /> <h3 style={{ marginLeft: '10px' }}> {data.vaccine_name} </h3></div>
                        <div className='vaccine-card-body'>
                            <div style={{ display: 'flex' }}><p>Month :</p><p style={{ marginLeft: "10px" }}>{data.vaccine_month}</p></div>
                            <div style={{ textAlign: 'justify' }}>{data.note}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
