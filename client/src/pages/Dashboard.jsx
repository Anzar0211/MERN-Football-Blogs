import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import DashComments from "../components/DashComments";
import DashPosts from "../components/DashPosts";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers"
export default function Dashboard(){
  const location = useLocation();
  const[tab,setTab]=useState('');
  useEffect(()=>{
    const urlParam=new URLSearchParams(location.search);
    const tabFromUrl=urlParam.get("tab");
    if(tabFromUrl) setTab(tabFromUrl);
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
          <DashSidebar/>
      </div>
      {tab==='profile' && <DashProfile/>}
      {tab==='posts' && <DashPosts/>}
      {tab==='users' && <DashUsers/>}
      {tab==='comments' && <DashComments/>}
    </div>
  )
}