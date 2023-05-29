import { useEffect, useState } from "react";
import TeacherDashBoard from "./TeacherDashBoard";
import StudentDashBoard from "./StudentDashBoard";

const Home = () => {
    const [teacherPageShowState, setTeacherPageShowState] = useState(false);

    useEffect(()=>{
        var userToken = localStorage.getItem("userToken");

        if(userToken == null){
            window.location = "http://localhost:3000/login";
        }else{
           var loginType = localStorage.getItem("loginType"); 

           if(JSON.parse(loginType)["loginType"] === "teacher"){
            setTeacherPageShowState(true)
           }
        }
    }, [])

    return ( 
        <div>
            {
            teacherPageShowState === true ?
                <TeacherDashBoard/>
                : 
                <StudentDashBoard/>
            }
        </div>
    );
}
 
export default Home;