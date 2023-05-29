import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const QuizAddOrEdit = () => {
    const { num } = useParams();

    const location = useLocation();

    const { question } = location.state;

    function submitInfo(e){
        e.preventDefault();
    }

    return ( 
        <div className="quizAddContainer">
            <p>Please type your question and provide answer options</p>

            <form onSubmit={(e)=>{submitInfo(e)}}>
                <div className="question">
                    <span>{num})</span> <input type="text" defaultValue={question} placeholder="Please type your question here"/>
                </div>

                <div className="possibleAnswersContainer">
                    <p>Possible Answers: </p>

                    <select>
                        <option>Multi-Choice</option>
                        <option>True/False</option>
                    </select>
                </div>

                <div className="answerOptionsContainer">
                    <div className="answerOption">
                        <span>A)</span> <input type="text" placeholder="Type option for A"/>
                    </div>

                    <div className="answerOption">
                        <span>B)</span> <input type="text" placeholder="Type option for B"/>
                    </div>

                    <div className="answerOption">
                        <span>C)</span> <input type="text" placeholder="Type option for C"/>
                    </div>

                    <div className="answerOption">
                        <span>D)</span> <input type="text" placeholder="Type option for D"/>
                    </div>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default QuizAddOrEdit;