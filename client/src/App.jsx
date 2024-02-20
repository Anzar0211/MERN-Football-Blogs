import { BrowserRouter, Route,Routes } from "react-router-dom";
import FooterComp from "./components/Footer";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Header from "./components/Header";
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>

      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}