import { faPlus, faCalendarDays, faBookOpenReader, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import "../CssFiles/joinOptionsPage.css";
import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment, incrementByAmount } from '../redux/counter';

const TeacherDashBoard = () => {
    // const count = useSelector((state) => state.counter.value);

    // const dispatch = useDispatch();

    useEffect(()=>{
        document.title = "Welcome Teacher to your dashboard"
    },[])

    return ( 
        <div>
            <h2 style={{textAlign: "center", margin: "20px 0 0 0 "}}>Welcome Teacher</h2>

            {/* <p style={{textAlign: "center", margin: "20px 0 0 0 "}}>{count}</p> */}

            {/* <button onClick={(e)=>{dispatch(increment())}}>Add</button>

            <button onClick={(e)=>{dispatch(decrement())}}>Reduce</button>

            <button onClick={(e)=>{dispatch(incrementByAmount(33))}}>Add variably</button> */}

            <main>
                <div className="joinOptionsContainer">
                    <Link to="/schedule-class" className="nav__link--btn">
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Schedule Class</p>
                    </Link>

                    <Link to="/time-table" className="nav__link--btn">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p>Time Table</p>
                    </Link>

                    <Link to="/quizes" className="nav__link--btn">
                        <FontAwesomeIcon icon={faBookOpenReader} />
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
 
export default TeacherDashBoard;