import React ,{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import { Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Cookies from "js-cookie"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const HeaderEl = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const submitDetails=async()=>{
    const finalUserDetails={name:username,
      password:password}
    const option={
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(finalUserDetails)
    }
    try {
      const response = await fetch('http://localhost:3000/login', option);
      if (response.ok) {
        // User login successful
        const data=await response.json();
        Cookies.set("AccessToken",data.token,{expires:1})
        console.log(data);
        setErrorMessage(''); // Clear error message
        setShowSuccessAlert(true); // Show success alert
        setOpen(false);
        setTimeout(() => {
          setShowSuccessAlert(false); // Hide success alert after 6 seconds
        }, 6000);
      } else {
        // User login failed
        setErrorMessage('*Invalid UserName or Password'); // Show error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('*An error occurred. Please try again.'); // Handle network or server errors
    }
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <span className="navbar-brand text-warning"style={{marginLeft:"20px",fontWeight:"500"}}>TodoApp</span>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div
          className="navbar-nav w-100 justify-content-center justify-content-lg-end text-center" // Updated alignment classes
        style={{marginRight:"20px"}}>
         <Link to="/" className='link-styling'>
         <span
            className="nav-item nav-link text-white"
            style={{ fontSize: '20px', fontWeight: 450 }}
          >
            Home
          </span>
         </Link> 
         <Link to="/add" className='link-styling'>
         <span
            className="nav-item nav-link text-white"
            style={{ fontSize: '20px', fontWeight: 450 }}
          >
            AddTasks
          </span>
         </Link> 
         <Link to="/edit" className='link-styling'>
         <span
            className="nav-item nav-link text-white"
            style={{ fontSize: '20px', fontWeight: 450 }}
          >
            Update
          </span>
         </Link> 
          <div>
          <button className="button-styling" type="button" onClick={handleOpen}>Login</button>
          <div>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <h1 className="login-name-styling">Login</h1>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="UserName"
              variant="standard"
              value={username} // Bind to state
              onChange={(e) => setUsername(e.target.value)} // Update state on change
            />
          </Box>
          <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            style={{ width: '100%', marginTop: '10px' }}
          >
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password} // Bind to state
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errorMessage && (
            <p className="login-error-message">{errorMessage}</p>)}
          <div className="text-center">
            <button className="btn btn-primary mt-2" onClick={submitDetails}>
              Login
            </button>
          </div>
        </Box>
      </Modal>

        </div>
          </div>
        </div>
      </div>
    </nav>
    {showSuccessAlert===true?<div className='d-flex flex-row justify-content-center Shadow'>
    <Stack sx={{ width: '20%',marginTop:"30px"}}  spacing={2}>
     <Alert severity="success" className='text-center' style={{ backgroundColor:"rgb(80, 224, 166)"}}>User Logined Successfully.</Alert>
    </Stack>
    </div>:''}
  </>
  );
};

export default HeaderEl;
