import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSumit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://yourbook-c17h.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //   "auth-token": process.env.REACT_APP_AUTH_TOKEN
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json);
        if(json.success){
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Login successful", "success")
            navigate("/")

        }else{
            props.showAlert("Invalid credientials","danger")
        }
    }
    return (
        <>
        <div className="mt-3">
            <h2>Login to use iNotebook</h2>
            <form onSubmit={handleSumit}>
                <div className="form-group my-2 mt-10">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group my-2 ">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' autoComplete='off' placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            </div>
        </>
    )
}

export default Login
