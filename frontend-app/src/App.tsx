import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page";
import SignUp from "./components/signup-page";
import { SigninPage } from "./components/signin-page";
import { Dashboard } from "./components/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<SigninPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
