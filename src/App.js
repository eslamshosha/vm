import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Notfound from "./pages/notfound";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Register from './pages/register';
import SignIn from './pages/signin';
import Forget from './pages/forget-password';
import Otp from "./pages/otp";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" exact element={<Register />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/signin" exact element={<SignIn />} />
          <Route path="/forget-password" exact element={<Forget />} />
          <Route path="/otp" exact element={<Otp />} />
          <Route path="*" exact element={<Notfound />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
