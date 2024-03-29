import { Link,useNavigate } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import {useDispatch,useSelector} from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice'
import  axios from 'axios'
import OAuth from "../components/OAuth";
export default function Signin(){
  const [formData,setFormData]=useState({});
  // const[errorMsg, setErrorMsg] = useState("");
  // const[loading,setLoading]=useState(null);
  const {loading,error:errorMsg}=useSelector(state=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const handleChange=(e)=>{
    // console.log(e.target.value );
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password) return dispatch(signInFailure('Email and Password are required'));
    try{
      // const res=await axios.post('${import.meta.env.VITE_BASE_URL}/api/auth/signin');
      dispatch(signInStart());
      const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signin`,{
        method:'POST',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })
      const data=await res.json();
      if(data.success==false){
        dispatch(signInFailure(data.message))
      }
      // setLoading(false);
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
    }catch(e){
      dispatch(signInFailure(e.message))
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-green-500 to-green-900 rounded-lg text-white">Goalpost</span>
              Gazette
          </Link>
          <p className="text-sm mt-5">
            Explore the latest football news and articles from around the world.Sign in with your email and password or Google Account.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email ID"></Label>
              <TextInput type='email' placeholder="Email ID" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your password"></Label>
              <TextInput type='password' placeholder="**********" id="password" onChange={handleChange}/>
            </div>
            <Button type="submit" gradientDuoTone='purpleToBlue' disabled={loading}>
              {loading ? (
                <>  
                  <Spinner size='sm'>
                    <span>Loading...</span>
                  </Spinner>
                </>
              ) : 'Sign In'}
            </Button>
            <OAuth/>
          </form>
          <div className="flex mt-5 gap-1 text-sm">
            <span>Don't have an account?</span>&nbsp;
            <Link to="/sign-up" className="font-medium hover:underline text-blue-500">Sign up</Link>
          </div>
          {errorMsg && 
            <Alert className="mt-5" color='failure'>
              {errorMsg}
            </Alert>
          }
        </div>
      </div>
    </div>
  )
}