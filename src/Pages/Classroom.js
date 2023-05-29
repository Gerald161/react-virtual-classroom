import LiveChatSection from "./LiveChatSection";
import VideoCallSection from "./VideoCallSection";
import "../CssFiles/classroom.css";
import { useEffect } from "react";

const Classroom = () => {
    useEffect(()=>{
        document.title = "Class in session"
    }, [])

    return ( 
        <div className="mainClassRoomSection">
            <VideoCallSection/>
            <LiveChatSection/>
        </div>
    );
}
 
export default Classroom;