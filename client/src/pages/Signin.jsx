import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";





//  navigate("/login")
export default function Signin(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        
        e.preventDefault();
        axios.post('http://localhost:5050/users/signin/',{
            'email' : email,
            'password' : password,
        },{ withCredentials: true }).then((response) =>{
            console.log(response);
            navigate('/select-patient/')
        }).catch(function (error) {
            console.log(error)
            if(error.response.status == "400"){
                alert(error.response.data.errorMessage);
            }
            console.log(error.response.data.errorMessage);
        })
    }


    return(
        <div className="d-flex py-5  align-items-center text-center">
            
            <main className="form-signin w-50 m-auto card" >
                <h1 className="h3 mt-3 fw-normal">Sign In</h1>
                <form className="mx-4 mb-4 text-start" onSubmit={handleSubmit}>
                  
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control"/>
                    </div>
                   
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>
        </div>
        // <div className="container vh-100 d-flex justify-content-center align-items-center">
        //     <div className="row w-100" style={{height: "700px"}}>
        //         <div className='col-6 p-0 bg-dark'>
        //             Fill in with content
        //         </div>
        //         <div className='col-6 p-0'>
        //            <div className="d-flex h-100 justify-content-center align-items-center" style= {{background: "grey"}}>
        //             <div>
        //                 <h1 className="text-white fs-5">Register</h1>
        //                 <form style={{width:"350px"}}>
        //                     <div className="mb-3 text-white">
        //                         <label htmlFor="name" className="form-label">Name</label>
        //                     </div>
        //                 </form>
                     
        //         </div>
        //             </div> 
        //         </div>
        //     </div>    
        // </div>
    );
}