import {Sidebar} from 'flowbite-react'
import { useState,useEffect } from 'react';
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import  { useDispatch } from 'react-redux'

export default function DashSidebar() {
    const location = useLocation();
    const dispatch=useDispatch();
    const[tab,setTab]=useState('');
    useEffect(()=>{
        const urlParam=new URLSearchParams(location.search);
        const tabFromUrl=urlParam.get("tab");
        if(tabFromUrl) setTab(tabFromUrl);
    },[location.search])
const handleSignout=async(req,res,next)=>{
        try{
            const res=await  fetch('http://localhost:3000/api/user/signout',{
                method:"POST",
                credentials:'include'
            });
            const data=await res.json();
            if(!res.ok){
                console.log(data.message);
            }
            else{
                dispatch(signoutSuccess());
                
            }
        }
        catch(e){
            console.log(e.message);
        }
    }
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
                        Profile
                    </Sidebar.Item>
                    <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
                </Link>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}