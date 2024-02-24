import { getDownloadURL, getStorage, uploadBytesResumable,ref } from "firebase/storage";
import { TextInput,Select, FileInput, Button, Alert } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
export default function CreatePost() {
    const[file,setFile]=useState(null);
    const[imageUploadProgress,setImageUploadProgress]=useState(null);
    const[imageUploadError,setImageUploadError]=useState(null);
    const[formData,setFormData]=useState({});
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
        <h1 className="text-center text-3xl my-7 font-semibold">Create a new post</h1>
        <form className="flex flex-col  gap-4">
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder="Title" required id="title" className="flex-1"/>
                <Select>
                    <option value='uncategorized'>
                        Select a Category
                    </option>
                    <option value='international news'>
                        International Football News
                    </option>
                    <option value='club news'>
                        Club Football News
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
            
            <ReactQuill theme="snow" className="h-72 mb-12" placeholder="Write Something" required/>
            
            <Button type="submit" gradientDuoTone='purpleToPink' outline>Publish</Button>
        </form>
    </div>
  )
}