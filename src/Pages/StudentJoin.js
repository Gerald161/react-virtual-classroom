import "../CssFiles/login.css";
import { useEffect, useRef, useState } from "react";

const StudentJoin = () => {
    const passwordShowRef = useRef();

    const passwordFieldRef = useRef();

    const emailFieldRef = useRef();

    const signUpButtonRef = useRef();

    const loaderRef = useRef();

    const userNameRef = useRef();

    const telephoneRef = useRef();

    const [emailError, setemailError] = useState(false);

    const [usernameError, setusernameError] = useState(false);

    const API_HOST = 'http://127.0.0.1:8000';

    var patterns = {
        telephone: /^[\d]{10}$/,
        username: /^[a-zA-Z\d]{4,12}$/,
        password: /^.{8,20}$/,
        email: /^([a-zA-Z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
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
        const fieldsToValidate = [userNameRef.current, emailFieldRef.current, telephoneRef.current, passwordFieldRef.current]

        for(let i = 0; i < fieldsToValidate.length; i ++){
            validate(fieldsToValidate[i], patterns[fieldsToValidate[i].name]);

            if(anyFieldInValid === true){
                break;
            } 
        }
    
        if(anyFieldInValid === false){
            signUpButtonRef.current.classList.add("show_loader");
    
            loaderRef.current.classList.remove("show_loader");

            signUp().catch(error=>{
                signUpButtonRef.current.classList.remove("show_loader");
    
                loaderRef.current.classList.add("show_loader");
            });
        }
    }

    async function signUp(){
        let fd = new FormData();

        fd.append("password", passwordFieldRef.current.value)

        fd.append("email", emailFieldRef.current.value)

        fd.append("username", userNameRef.current.value)

        fd.append("rank", "student")

        var response = await fetch(
            `${API_HOST}/account/signup`,
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

            if(data["email"] !== undefined){
                setemailError(true);

                signUpButtonRef.current.classList.remove("show_loader");
    
                loaderRef.current.classList.add("show_loader");
            }

            if(data["username"] !== undefined){
                setusernameError(true);

                signUpButtonRef.current.classList.remove("show_loader");
    
                loaderRef.current.classList.add("show_loader");
            }

            if(data["status"] !== undefined){
                assignToken(data["rank"], data["name"]).catch(error=>{
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
            <div className="studentSection">
            
            </div>
            <div className="second_section">
                <h1>Join many other students learn</h1>

                <form method="post" action="#" onSubmit={(e)=>{e.preventDefault()}}>
                    <input type="text" onKeyUp={
                        (e)=>{
                            if(usernameError !== false){
                                setusernameError(false);
                            }

                            checkFieldValidation(e)
                        }

                        } name="username" placeholder="Username" required ref={userNameRef}/>
                    <p>Username must be letters and numbers and contain 4 - 12 characters</p>

                    {
                        usernameError === true ? <p className="submissionError">Username already exists please type another one</p> :
                        <p></p>
                    }

                    <input type="text" onKeyUp={
                        (e)=>{
                            if(emailError !== false){
                                setemailError(false);
                            }

                            checkFieldValidation(e)
                        }
                        } name="email" placeholder="Email" ref={emailFieldRef} required/>

                    <p>Email must be a valid address, e.g. me@mydomain.com</p>

                    {
                        emailError === true ? <p className="submissionError">Email already taken, try again</p> :
                        <p></p>
                    }

                    <input ref={telephoneRef} type="text" onKeyUp={(e)=>{checkFieldValidation(e)}} name="telephone" placeholder="Phone Number" maxLength={10} required/>
                    <p>Telephone must be a valid telephone number (10 digits)</p>

                    <div style={{display: "flex", position: "relative"}}>
                        <div>
                        <input onKeyUp={(e)=>{checkFieldValidation(e)}} ref={passwordFieldRef} type="password" name="password" placeholder="Password" id="password" required/>
                        <p>Password must be alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters</p>
                        </div>
                        <div className="show_hide_pass" ref={passwordShowRef} onClick={(e)=>{showHidePass()}}>SHOW</div>
                    </div>

                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <button ref={signUpButtonRef} type="submit" id="signup_button" onClick={(e)=>{handleSubmission()}}>SUBMIT</button>
                    </div>

                    <div ref={loaderRef} className="loading show_loader"></div>
                </form>
            </div>
        </div>
    );
}
 
export default StudentJoin;