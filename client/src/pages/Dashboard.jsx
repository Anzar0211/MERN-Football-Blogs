import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
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
    </div>
  )
}