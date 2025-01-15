import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
export default function PatientDetail(){
    const { id } = useParams();
    const [record, setRecord] = useState({});
    const navigate = useNavigate()
    useEffect(()=>{
    
        // async function getRecord(){
        //     const response = await fetch(`http://localhost:5050/patients/${id}`,{credentials:'include'});
        //     if (!response.ok) {
        //         const message = `An error occurred: ${response.statusText}`;
        //         console.error(message);
        //         return;
        //     }
        //     const record = await response.json();
        //     console.log(record);
        //     setRecord(record);
            
        // }
        // getRecord();
        axios.get(`http://localhost:5050/patients/${id}`,{withCredentials:true})
        .then(response => {
          console.log(response.data);
          setRecord(response.data)
          console.log(response.data[0]._id)
        //  setSelectedPatientId(response.data[0]._id);
          })
        .catch(error => {
          console.error(error);
          let status =  error.request.status;
          if (status==404){
              navigate('/select-patient')
          }
          });
        return;
    },[])
    const DOB = () =>{
        const c = new Date(record.dateOfBirth);
        return c.toLocaleDateString("en-US");
    }


    return(
        <div>
            <Navbar/> 
            <div className="container m-3">
                <h3>Patient: {record.firstName + " " + record.lastName}</h3>
                <h3>Date of Birth: {DOB()}</h3>
                <h3>Email: {record.email}</h3>
                <Link to ={'./medications'} relative="route" className="box btn btn-primary">View Medications</Link>

                
                <div className="row">
                    <div className="col">
                    
                    </div>   
                
            
                
                </div>
            
            </div>
            
        </div>
        
    );
}