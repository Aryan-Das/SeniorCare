import { Link } from "react-router-dom";


export default function Patient(props){
    return(
        <div>
            <div className="card mb-3">
                <div className="row g-0">
            
                    <div className="col-lg-10">
                        <div className="card-body text-start">
                            <h5 className="card-title">{props.name}</h5>
                            <p className="card-text">Demographic Info</p>
                            {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                        </div>
                    </div>
                    <div className="col-sm-2 d-flex align-items-center">
                        <Link to ={'../patient/' + props.record._id} relative="route" className="box btn btn-primary m-1">View</Link>
                        <button className="box btn btn-danger m-1" onClick={() => props.deleteRecord(props.record._id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


