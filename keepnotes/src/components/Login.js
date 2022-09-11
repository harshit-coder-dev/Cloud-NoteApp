import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

const Login = (props) => {
    

    let [credentials,setCredentials]=useState({email:"",password:""});
    let navigate=useNavigate();

    let formSubmit = async (e) => {
        e.preventDefault();

        let response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password })
        });

        let json = await response.json();
        console.log(json)
        if(json.success){
            // save the auth and redirect
            localStorage.setItem("token",json.authtoken);
            props.showAlert("Logged in successfully","success")
            navigate("/")
        }else{
            props.showAlert("Invalid credentials","danger")
        }
    }

    let onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onchange}/>
                    <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    showAlert: PropTypes.func
};

export default Login
