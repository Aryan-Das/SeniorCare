import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";


export default function SelectPatient(){
    const [patients,setPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the Express server
        axios.get('http://localhost:5050/patients',{withCredentials:true})
          .then(response => {
            
            setPatients(response.data)
            console.log(response.data[0]._id)
            setSelectedPatientId(response.data[0]._id);
            })
          .catch(error => {
            console.error(error);
            let status =  error.request.status;
            if (status==401){
                navigate('/signin')
            }
            });
        
        axios.get('http://localhost:5050/check-cookies', { withCredentials: true })
        .then(response => {
          console.log(response.data);
            // Should return the cookie data
        })
        .catch(function (error) {
         //ß console.log(error.response.data);
        });

    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        // '../patient/'
        navigate('/patient/' + selectedPatientId);
    }
    return(
        <div>
            <Navbar/>
            <div className="container w-50 jusitfy-content-center">
               
                {/* <div className="col text-center">
                    <h1>Choose Patient:</h1>
                </div>
                <div className="col text-center">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div> */}
                <div className="text-center justify-content-center ">
                    <form onSubmit={handleSubmit} className="row g-3  align-items-center jusitfy-content-center m-3 ">
                        <div className="col-6 text-end">
                            <label  className="col-form-label fs-4">Select a Patient:</label>
                        </div>
                        <div className="col-6">
                            <select onChange={(e) => setSelectedPatientId(e.target.value)} className="form-select fs-5" aria-label="Default select example">
                                
                                {patients.map(patient => (
                                    <option key={patient._id} value={patient._id}>{patient.firstName + " " + patient.lastName}</option>
                                ))} 
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                    <Link to ={'/add-patient/'} relative="route" className="box btn btn-success m-1">Register a New Patient</Link>
                </div>
                
               
              
            </div>
        </div>
    );
}