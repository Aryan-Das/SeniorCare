import { Link } from "react-router-dom";


export default function Navbar(){
    return(
        <div>
            <nav className="navbar bg-green">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="../src/assets/Brickford_Logo.jpg" alt="Logo" width="50" height="50" className=" m-1 d-inline-block align-text-center"/>
                        Brickford Home
                    </a>
                </div>
            </nav>
        </div>
    );
}