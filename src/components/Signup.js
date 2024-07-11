import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'


const Signup = (props) => {
    let [loading, setloading] = useState(false)

  const [credentials, setcredentials] = useState({name:"", email: "", password: "",cpasswod: "" })
    let navigate = useNavigate()

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSumit = async (e) => {
      const {name,email,password} = credentials;
        e.preventDefault();
        setloading(true);

        const response = await fetch(`https://yourbook-c17h.onrender.com/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email,password })
        });
        const json = await response.json()
        // console.log(json);
        if(json.success){
            localStorage.setItem("token", json.authtoken);
            setloading(false)
            navigate("/")
            props.showAlert("Account Created Successfully", "success")
        }else{
            props.showAlert("Input fields required", "danger")
            setloading(false)
        }
    }
  return (
    <div className='container mt-2'>
      <h2>Sign Up to use YourBook</h2>
      <form onSubmit={handleSumit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name="name" placeholder="Enter name"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" id="password" onChange={onChange} minLength={5} required autoComplete='off' placeholder="Password"/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={onChange} minLength={5} required autoComplete='off' placeholder="Confirm Password"/>
        </div>
         {
          (loading)? <Spinner/>:
        <button type="submit" className="btn btn-primary">Sign Up</button>
        }
      </form>
    </div>
  )
}

export default Signup
