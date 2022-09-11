import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

const Signup = (props) => {
    let [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword: "" });
    let navigate = useNavigate();

    let formSubmit = async (e) => {
        e.preventDefault();
      let  {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name,email,password})
        });

        let json = await response.json();
        console.log(json)
        if (json.success) {
            // save the auth and redirect
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Account created successfully","success")
            navigate("/")
        } else {
            props.showAlert("Invalid credentials","danger")
        }
    }

    let onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onchange} name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onchange} name="email"/>
                    <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onchange} name="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onchange} name="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

Signup.propTypes = {
    showAlert: PropTypes.func
};

export default Signup
