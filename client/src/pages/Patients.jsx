import { useState, useEffect } from "react";
import Patient from "../components/Patient";
import Navbar from "../components/Navbar";
export default function Patients(){
    const [records,setRecords] = useState([])
    useEffect(() => {
        async function getRecords() {
          const response = await fetch(`http://localhost:5050/patients/`);
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
          const records = await response.json();
          setRecords(records);
        }
        getRecords();
        return;
    }, [records.length]);
    async function deleteRecord(id) {
        await fetch(`http://localhost:5050/patients/${id}`, {
          method: "DELETE",
        });
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }
    
    function recordList() {
        return records.map((record) => {
          return (
            <Patient name={record.firstName + " " + record.lastName} record={record} deleteRecord={ ()=> deleteRecord(record._id) } key={record._id}/>
          );
        });
    }
    return(
      <div>
        <Navbar/>
        <div className="container">
 
            <h1 className="text-center m-3">Patients</h1>
            
            {recordList()}
        </div>
      </div>
      
    );
}