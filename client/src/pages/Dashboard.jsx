import { Link } from "react-router-dom";
export default function Dashboard(){
    return(
        <div className="main text-center">
            <h1>Welcome, [User]</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <Link to={'patients'} className="btn  stretched-link">Patients</Link>
                            </div>
                        </div>
                    </div>   
                 
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <a className="btn  stretched-link">Appointments</a>
                                
                            </div>
                        </div>
                    </div>   
                
                </div>
               
            </div>
        </div>
        
    );
}