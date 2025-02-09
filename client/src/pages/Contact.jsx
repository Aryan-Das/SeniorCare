import { Link } from "react-router-dom";
import BrandNavbar from "../components/BrandNavbar";
export default function Contact(){
    return(
        <div style={{backgroundColor: "#a8ffca"}}>
            <BrandNavbar/>
            <div className="main p-4 text-left text-dark" >
               
                <div className="container">
                    <div className="row">
                        <h1  style={{fontSize: "40pt"}}>Contact Us</h1>
                        {/* <h3 className="" style={{fontSize: "20pt"}}>Email: <a href="mailto:jiniussolutions@outlook.com"> jiniussolutions@outlook.com </a></h3>
                        <h3 className="" style={{fontSize: "20pt"}}>Phone: (925)963-1783</h3> */}

                    </div>
                    
                </div>
            </div>
            <div className="container" style={{fontSize: "20pt"}}> 
                   <div className="row my-1">
                    <div className="col col-md-6 col-lg-6col-sm-12">
                            <div class="card p-3">
                                
                                <img src="../src/assets/email.png"  style={{maxWidth:"10rem", alignSelf:"center"}} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Email</h5>
                                    <p class="card-text"><a href="mailto:jiniussolutions@outlook.com"> jiniussolutions@outlook.com </a></p>
                                   
                                </div>
                            </div>
                       </div>   
            
                    
                       <div className="col col-md-6 col-lg-6 col-sm-12">
                            <div class="card p-3" >
                                <img src="../src/assets/phone.png"  style={{maxWidth:"10rem", alignSelf:"center"}} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Phone</h5>
                                    <p class="card-text">(925)963-1783</p>
                                  
                                </div>
                            </div>
                       </div>
                      
                 
                   </div>
                   <br></br>
                    
               </div>
        </div>
      
        
    );
}