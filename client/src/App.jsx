import { BrowserRouter, Route,Routes } from "react-router-dom";
import FooterComp from "./components/Footer";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import Statistics from "./pages/Statistics";
export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route element={<PrivateRoutes/>}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<AdminPrivateRoute/>}>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
        </Route>

        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="/post/:postSlug" element={<PostPage/>}></Route>
      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}