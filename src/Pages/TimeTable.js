import Calendar from "./Calendar";
import { Link } from "react-router-dom";

const TimeTable = () => {
    return ( 
        <div style={{display: "flex", flexDirection: "column", gap: "2vh"}}>
            <Calendar/>

            <Link style={{margin: "10px 10px 20px 10px"}} to="/classroom/20/aaaa" className="nav__link--btn">
                <p>Join Classroom</p>
            </Link>
        </div>
    );
}
 
export default TimeTable;