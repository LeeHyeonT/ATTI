import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";

import Homepage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ClassMeeting from "./pages/ClassMeeting";
import Community from "./pages/Community";
import WelcomePage from "./pages/Welcome";
import ModalTest from "./pages/ModalTest";
import OAuth2RedirectHandler from "./components/account/OAuth2RedirectHandler";
import { RootState } from "./store/index.js";
import { useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((state: RootState) => state.userInfo);
  //const access = localStorage.getItem("AccessToken");
  return (
    <Routes>
    <Route path="/" element={ <Homepage />} />
    <Route path="/login" element={ <LoginPage />} />
    <Route path="/signup" element={ <SignupPage />} />
    <Route path="/community/:departName/:categoryName" element={<PrivateRoute  authenticated={auth} component={<Community />}/>} />
    <Route path="/classmeeting" element={<PrivateRoute  authenticated={auth} component={<ClassMeeting />}/>} />
    <Route path="/welcome" element={<PrivateRoute  authenticated={auth} component={<WelcomePage />}/>} />
    <Route path="/modaltest" element={ <ModalTest />} />
    <Route path="/oauth/callback/kakao" element={<OAuth2RedirectHandler/>}/>
    </Routes>
  );
}

export default App;
