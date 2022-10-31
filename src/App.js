import TaskSection from "./components/tasks/TaskSection";
import {useSelector} from "react-redux"
import Timers from "./components/timers/Timers";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const taskList = useSelector((state)=> state.tasks.value);
  return (
    <div className="app">
    <ToastContainer />

      <div className="timers">
        <Timers taskList={taskList} />
      </div>
      <div className="tasks">
        <TaskSection taskList={taskList} />
      </div>
    </div>
  );
}

export default App;
