import { Link } from "react-router-dom";
import BrandNavbar from "../components/BrandNavbar";
export default function Landing(){
    return(
        <div>
            <BrandNavbar/>
            <div className="main p-4 text-left text-dark" style={{backgroundColor: "#a8ffca"}}>
               
                <div className="container">
                    <div className="row">
                        <h1  style={{fontSize: "50pt"}}>An all-in-one software for senior living.</h1>
                    
                    </div>
                    <div className="row text-muted my-2">
                        <h5>Store documents, view/edit prescriptions, and access data digitally.</h5>
                    </div>
                    <div className="row">
                        <div className="col px-2">
                            <Link to ={'/contact'} relative="route" style={{fontSize: "15pt"}} className="box btn btn-dark m-1">Contact Us</Link>
            
                        </div>
                    </div>
                    <div className="row py-3">
                        <img src="../src/assets/reference_image.png" class="p-0 mx-2 img-fluid border border-3 border-dark rounded-3" alt="Medical Records Demo"/>

                    </div>
                </div>
            </div>
            <div className="main p-4 text-left text-dark" >
               
               <div className="container">
                   <div className="row">
                    <div className="col col-md-4 col-lg-4 col-sm-12">
                            <div class="card p-1">
                                
                                <img src="../src/assets/documents.png"  style={{maxWidth:"10rem", alignSelf:"center"}} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Organization</h5>
                                    <p class="card-text">Store all of your residents' information in a single central and digitized location.</p>
                                   
                                </div>
                            </div>
                       </div>   
                       <div className="col col-md-4 col-lg-4 col-sm-12">
                            <div class="card p-1">
                                <img src="../src/assets/lock.png"  style={{maxWidth:"10rem", alignSelf:"center"}}  class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Security</h5>
                                    <p class="card-text">Encryption and cccount authentication to ensure data safety.</p>
                                   
                                    
                                </div>
                            </div>
                       </div>
                    
                       <div className="col col-md-4 col-lg-4 col-sm-12">
                            <div class="card p-1" >
                                <img src="../src/assets/phone.png"  style={{maxWidth:"10rem", alignSelf:"center"}} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Communication</h5>
                                    <p class="card-text">Stay connected with staff, residents, and families through live chat channels and notifications.</p>
                                  
                                </div>
                            </div>
                       </div>
                      
                   
                   </div>
                   
               </div>
           </div>
        </div>
      
        
    );
}