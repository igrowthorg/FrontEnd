import React, { useState } from 'react';
import './CalculateBMI.scss';

const CalculateBMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBmi = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
    } else {
      setBmi(null);
    }
  };

  return (
    <div className="bmi-calculator">
      <h1>BMI Calculator</h1>
      <label>
        Weight (kg):
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </label>
      <label>
        Height (cm):
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </label>
      <button onClick={calculateBmi}>Calculate BMI</button>
      {bmi !== null && <p>The BMI is: {bmi}</p>}
    </div>
  );
};

export default CalculateBMI;
