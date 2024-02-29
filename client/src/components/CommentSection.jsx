import { Alert, Button, Textarea } from "flowbite-react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector} from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Comment from "./Comment"
import { Modal } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"



export default function CommentSection({postId}) {
  const navigate = useNavigate()
  const {currentUser}=useSelector(state=> state.user)
  const[comment,setComment]=useState('');
  const[comments,setComments]=useState([]);
  const[commentError,setCommentError]=useState(null)
  const[showModal,setShowModal]=useState(false)
  const[commentToDelete,setCommentToDelete]=useState(null)
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
    if(comment==='') return;
    if(comment.length>200) return 
    const res=await fetch(`http://localhost:3000/api/comment/create`,{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({content:comment,postId,userId:currentUser._id})
    })
    const data=await res.json();
    if(res.ok){
      setComment('')
      setCommentError(null)
      setComments([data,...comments])
    }
    } catch (error) {
      setCommentError(error.message)
    }
    
  }
  useEffect(()=>{
    const getComments = async () => {
      try {
        const res=await fetch(`http://localhost:3000/api/comment/getPostComments/${postId}`,{
          method:'GET',
          credentials:'include',
          headers:{
          'Content-Type':'application/json'
            },
          })
          if(res.ok){
            const data=await res.json()
            setComments(data)
          }
      } catch (error) {
        console.log(error.message);
      }
    }
    getComments()
  },[postId])

  const handleLike=async(commentId)=>{
      try {
        if(!currentUser){
          navigate('/sign-in')
          return;
        }
        else{
          const res=await fetch(`http://localhost:3000/api/comment/likeComment/${commentId}`,{
            method:"PUT",
            credentials:'include',
            headers:{
              "Content-Type":"application/json"
            }
          })
          if(res.ok){
            const data=await res.json()
            setComments(comments.map(comment=>
              comment._id===commentId?{...comment,likes:data.likes,numberOfLikes:data.likes.length}:(comment)
            ))
          }
        }
      } catch (error) {
        console.log(error.message);
      }
  }

  const handleEdit=async(comment,editedContent)=>{
    setComments(
      comments.map((cmt) =>
        cmt._id === comment._id ?{...comment,content:editedContent}
        :cmt)
    )
  };

  const handleDelete=async(commentId)=>{
    setShowModal(false)
    try {
      if(!currentUser){
        navigate('/sign-in')
        return;
      }
      const res=await fetch(`http://localhost:3000/api/comment/deleteComment/${commentId}`,{
        method:"DELETE",
        credentials: 'include',
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(res.ok){
        const data=await res.json();
        setComments(comments.filter((comment)=>comment._id!==commentId)); 
      }
    } catch (error) {
      
    }
  }
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500">
          <p>Signed in as: </p>
          <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
          <Link className="text-xs text-teal-600 hover:underline" to={`/dashboard?tab=profile`}>@{currentUser.username}</Link>
        </div>
      ):
      <div className="text-sm text-teal-500 my-5 flex gap-1">
        Please sign up or log in to comment.
        <Link className="text-blue-500 hover:underline" to={`/sign-in`}>Sign In</Link>
      </div>
      }
      {currentUser && (
        <form className="border border-teal-600 p-3 rounded-md" onSubmit={handleSubmit}>
          <Textarea placeholder="Add a comment..." rows='3' maxLength='200' onChange={(e)=>setComment(e.target.value)} value={comment}/>
          <div className="flex justify-between items-center mt-5">
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>{commentError}</Alert>
          )}
        </form>
      )}
      {comments.length===0?(
        <p className="text-sm my-5">No comments on this post yet.!!</p>
      ):(
        <>
        <div className="flex text-sm my-5 items-center gap-1">
          <p>Comments</p>
          <div className="border border-gray-400 py-1 px-2 rounded-sm">
            <p>{comments.length}</p>
          </div>
        </div>
        {
        comments.map(comment=>(
          <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={(commentId)=>{
            setShowModal(true);
            setCommentToDelete(commentId)
          }}/>
        ))
        }
        </>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup
       size='md'>
            <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
                        <h3 className="mb-5 text-lg text-gray-500" dark:text-gray-400>
                            Are you sure you want to delete this comment? 
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={()=>handleDelete(commentToDelete)}>Yes,I'm Sure</Button>
                            <Button color="success" onClick={()=>setShowModal(false)}>No,Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
       </Modal>
    </div>
  )
}