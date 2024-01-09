import React, { useState, useEffect } from 'react'
import './MonthlyMeasurement.scss'
import { CiSearch } from "react-icons/ci";
import instance from '../../../utility/AxiosInstance'

export default function MonthlyMeasurement() {

    const data = [
        { id: '1', Month: "01", minus1SD: "10", plus1SD: "02", minus2SD: '04', plus2SD: '01' },
        { id: '2', Month: "02", minus1SD: "12", plus1SD: "01", minus2SD: '04', plus2SD: '03' },
        { id: '3', Month: "02", minus1SD: "12", plus1SD: "01", minus2SD: '04', plus2SD: '03' },
        { id: '4', Month: "02", minus1SD: "12", plus1SD: "01", minus2SD: '04', plus2SD: '03' },
    ]

    const [allData, setAllData] = useState(null);

    useEffect(() => {
        instance.get("/midwife/child/sd_measurements")
            .then(res => {
                if (res.data !== "No data found") {
                    setAllData(res.data)
                    console.log(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))
    }, [])


    if (allData !== null) return (
        <div className='measurement-container'>
            <div className='measurement-top'>
                <div className='searchbar'>
                    <input type="text" placeholder="Search.." name="search" className='search' />
                    <button type="submit"><CiSearch size={"25px"} color='purple' /></button>
                </div>
            </div>
            <div className='measurement-bottom'>
                <div className='measurement-left'>
                    <h2>Measurement Table</h2>
                    <table >
                        <thead>
                            <tr>
                                <td>Age(Month)</td>
                                <td>Over Weight</td>
                                <td>Proper Weight</td>
                                <td>Risk for Under Weight</td>
                                <td>Medium Under Weight</td>
                                <td>Severe Under Weight</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(allData).map(key => {
                                    let innerObject = allData[key];
                                    return (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{innerObject.over_weight}</td>
                                            <td>{innerObject.proper_weight}</td>
                                            <td>{innerObject.risk_of_under_weight}</td>
                                            <td>{innerObject.minimum_under_weight}</td>
                                            <td>{innerObject.severe_under_weight}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className='measurement-right'>
                    <div className='form-container'>
                        <h2>Child Measurement Form</h2>

                        <form >
                            <div className='form-group'>
                                <label>Child ID:</label>
                                <input
                                    type='text'
                                    name='childId'
                                    // value={childId}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Child Name:</label>
                                <input
                                    type='text'
                                    name='childName'
                                    // value={childName}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Month:</label>
                                <input
                                    type='text'
                                    name='month'
                                    // value={month}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Weight:</label>
                                <input
                                    type='text'
                                    name='weight'
                                    // value={weight}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Height:</label>
                                <input
                                    type='text'
                                    name='height'
                                    // value={height}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Head Circumference:</label>
                                <input
                                    type='text'
                                    name='headCircumference'
                                    // value={headCircumference}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                            <input className="button" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
