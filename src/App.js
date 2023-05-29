import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import NavBar from "./Pages/NavBar";
import Footer from './Pages/Footer';
import LoginPage from './Pages/LoginPage';
import JoinOptionsPage from './Pages/JoinOptionsPage';
import StudentJoin from './Pages/StudentJoin';
import TeacherJoin from './Pages/TeacherJoin';
import TimeTable from './Pages/TimeTable';
import ScheduleClass from './Pages/ScheduleClass';
import Classroom from './Pages/Classroom';
import VideosPage from './Pages/VideosPage';
import QuizesPage from './Pages/QuizesPage';
import EditQuizPage from './Pages/EditQuizPage';
import QuizAddOrEdit from './Pages/QuizAddOrEdit';
import QuizTake from './Pages/QuizTake';
import StudentQuizList from './Pages/StudentQuizList';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/login" element={<LoginPage/>}></Route>
            <Route exact path="/joinoptions" element={<JoinOptionsPage/>}></Route>
            <Route exact path="/studentjoin" element={<StudentJoin/>}></Route>
            <Route exact path="/teacherjoin" element={<TeacherJoin/>}></Route>
            <Route exact path="/schedule-class" element={<ScheduleClass/>}></Route>
            <Route exact path="/time-table" element={<TimeTable/>}></Route>
            <Route exact path="/videos" element={<VideosPage/>}></Route>
            <Route exact path="/quizes" element={<QuizesPage/>}></Route>
            <Route exact path="/classroom/:id/:roomusername" element={<Classroom/>}></Route>
            <Route exact path="/quizlist" element={<StudentQuizList/>}></Route>
            <Route exact path="/quiz/:id" element={<QuizTake/>}></Route>
            <Route exact path="/editquiz/:id" element={<EditQuizPage/>}></Route>
            <Route exact path="/editquiz/:id/:num" element={<QuizAddOrEdit/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
