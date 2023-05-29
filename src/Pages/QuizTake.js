import "../CssFiles/teacherquizpages.css";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";

const QuizTake = () => {
    // const { id } = useParams();

    useEffect(()=>{
        document.title = "Edit, add, delete questions"
    }, [])

    return ( 
        <div className="allStudentsQuestionsList">
            <h1 style={{textAlign: "center"}}>Please answer all questions</h1>

            <div className="studentQuizQuestionContainer">
                <p>1) This is the first question and its options:</p>

                <div className="studentQuestionOptions">
                    <div>
                        <input type="radio" id="first" name="answer1" value="first"/>
                        <label htmlFor="first">First</label>
                    </div>
                    <div>
                        <input type="radio" id="second" name="answer1" value="second"/>
                        <label htmlFor="second">Second</label>
                    </div>
                    <div>
                        <input type="radio" id="third" name="answer1" value="third"/>
                        <label htmlFor="third">Third</label>
                    </div>    
                </div>
            </div>

            <div className="studentQuizQuestionContainer">
                <p>2) Second question and its options:</p>

                <div className="studentQuestionOptions">
                    <div>
                        <input type="radio" id="ans1" name="answer2" value="first"/>
                        <label htmlFor="ans1">First</label>
                    </div>
                    
                    <div>
                        <input type="radio" id="ans2" name="answer2" value="second"/>
                        <label htmlFor="ans2">Second</label> 
                    </div>
                    
                    <div>
                        <input type="radio" id="ans3" name="answer2" value="third"/>
                        <label htmlFor="ans3">Third</label> 
                    </div>
                    
                </div>
            </div>

            
        </div>
    );
}
 
export default QuizTake;