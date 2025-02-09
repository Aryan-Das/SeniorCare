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
            <div className="container">
                <div className="row my-3">
                    <h1>Resident: {record.firstName + " " + record.lastName}</h1>

                </div>
            </div>
            <div className="container  h-100 d-flex justify-content-center align-items-center my-0 " >
              
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
                   
                   <div className="col-lg-6 col-md-6 col-xl-6 col-sm-12 col-xs-12 p-0">
                       <div className="d-flex h-100 justify-content-center align-items-center" style={{backgroundColor: "#a8ffca" }}>
                           <div>
                               
                                <h3>Date of Birth: {DOB()}</h3>
                                <h3>Email: {record.email}</h3>
                                <Link to ={'./medications'} relative="route" className="box btn btn-primary">View Medications</Link>

                                
                                            

                               
                               
                           </div>
                       </div>
                   </div>
                   <div className="col-6 p-0 position-relative overflow-hidden d-none d-lg-block d-md-block d-xl-block ">
                       <img src="../src/assets/single-resident.jpeg" className="position-absolute object-fit-cover" style={{height:"700px"}}></img>
                   </div>
                  
               </div>
              
               
              
             
           </div>
            
            
        </div>
        
    );
}