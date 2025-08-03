// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Bookings from './Bookings';
import CreateBooking from './CreateBooking'
import PrivateRoute from './PrivateRoute';
import Register from './Register';

function App() {
  // console.log("Rendering App...");
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/bookings" element={<PrivateRoute element={<Bookings/>} />} />
          <Route path="/create-booking" element={<PrivateRoute element={<CreateBooking/>} />} />
          <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
