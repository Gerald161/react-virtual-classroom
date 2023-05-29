import { useEffect, useRef, useState } from "react";
import "../CssFiles/login.css";

const LoginPage = () => {
    const passwordShowRef = useRef();

    const passwordFieldRef = useRef();

    const emailFieldRef = useRef();

    const signUpButtonRef = useRef();

    const loaderRef = useRef();

    const [emailError, setemailError] = useState(false);

    const [passwordError, setpasswordError] = useState(false);

    const API_HOST = 'http://127.0.0.1:8000';

    var patterns = {
        telephone: /^[\d]{10}$/,
        username: /^[a-z\d]{5,12}$/,
        password: /^.{8,20}$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
    }
    
    var anyFieldInValid = true
    
    function validate(field, regex){
        if(regex.test(field.value)){
            field.className = 'valid';
    
            anyFieldInValid = false
        }else{
            field.className = 'invalid';
    
            anyFieldInValid = true
        }
    }

    function checkFieldValidation(e){
        validate(e.target, patterns[e.target.name]);
    }

    function handleSubmission(){
        validate(passwordFieldRef.current, patterns[passwordFieldRef.current.name]);

        validate(emailFieldRef.current, patterns[emailFieldRef.current.name]);
    
        if(anyFieldInValid === false){
            signUpButtonRef.current.classList.add("show_loader");
    
            loaderRef.current.classList.remove("show_loader");

            login().catch(error=>{
                signUpButtonRef.current.classList.remove("show_loader");
    
                loaderRef.current.classList.add("show_loader");
            });
        }
    }

    async function login(){
        let fd = new FormData();

        fd.append("password", passwordFieldRef.current.value)

        fd.append("email", emailFieldRef.current.value)

        var response = await fetch(
            `${API_HOST}/account/login`,
            {
                headers: {
                    'Accept': 'application/json',
                },
                method: "POST",
                body: fd
            }
        );

        if(!response.ok){
            signUpButtonRef.current.classList.remove("show_loader");
    
            loaderRef.current.classList.add("show_loader");
        }else{
            var data = await response.json();

            if(data["user_error"] !== undefined){
                setemailError(true);

                signUpButtonRef.current.classList.remove("show_loader");
    
                loaderRef.current.classList.add("show_loader");
            }

            if(data["password_error"] !== undefined){
                setpasswordError(true);

                signUpButtonRef.current.classList.remove("show_loader");
    
                loaderRef.current.classList.add("show_loader");
            }

            if(data["status"] !== undefined){
                assignToken(data["rank"], data["username"]).catch(error=>{
                    signUpButtonRef.current.classList.remove("show_loader");
        
                    loaderRef.current.classList.add("show_loader");
                });
            }
        }
    }

    async function assignToken(rank, username){
        let fd = new FormData();

        fd.append("password", passwordFieldRef.current.value)

        fd.append("username", emailFieldRef.current.value)

        var response = await fetch(
            `${API_HOST}/account/api/token`,
            {
                headers: {
                    'Accept': 'application/json',
                },
                method: "POST",
                body: fd
            }
        );

        if(!response.ok){
            signUpButtonRef.current.classList.remove("show_loader");
    
            loaderRef.current.classList.add("show_loader");
        }else{
            var data = await response.json();

            if(data["token"] !== undefined){
                localStorage.setItem("userToken", JSON.stringify({"userToken": data["token"]}));

                localStorage.setItem("loginType", JSON.stringify({"loginType": rank}));

                localStorage.setItem("username", JSON.stringify({"username": username}));

                window.location = "http://localhost:3000/"
            }
        }
    }

    function showHidePass(){
        var password_show = passwordShowRef.current
        
        var password_field = passwordFieldRef.current
        
        if(password_show.innerHTML === "SHOW"){
            password_show.innerHTML = "HIDE"
    
            password_field.type = "text"
        }else{
            password_show.innerHTML = "SHOW"
    
            password_field.type = "password"
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("userToken") !== null){
            window.location = "http://localhost:3000/"
        }
    }, [])

    return ( 
        <div className="login_section">
            <div className="first_section">
            
            </div>
            <div className="second_section">
                <h1>Welcome back</h1>
                <form method="post" action="#" onSubmit={(e)=>{e.preventDefault()}}>
                    <input ref={emailFieldRef} type="text" onKeyUp={
                        (e)=>{  
                                if(emailError !== false){
                                    setemailError(false);
                                }

                                checkFieldValidation(e);
                            }
                        } 
                        name="email" placeholder="Email" required/>

                    <p>Email must be a valid address, e.g. me@mydomain.com</p>

                    {
                        emailError === true ? <p className="submissionError">Wrong email entered, try again</p> :
                        <p></p>
                    }

                    <div style={{display: "flex", position: "relative"}}>
                    <div>
                        <input ref={passwordFieldRef} onKeyUp={
                            (e)=>{
                                if(passwordError !== false){
                                    setpasswordError(false);
                                }

                                checkFieldValidation(e);
                            }
                            } 
                            type="password" name="password" placeholder="Password" id="password" required/>

                        <p>Password must be alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters</p>

                        {
                            passwordError === true ? <p className="submissionError">Wrong password, try again</p> :
                        <p></p>
                    }
                    </div>

                    <div className="show_hide_pass" ref={passwordShowRef} onClick={(e)=>{showHidePass()}}>SHOW</div>

                    </div>

                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <button ref={signUpButtonRef} type="submit" id="signup_button" onClick={(e)=>{handleSubmission()}}>Log in</button>
                    </div>

                    <div className="loading show_loader" ref={loaderRef}></div>
                </form>
            </div>
        </div>
    );
}
 
export default LoginPage;