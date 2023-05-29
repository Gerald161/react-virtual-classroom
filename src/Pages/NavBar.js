import "../CssFiles/mainStyle.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

const NavBar = () => {
    const [loginPageState, setLoginPageState] = useState(false);

    const location = useLocation();

    const [showLogOutIcon, setShowLogOutIcon] = useState(false);

    function deleteToken(e){
        e.preventDefault()

        localStorage.removeItem("userToken");

        localStorage.removeItem("loginType");

        window.location = "http://localhost:3000/login"
    }

    useEffect(()=>{
        var userToken = localStorage.getItem("userToken");

        if (userToken === null){
            setShowLogOutIcon(false);

            if(window.location.href.split("/")[window.location.href.split("/").length - 1] === "login"){
                setLoginPageState(true)
            }else{
                setLoginPageState(false)
            }
        }else{
            setShowLogOutIcon(true);
        }

        
    }, [location])

    return ( 
        <nav>
            <div className="logo">
                <Link to="/" className="site-logo">Virtual Class</Link>
            </div>
            <div>
                {
                    loginPageState === true ?
                    <Link to="/joinoptions" className="nav__link--btn">Join</Link>
                    :
                    showLogOutIcon === false ?
                    <Link to="/login" className="nav__link--btn">Login</Link>
                    :
                    <Link to="/login" className="nav__link--btn" onClick={(e)=>{deleteToken(e)}}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Link>
                }
                    
            </div>
        </nav>
    );
}
 
export default NavBar;