import { faCalendarDays, faQuestion, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import "../CssFiles/joinOptionsPage.css";
import { useEffect } from 'react';

const StudentDashBoard = () => {
    useEffect(()=>{
        document.title = "Welcome student to your dashboard"
    },[])


    return ( 
        <div>
            <h2 style={{textAlign: "center", margin: "20px 0 0 0 "}}>Welcome Student</h2>

            <main>
                <div className="joinOptionsContainer">
                    <Link to="/time-table" className="nav__link--btn">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p>Time Table</p>
                    </Link>

                    <Link to="/quizlist" className="nav__link--btn">
                        <FontAwesomeIcon icon={faQuestion} />
                        <p>Quiz</p>
                    </Link>

                    <Link to="/videos" className="nav__link--btn">
                        <FontAwesomeIcon icon={faVideo} />
                        <p>Previous Lessons</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
 
export default StudentDashBoard;