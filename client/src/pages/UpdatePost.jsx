import { getDownloadURL, getStorage, uploadBytesResumable,ref } from "firebase/storage";
import { TextInput,Select, FileInput, Button, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function UpdatePost() {
    const[file,setFile]=useState(null);
    const[imageUploadProgress,setImageUploadProgress]=useState(null);
    const[imageUploadError,setImageUploadError]=useState(null);
    const[formData,setFormData]=useState({});
    const[publishError,setPublishError]=useState(null);
    const navigate=useNavigate();
    const{currentUser}=useSelector((state) => state.user);
    const {postId}=useParams();

    useEffect(()=>{
        try{
            const fetchPost=async () =>{
                const res=await fetch(`http://localhost:3000/api/post/getposts?postId=${postId}`,{
                    method:'GET',
                    credentials:'include',
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const data=await res.json();
                if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message)
                    return;
                }
                if(res.ok){
                    setPublishError(null);
                    setFormData(data.posts[0])
                }

            }
            fetchPost()
        }catch(e){
            console.log(e);
        }
    },[postId])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch(`http://localhost:3000/api/post/updatepost/${formData._id}/${currentUser._id}`,{
            method:'PUT',
            credentials: 'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
            })
            const data=await res.json();
            
            if(!res.ok){
                setPublishError("Failed to update post");
                
            }else{
                setPublishError(null);
                navigate(`/post/${data.slug}`)
            }
        }catch(err){
            setPublishError('Something went wrong');
        }
    }
    const handleUploadImage=async(req,res,next)=>{
        try {
            if(!file){
                setImageUploadError('Please select an image to upload');
                return;
            }
            setImageUploadError(null);
            const storage=getStorage(app);
            const fileName=new Date().getTime() + '-' + file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,file);
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress=
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error)=>{
                    setImageUploadError('Image Upload Failed!!');
                    setImageUploadProgress(null)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL)=>{
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData,image: downLoadURL})
                    })
                }
            )
        } catch (error) {
            setImageUploadError('Image Upload Failed');
            setImageUploadProgress(null)
            console.log(error);
        }
    }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput value={formData.title} type='text' placeholder="Title" required id="title" className="flex-1" onChange={(e)=>setFormData({...formData,title:e.target.value})}/>
                <Select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                    <option value='uncategorized'>
                        Select a Category
                    </option>
                    <option value='premier league news'>
                        Premier league Football News
                    </option>
                    <option value='la liga news'>
                        La liga Football News
                    </option>
                    <option value='serie a news'>
                        Serie a Football News
                    </option>
                    <option value='bundesliga news'>
                        Bundesliga Football News
                    </option>
                    <option value='ligue 1 news'>
                        Ligue 1 Football News
                    </option>
                    <option value='champions league news'>
                        Champions league Football News
                    </option>
                    <option value='mls news'>
                        MlS Football News
                    </option>
                    <option value='saudi league news'>
                        Saudi league Football News
                    </option>
                    <option value='transfer news'>
                        Transfer Football News
                    </option>
                    <option value='international news'>
                        International Football News
                    </option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                <Button type="button" gradientDuoTone='purpleToBlue'
                size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                    {
                        imageUploadProgress? <div className="w-16 h-16">
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                        </div>
                        : ('Upload Image')
                    }
                    
                </Button>
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}  
              {formData.image && (
                <img src={formData.image}
                alt='upload'
                className="w-full h-72 object-cover" />
              )}  
            
            <ReactQuill value={formData.content} theme="snow" className="h-72 mb-12" placeholder="Write Something" required onChange={(value)=>setFormData({...formData,content:value})}/>
            
            <Button type="submit" gradientDuoTone='greenToBlue' outline>Update Post</Button>
            {publishError && <Alert color='failure' className="mt-5">{publishError}</Alert>}
        </form>
    </div>
  )
}