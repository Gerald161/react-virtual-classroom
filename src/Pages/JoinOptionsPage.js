import { faUserGraduate, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import "../CssFiles/joinOptionsPage.css";

const JoinOptionsPage = () => {
    useEffect(()=>{
        if(localStorage.getItem("userToken") !== null){
            window.location = "http://localhost:3000/"
        }
    }, [])

    return ( 
        <div>
            <h2 style={{textAlign: "center", margin: "20px 0 0 0 "}}>Select your role please</h2>

            <main>
                <div className="joinOptions">
                    <Link to="/teacherjoin" className="nav__link--btn">
                        <FontAwesomeIcon icon={faUserGraduate} />
                        <p>Teacher</p>
                    </Link>

                    <Link to="/studentjoin" className="nav__link--btn">
                        <FontAwesomeIcon icon={faBookOpen} />
                        <p>Student</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
 
export default JoinOptionsPage;