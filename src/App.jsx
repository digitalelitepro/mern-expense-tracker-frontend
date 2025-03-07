import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Income from "./pages/dashboard/Income";
import Expense from "./pages/dashboard/Expense";
import Home from "./pages/dashboard/Home";
 
const App = () => {
  return (
    
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
    </div>
     
  );
};

export default App;


const Root = () => {
  
  // Check If Token Exists in LocalStorage
  const isAuthenticated = !!localStorage.getItem('accessToken')
  // Redirect to dashboard if authenticated ,  otherwise to login 
  return <>
       {
          isAuthenticated ?  (<Navigate to='/dashboard' /> ) : 
          ( <Navigate to='/login' />)
       }
     </>
}
