// // App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './components/Home';
import About from './components/About';
import Foods from './components/Foods';
import Orders from './components/Orders';
import SignUp from './components/SignUp';
import Login from './components/Login';
import RestaurantListing from './components/RestaurantListing';
import ViewProfile from './components/ViewProfile';
import './App.css';

const App = () => {
  const [orders, setOrders] = useState([]); // State to store the list of food items added to orders
  const [users, setUsers] = useState(null);

  return (
    <>
      <Router>
        {/* Static background for all pages */}
        <div className="app-background"></div>

        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Food Delivery App
              </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/about">About</Button>
              <Button color="inherit" component={Link} to="/restaurant">Restaurant</Button>
              {/* <Button color="inherit" component={Link} to="/foods">Menu</Button> */}
              
              <Button color="inherit" component={Link} to="/viewprofile">Profile</Button>
              <Button color="inherit" component={Link} to="/orders">My Orders</Button>

              {users ? (
                <Typography variant="body1" color="inherit">
                  Welcome, {users.username}
                </Typography>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        <div className="container-wrapper">
          <Container className="app-content">
            {/* Content of each page is wrapped inside the content div */}
            <Routes>
              <Route path="/foods" element={<Foods orders={orders} setOrders={setOrders} />} />
              <Route path="/orders" element={<Orders orders={orders} />} />
              <Route path='/restaurant' element={<RestaurantListing />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path='/viewprofile' element={<ViewProfile/>}></Route>
              <Route path="/login" element={<Login setUser={setUsers} />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </>
  );
}

export default App;

// import React, { useState } from 'react';

// const App = () =>
// {
//   const [formData, setFormData] = useState(
//     {
//       Name : '',
//       Email : '',
//       message : ''
//     }
//   )
//   const handleChange = (e) =>
//   {
//     const{name, value} = e.target;
//     setFormData({
//       ...formData, [name] : value
//     })
//   }
//   const handleSubmit = (e) =>
//   {
//     e.preventDefault();
//     console.log(formData);
//   }
//   return (
//     <>
//     <h1>Form</h1>
//     <form method='POST' onSubmit={handleSubmit}>
//       <label htmlFor='Name'>Name</label>
//       <input type='text' name='Name' id='Name' onChange={handleChange}></input>
//       <label htmlFor='Email'>Email</label>
//       <input type='email' name='Email' id='Email' onChange={handleChange}></input>
//       <label htmlFor='message' >Message</label>
//       <input type='text' name='message' onChange={handleChange}></input>
//       <button type='submit' onClick={handleSubmit}>Submit</button>
//     </form></>
//   )
// }
// export default App;