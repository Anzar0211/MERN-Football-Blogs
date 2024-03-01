import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home(){
  const[posts,setPosts]=useState([])
  useEffect(()=>{
    try {
      const fetchPosts=async()=>{
      const res=await fetch('http://localhost:3000/api/post/getposts')
      const data=await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
    } catch (error) {
      console.log(error.message);
    }
    
  },[])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to the home page!
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere necessitatibus obcaecati eligendi fugit consequuntur natus sit eos, voluptatibus aperiam possimus harum, delectus suscipit repudiandae. Magni optio ea labore suscipit incidunt.
        </p>
      <Link to='/search' className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">View All Posts</Link>
      </div>
      <div className="p-3 dark:bg-slate-700 bg-green-600">
        <CallToAction/>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {posts.map((post)=>(
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link to={'/search'} className='text-lg text-teal-500 text-center hover:underline'>
                  View All Posts
              </Link>
            </div>
            
          )
        }
      </div>
    </div>
  )
}