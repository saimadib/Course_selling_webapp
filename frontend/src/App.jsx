import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Landing/LoginUser';
import Landing from "./Landing/Landing";
import CreateCourse from './AdminDashboard/CreateCourse';
import Register from './Landing/Register';
import Dashboard from './AdminDashboard/Dashboard';
import EditCourse from './AdminDashboard/EditCourse';
import AdminLogin  from './Landing/LoginAdmin';
import UserDashboard from './UserDashboard/UserDashboard';
import {RecoilRoot} from 'recoil';
// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <RecoilRoot>
        <Router>
            <Routes>     
                <Route path="/" element={<Landing />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/userdashboard" element={<UserDashboard/>} />
                <Route path="/register" element={<Register />} />

                <Route path="/addcourse" element={<CreateCourse />} />
                <Route path="/editCourse" element={<EditCourse/>} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/Admindashboard" element={<Dashboard/>} />
            </Routes>
        </Router>
        </RecoilRoot>
    );
}

export default App;