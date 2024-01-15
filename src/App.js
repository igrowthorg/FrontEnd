import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Authontication/Login';
import Admin from './Components/Admin/Admin';
import MidwifeComponent from './Components/MidwifeComponent/MidwifeComponent';
import OfficerComponent from './Components/OfficerComponent/OfficerComponent';
import ParentComponent from './Components/ParentComponent/ParentComponent';

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/auth' element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Midwife" element={<MidwifeComponent />} />
        <Route path="/medical-officer" element={<OfficerComponent />} />
        <Route path="/parent" element={<ParentComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
