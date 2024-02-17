import { BrowserRouter, Route,Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>

      </Routes>
    </BrowserRouter>
  )
}