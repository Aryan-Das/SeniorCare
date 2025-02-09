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
         console.log(error.response.data);
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
            <div className="container  vh-100 d-flex justify-content-center align-items-center" >
               
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
                <div className="row w-100 " style={{height:"700px"}}>
                    <div className="col-6 p-0 position-relative overflow-hidden d-none d-lg-block d-md-block d-xl-block ">
                        <img src="../src/assets/residents.jpg" className="position-absolute object-fit-cover" style={{height:"700px"}}></img>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xl-6 col-sm-12 col-xs-12 p-0">
                        <div className="d-flex h-100 justify-content-center align-items-center" style={{backgroundColor: "#a8ffca" }}>
                            <div>
                                <h1 className='text-dark fs-5'>Select Resident</h1>
                                <form onSubmit={handleSubmit} >
                        
                                    
                                
                            
                                        <select onChange={(e) => setSelectedPatientId(e.target.value)} className="form-select fs-5" aria-label="Default select example">
                                            
                                            {patients.map(patient => (
                                                <option key={patient._id} value={patient._id}>{patient.firstName + " " + patient.lastName}</option>
                                            ))} 
                                        </select>
                        
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <Link to ={'/add-patient/'} relative="route" className="box btn btn-success m-3">Register a New Patient</Link>
                                </form>

                                
                                
                            </div>
                        </div>
                    </div>
                   
                </div>
               
                
               
              
            </div>
        </div>
    );
}