import { Link,useNavigate } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import  axios from 'axios'
import OAuth from "../components/OAuth";
export default function Signup(){
  const [formData,setFormData]=useState({});
  const[errorMsg, setErrorMsg] = useState("");
  const[loading,setLoading]=useState(null);
  const navigate=useNavigate()
  const handleChange=(e)=>{
    // console.log(e.target.value );
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password) return setErrorMsg("All fields are required");
    try{
      // const res=await axios.post('${import.meta.env.VITE_BASE_URL}/api/auth/signup');
      setLoading(true);
      setErrorMsg(null);
      const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`,{
        method:'POST',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })
      const data=await res.json();
      if(data.success==false){
        return setErrorMsg(data.message)
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
    }catch(e){
      setErrorMsg(e.message);
      setLoading(false);
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
           Explore the latest football news and articles from around the world.Sign up with your email and password or Google Account. 
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username"></Label>
              <TextInput type='text' placeholder="Username" id="username" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your Email ID"></Label>
              <TextInput type='email' placeholder="Email ID" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your password"></Label>
              <TextInput type='password' placeholder="Password" id="password" onChange={handleChange}/>
            </div>
            <Button type="submit" gradientDuoTone='purpleToBlue' disabled={loading}>
              {loading ? (
                <>  
                  <Spinner size='sm'>
                    <span>Loading...</span>
                  </Spinner>
                </>
              ) : 'Sign Up'}
            </Button>
            <OAuth/>
          </form>
          <div className="flex mt-5 gap-1 text-sm">
            <span>Already have an account?</span>&nbsp;
            <Link to="/sign-in" className="font-medium hover:underline text-blue-500">Sign in</Link>
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