import React from 'react'
import './ParentDataAdd.scss'

export default function ParentDataAdd(props) {
    return (
        <div className='parentAdd-container'>
            <div className="card-container">
                <div className="header">
                    <h4>Adding the Midwife</h4>
                </div>
                <form >
                    <div className="input-section">
                        <div className="input-wrapper">
                            <input type="text" name="parent-id" id='parent-id' placeholder='Enter the Parent ID' className='inputfieds' required />
                            <input type="text" name="parent-name" id='parent-name' placeholder='Enter the Parent Name' className='inputfieds' required />
                            <input type="date" name="mobile" id='mobile' placeholder='Enter the Mobile Number' className='inputfieds' required />
                        </div>
                    </div>
                    <div className="submission-btn">
                        {/* <div  type="submit">Submit</div> */}
                        <input className="submit-btn" type="submit" />
                        <div className="cancel-btn" onClick={props.setDisplayParentAdd(false)}>Cancel</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
