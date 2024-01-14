import React, { useState, useEffect } from 'react'
import './MonthlyMeasurement.scss'
import { CiSearch } from "react-icons/ci";
import instance from '../../../utility/AxiosInstance'

export default function MonthlyMeasurement() {

    const [inputData, setInputData] = useState({
        child_id: null,
        child_name: null,
        month: null,
        weight: null,
        height: null,
        head_cricumference: null,
    })

    const [lastMonthHeight, setLastMonthHeight] = useState(null);
    const[searchData, setSearchData] = useState("");
    const [allData, setAllData] = useState(null);
    const [bogTableTrigger, setBogTableTrigger] = useState(false);


    const submit = async (e) => {
        e.preventDefault();
    
        const data = {
            weight: inputData.weight, 
            height: inputData.height, 
            month: inputData.month, 
            head_cricumference: inputData.head_cricumference
        }

        if(!data.weight === "" || !data.height === "" || !data.head_cricumference === "" || !data.month === "" || !inputData.child_id ){
            alert("Please fill all the fields")
            return
        }

        if(parseFloat(data.height) <= parseFloat(lastMonthHeight)) {
            alert(`Height can't be less than last month height(${lastMonthHeight} cm)`)
            document.getElementById('c_height').focus();
            return
        }

        try{
            const res = await instance.post(`/midwife/child/growth_detail/${inputData.child_id}`, data)

            if(res.data.message === "Child growth detail added"){
                setInputData({
                    child_id: "",
                    child_name: "",
                    month: "",
                    weight: "",
                    height: "",
                    head_cricumference: "",
                })
                setBogTableTrigger(!bogTableTrigger)
                alert("Child growth detail added")
            }

        }
        catch(err){
            console.log(err)
        }
    }

    const pressSearch = async() => {
        try{
            const res = await instance.get(`/midwife/child/last-growth_detail/${searchData}`)

            if(res.data.message === "Not privileges"){
                setLastMonthHeight(null)
                alert("Not privileges")
                return
            }
            
            if(res.data.message === "Child growth detail not found"){
                setLastMonthHeight(null)
                setInputData({
                    child_id: res.data.child.child_id,
                    child_name: res.data.child.child_name,
                    month: 1,
                    weight: "",
                    height: "",
                    head_cricumference: "",
                })
            }
            else{
                setLastMonthHeight(res.data.height)
                setInputData({
                    child_id: res.data.child_id,
                    child_name: res.data.child_name,
                    month: parseInt(res.data.month) + 1,
                    weight: "",
                    height: "",
                    head_cricumference: "",
                })
            }
            
        }
        catch(err){
            console.log(err)
            alert("Children ID not found")
        }
    }

    

    useEffect(() => {
        instance.get("/midwife/child/sd_measurements")
            .then(res => {
                if (res.data !== "No data found") {
                    setAllData(res.data)
                }
                else console.log("No data found");
            }).catch(err => console.log(err))

    }, [bogTableTrigger])


    if (allData !== null) return (
        <div className='measurement-container'>
            <div className='measurement-top'>
                <div className='searchbar'>
                    <input type="number" placeholder="Search.." name="search" className='search' onChange={e => setSearchData(e.target.value)} />
                    <button type="submit"><CiSearch size={"25px"} color='purple' onClick={pressSearch} /></button>
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

                        <form onSubmit={submit}>
                            <div className='form-group'>
                                <label>Child ID:</label>
                                <input type='text' disabled={true} value={inputData.child_id} name='childId' id='childId' required />
                            </div>
                            <div className='form-group'>
                                <label>Child Name:</label>
                                <input type='text' disabled={true} name='childName' value={inputData.child_name} id='childName' required />
                            </div>
                            <div className='form-group'>
                                <label>Month:</label>
                                <input type='text' disabled={true} name='month' value={inputData.month} id='month' required />
                            </div>
                            <div className='form-group'>
                                <label>Weight:</label>
                                <input type='number' min={1} value={inputData.weight} disabled={inputData.child_id === "" || inputData.child_id === null} onChange={(e) => setInputData({...inputData, weight: e.target.value})} name='weight' id='weight' required />
                            </div>
                            <div className='form-group'>
                                <label>Height:</label>
                                <input type='number' min={1} name='height' value={inputData.height} disabled={inputData.child_id === "" || inputData.child_id === null} onChange={(e) => setInputData({...inputData, height: e.target.value})} id='c_height' required />
                            </div>
                            <div className='form-group'>
                                <label>Head Circumference:</label>
                                <input type='number' min={1} value={inputData.head_cricumference} disabled={inputData.child_id === "" || inputData.child_id === null} onChange={(e) => setInputData({...inputData, head_cricumference: e.target.value})} name='headCircumference' id='headCircumference' required />
                            </div>
                            <input className="button" title={inputData.child_id === "" || inputData.child_id === null ? 'Please insert child id' : 'Add Data'} type="submit" style={inputData.child_id === "" || inputData.child_id === null ? {background: 'gray', cursor: 'not-allowed'}: null} disabled={inputData.child_id === "" || inputData.child_id === null} />
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
