import { Link } from "react-router-dom";
import "../CssFiles/teacherquizpages.css";
import { useEffect } from "react";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StudentQuizList = () => {
    useEffect(()=>{
        document.title = "Your Questions"
    }, [])

    return ( 
        <div className="allQuizesList">
            <p className="heading">All Quizes</p>

            <Link to="/quiz/boy" className="studentquiz">
                <p>1) What is a boy, and how is he important?</p>

                <p>30 min <FontAwesomeIcon icon={faClock} /></p>
            </Link>

            <Link to="/quiz/boy" className="studentquiz">
                <p>2) What is the origin of life my guy, tell me I have to know.</p>

                <p>40 min <FontAwesomeIcon icon={faClock} /></p>
            </Link>

            <Link to="/quiz/boy" className="studentquiz">
                <p>3) Third random question?</p>

                <p>50 min <FontAwesomeIcon icon={faClock} /></p>
            </Link>

            <Link to="/quiz/boy" className="studentquiz">
                <p>4) Blah blah blah very important blah blah</p>

                <p>20 min <FontAwesomeIcon icon={faClock} /></p>
            </Link>

            <Link to="/quiz/boy" className="studentquiz">
                <p>5) All the interesting mangas have been completed</p>

                <p>15 min <FontAwesomeIcon icon={faClock} /></p>
            </Link>

            <Link to="/quiz/boy" className="studentquiz">
                <p>6) Dogs are very cute, that is a fact.</p>

                <p>35 min <FontAwesomeIcon icon={faClock} /></p>
            </Link>
        </div>
    );
}
 
export default StudentQuizList;