import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Authontication/Login';
import Admin from './Components/Admin/Admin';
import MidwifeComponent from './Components/MidwifeComponent/MidwifeComponent';
import ParentComponent from './Components/ParentComponent/ParentComponent';
import Bmi from './Components/ParentComponent/CalculateBMI/CalculateBMI.jsx';

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/bmi' element={<Bmi/>}/>
        <Route path='/' element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Midwife" element={<MidwifeComponent />} />
        <Route path="/Parent" element={<ParentComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
