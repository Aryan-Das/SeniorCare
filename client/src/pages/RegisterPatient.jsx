import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
const instance = axios.create({
    withCredentials: true
  })
export default function RegisterPatient(){
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [DOB,setDOB] = useState();
    const [email,setEmail] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:5050/patients',{withCredentials:true})
        .catch(error => {
          console.error(error);
          let status =  error.request.status;
          if (status==401){
              navigate('/signin')
          }
        });
      
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!firstName || !lastName || !email || !DOB){
            alert("All Fields are Required");
            return;
        }
        console.log("name: " + firstName + " " + lastName);
        instance.post('http://localhost:5050/patients/',{
            'firstName' : firstName,
            'lastName' : lastName,
            'dateOfBirth' : DOB,
            'email' : email,
        }) .then((response) => {
            console.log(response);
           
          });
          navigate('/select-patient');

    }

    return(
        <div>
            <Navbar/>
            <div className="container">
                <h1 className="text-center m-3">Register Patient</h1>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input  type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control"  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control"  />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input type="string" value={DOB} onChange={(e) => setDOB(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control" />
                    </div>
                   
                  
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        

    );
}