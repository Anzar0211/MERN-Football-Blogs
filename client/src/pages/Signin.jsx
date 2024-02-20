import { Link,useNavigate } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import  axios from 'axios'
export default function Signin(){
  const [formData,setFormData]=useState({});
  const[errorMsg, setErrorMsg] = useState("");
  const[loading,setLoading]=useState(null);
  const navigate=useNavigate()
  const handleChange=(e)=>{
    console.log(e.target.value );
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password) return setErrorMsg("All fields are required");
    try{
      // const res=await axios.post('http://localhost:3000/api/auth/signin');
      setLoading(true);
      setErrorMsg(null);
      const res=await fetch('http://localhost:3000/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })
      const data=await res.json();
      if(data.success==false){
        return setErrorMsg(data.message)
      }
      setLoading(false);
      if(res.ok){
        navigate('/')
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
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Football</span>
              Blog
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
            <Button type="submit" gradientDuoTone='purpleToPink' disabled={loading}>
              {loading ? (
                <>  
                  <Spinner size='sm'>
                    <span>Loading...</span>
                  </Spinner>
                </>
              ) : 'Sign In'}
            </Button>
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