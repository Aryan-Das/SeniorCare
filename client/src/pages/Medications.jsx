import { Link, useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { DataGrid ,useGridApiRef} from '@mui/x-data-grid';
import axios from "axios";
const instance = axios.create({
    withCredentials: true
  })
export default function Medications(){
    const { id } = useParams();
    const [meds, setMeds] = useState();
    const [activateChecker, setActivateChecker] = useState();
    const [addMedName,setAddMedName] = useState();
    const [rows, setRows] = useState();
    const apiRef = useGridApiRef();
    const navigate = useNavigate();



    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        let tempMeds = meds;
        tempMeds.map((med)=>{
            if(med.medName == updatedRow.medName){
                med.dateStarted = updatedRow.dateStarted;
                med.dateFilled = updatedRow.dateFilled;
                med.strengthAndQuantity = updatedRow.strengthAndQuantity;
                med.instructions = updatedRow.instructions;
                med.expirationDate=updatedRow.expirationDate;
                med.prescribingPhysician = updatedRow.prescribingPhysician;
                med.noRefills = updatedRow.noRefills;
                med.pharmacyName = updatedRow.pharmacyName;
            }
        })
       
        updateMeds();
        // apiRef.current.stopRowEditMode({
        //     id: updatedRow.id,
        //     ignoreModifications: true, // will also discard the changes made
        // });
       // getMeds();
       //getMeds().then((_rows)=>setRows(_rows));
        return updatedRow;
    };
    
  
    async function getMeds(){
        const response = await fetch(`http://localhost:5050/patients/${id}` ,{credentials:'include'});
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
        }
        const record = await response.json();
       // console.log(record);
        let a= record.medications;
        await setMeds(a);
        // console.log(a);
        // console.log(meds);
        var tempRows = [];
        var brug = 1;
        a.map((med) => {
            brug++;
            tempRows.push({
                id : brug,
                medName: med.medName,
                strengthAndQuantity: med.strengthAndQuantity,
                instructions:med.instructions,
                expirationDate: med.expirationDate,
                dateFilled: med.dateFilled,
                dateStarted: med.dateStarted,
                prescribingPhysician: med.prescribingPhysician,
                prescriptionNumber: med.prescriptionNumber,
                noRefills: med.noRefills,
                pharmacyName: med.pharmacyName,

            })
        })
        
   
       return tempRows;

    
    }
    useEffect(()=>{
        axios.get('http://localhost:5050/patients',{withCredentials:true})
        .catch(error => {
          console.error(error);
          let status =  error.request.status;
          if (status==401){
              navigate('/signin')
          }
        });
      
        getMeds().then((_rows)=>setRows(_rows));
        setActivateChecker(true);
        console.log("useEffect call");
        return;
    },[]);
    // useEffect(()=>{
       
    //     getMeds();
        
        
    // },[meds])
    const columns = [
        { field: 'medName', headerName: 'Medication Name', flex:0.2, editable: true },
        { field: 'strengthAndQuantity', headerName: 'Strength/Quantity', flex:0.1, editable:true },
        { field: 'instructions', headerName: 'Instructions',flex:0.1, editable:true  },
        { field: 'expirationDate', headerName: 'Expiration Date',flex:0.1, editable:true },
        { field: 'dateFilled', headerName: 'Date Filled',flex:0.1, editable:true },
        { field: 'dateStarted', headerName: 'Date Started', flex:0.1, editable:true },
        { field: 'prescribingPhysician', headerName: 'Prescribing Physician',flex:0.1, editable:true  },
        { field: 'prescriptionNumber', headerName: 'Prescription Number', flex:0.1, editable:true  },
        { field: 'noRefills', headerName: 'No. of Refills', flex:0.1, editable:true },
        { field: 'pharmacyName', headerName: 'Name of Pharmacy', flex:0.1, editable:true },
    ];
  
    const updateMeds = async() => {
        await instance.put(`http://localhost:5050/patients/${id}`,{
            medications : meds,

        }).then((response) => {
            // console.log(response);  
        });
        await getMeds().then((_rows)=>{setRows(_rows); console.log(_rows)});
       // console.log(rows);
       // getMeds().then((_rows)=>setRows(_rows));
    }

    const addMed = async() =>{
        //console.log(addMedName);
        var tempMeds = meds;
        tempMeds.push({
            'medName' : addMedName, 
        })
        setAddMedName('');
        await setMeds(tempMeds);
        await updateMeds();
    }
    
    return(
        <div>
            <Navbar/>
            <div className="container">
                <div className="row mt-3">
                    <div className="col"> 
                        <h1 className="text-start">Medications</h1>
                    </div>
                    <div className="col text-end"> 
                        <button type="button" className="btn btn-primary text-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add Medication
                        </button>
                    </div>
                   
                </div>

               
               
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Medication</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Medication Name</label>
                                    <input  type="text" value={addMedName} onChange={(e) => setAddMedName(e.target.value)} className="form-control"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={addMed} data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>  
                </div>
                <DataGrid id="dataGrid"  apiRef={apiRef} rows={rows} columns={columns} editMode="row" processRowUpdate={processRowUpdate} experimentalFeatures={{ newEditingApi: true }} onProcessRowUpdateError={(error) => {console.log(error)}} />
            </div>
        </div>
       
    )
}