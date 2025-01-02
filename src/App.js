import { BrowserRouter, Switch,Route } from "react-router-dom/cjs/react-router-dom.min";
import HomeEl from "./Componenets/Home";
import AddTasksEl from "./Componenets/AddTasks";
import UpdateTasksEl from "./Componenets/UpdateTasks";

function App() {
  return (
    <>
     <BrowserRouter>
     <Switch>
      <Route exact path='/' component={HomeEl}/>
      <Route exact path='/add' component={AddTasksEl}/>
      <Route exact path='/edit' component={UpdateTasksEl}/>
     </Switch>
     </BrowserRouter>
    </>
  );
}

export default App;
