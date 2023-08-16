import './App.css';
import SignIn from './pages/SignIn';
import toast, { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Connection from './pages/Connection';


function App() {


  return (
    <div className="App">
    <Toaster></Toaster>
    <Router>
    <Routes>
    <Route exact path='/login' element={<Login></Login>}></Route>
      <Route  exact path='/signin' element={ <SignIn></SignIn>}></Route>
      <Route exact path='/' element={<Dashboard></Dashboard>}></Route>
      <Route exact path='/connection' element={<Connection></Connection>}></Route>
    </Routes>
    </Router>

    </div>
  );
}

export default App;
