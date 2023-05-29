import { Link } from "react-router-dom";
import "../CssFiles/teacherquizpages.css";
import { useEffect } from "react";
import { faPencil, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from "react-router-dom";

const EditQuizPage = () => {
    const { id } = useParams();

    useEffect(()=>{
        document.title = "Edit, add, delete questions"
    }, [])

    return ( 
        <div>
            <p style={{textAlign: "center", margin: "20px"}}>Please set questions below this page</p>

            <div className="mainDraftPage">
                <div className="questionContainer">
                    <div className="question">
                        <p>1) What is a dog, and how is it important?</p>
                        <div className="questionEditOptions">
                            <Link to={`/editquiz/${id}/1`} state={{question: "What is a dog, and how is it important?"}}>
                                <FontAwesomeIcon icon={faPencil} />
                            </Link>
                            <Link to="">
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </Link>
                        </div>
                    </div>

                    <div className="question">
                        <p>2) What is a cat, and how is it important?</p>
                        <div className="questionEditOptions">
                            <Link to={`/editquiz/${id}/2`} state={{question: "What is a cat, and how it important?"}}>
                                <FontAwesomeIcon icon={faPencil} />
                            </Link>
                            <Link to="">
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditQuizPage;