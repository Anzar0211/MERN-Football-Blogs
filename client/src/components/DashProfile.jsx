import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { useSelector } from "react-redux"
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateSuccess,updateFailure } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
export default function DashProfile() {
    const {currentUser}=useSelector(state=>state.
    user)
    const[imageFile,setImageFile]=useState(null);
    const[imageFileUrl,setImageFileUrl]=useState(null);
    const[imageFileUploadingProgress,setImageFileUploadingProgress] = useState(null);
    const[imageFileUploadError,setImageFileUploadError]=useState(null);
    const[formData,setFormData]=useState({});
    const filePickerRef=useRef()
    const dispatch=useDispatch();
    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])
    const uploadImage=async()=>{
        setImageFileUploadError(null)
        const storage=getStorage(app);
        const fileName=new Date().getTime()+imageFile.name;
        const storageRef=ref(storage,fileName);
        const uploadTask=uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed',
        (snapshot)=>{
            const progress=
            (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            setImageFileUploadingProgress(progress.toFixed(0));
        },
        (error)=>{
            setImageFileUploadError('Could not upload image (file must be less than 2MB!)')
            setImageFileUploadingProgress(null)
            setImageFileUrl(null)
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageFile(downloadURL);
                setFormData({...formData,profilePicture:downloadURL})
            })
        })
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(Object.keys(formData).length==0){
            return
        }
        try{
            dispatch(updateStart());
            console.log(currentUser._id);
            const res=await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data=await res.json();
            if(!res.ok){
                dispatch(updateFailure(data.message))
            }else{
                dispatch(updateSuccess(data))
            }
        }catch(e){
            dispatch(updateFailure(data.message))
        }

    }
    
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
       <h1 className="my-7 text-center font-semibold text-3xl">
        Profile
       </h1>
       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative h-32 w-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={
            ()=>filePickerRef.current.click()
        }>
            <CircularProgressbar value={imageFileUploadingProgress || 0} text={imageFileUploadingProgress && `${imageFileUploadingProgress}%`} strokeWidth={5} 
            styles={{
                root:{
                    width:"100%",
                    height:'100%',
                    position:'absolute',
                    top:0,
                    left:0
                },
                path:{
                    stroke:`rgba(62,152,199 ${imageFileUploadingProgress/100})`
                }
            }}
            />
        <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress<100 && 'opacity-60'}`}/>
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
        <TextInput type='text' id='username' placeholder="username" defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder="email" defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder="password" onChange={handleChange}/>
        <Button type="submit" gradientDuoTone='purpleToBlue' outline>Update</Button>
       </form>
       <div className="text-red-500 flex justify-between mt-4">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
       </div>
    </div>
  )
}