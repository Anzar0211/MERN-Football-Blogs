import { Button, Select, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
    const[sidebarData,setSidebarData]=useState({
        searchTerm:'',
        sort:'desc',
        category:'uncategorized'
    })
    const[posts,setPosts]=useState([]);
    const[loading,setLoading] = useState(false)
    const[showMore, setShowMore] = useState(false)
    const location=useLocation();
    const navigate=useNavigate()
    console.log(sidebarData);
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search);
        const searchTermFromUrl=urlParams.get("searchTerm");
        const sortFromUrl=urlParams.get('sort')
        const categoryFromUrl=urlParams.get('category');
        if(searchTermFromUrl ||sortFromUrl || categoryFromUrl){
            setSidebarData({
                ...sidebarData,
                searchTerm:searchTermFromUrl,
                sort:sortFromUrl,
                category:categoryFromUrl
            })
        }
        const fetchPosts=async()=>{
            setLoading(true)
            const searchQuery=urlParams.toString();
            const res=await fetch(`http://localhost:3000/api/post/getposts?${searchQuery}`)
            if(!res.ok){
                setLoading(false);
                return;
            }
            else{
                const data=await res.json();
                setPosts(data.posts);
                setLoading(false);
                if(data.posts.length===9){
                    setShowMore(true)
                }
                else{
                    setShowMore(false);
                }
            }
        }

        fetchPosts()
    },[location.search])
    const handleChange=async(e)=>{
        if(e.target.id==='searchTerm'){
            setSidebarData({...sidebarData,searchTerm: e.target.value})
        }
        if(e.target.id==='sort'){
            const order=e.target.value || 'desc';
            setSidebarData({...sidebarData,sort:order});
        }
        if(e.target.id==='category'){
            const category=e.target.value || 'uncategorized';
            setSidebarData({...sidebarData,category:category});
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const urlParams=new  URLSearchParams(location.search);
        urlParams.set('searchTerm',sidebarData.searchTerm);
        urlParams.set('sort',sidebarData.sort);
        urlParams.set('category',sidebarData.category);
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }  
    const handleShowMore=async()=>{
        const numberOfPosts=posts.length;
        const startIndex=numberOfPosts;
        const urlParams= new URLSearchParams(location.search);
        urlParams.set('startIndex',startIndex);
        const searchQuery=urlParams.toString();
        const res=await fetch(`http://localhost:3000/api/post/getposts?${searchQuery}`)
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data=await res.json();
            setPosts([...posts,...data.posts]);
            if(data.posts.length===9){
                setShowMore(true)
            }
            else{
                setShowMore(false)
            }
        }
    }
    
  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7  border-b md:border-r md:min-h-screen border-gray-500 ">
            <form action="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 mb-5">
                    <label className="whitespace-nowrap font-semibold">Search Term:</label>
                    <TextInput placeholder="Search..." id="searchTerm" type="text" value={sidebarData.searchTerm}  onChange={handleChange}/>
                </div>
                <div className="flex items-center gap-2 mb-5">
                    <label className="font-semibold">Sort:</label>
                    <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                        <option value='desc'>Latest</option>
                        <option value='asc'>Oldest</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2 mb-5">
                    <label className="font-semibold">Category:</label>
                    <Select onChange={handleChange} value={sidebarData.category} id='category'>
                        {/* 
                        <option value='international news'>International News</option>
                        <option value='club news'>Club News</option> */}
                        <option value='uncategorized'>Uncategorized</option>
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
                <Button type="submit" outline gradientDuoTone='greenToBlue'>
                    Apply Filters
                </Button>
            </form>
            <Button className="mt-5" outline gradientDuoTone='greenToBlue'>
                <Link to={`/search`}>
                        Reset
                </Link>
            </Button>
            
        </div>
        <div className="w-full">
            <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">Search Results:</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {
                    !loading && posts.length===0 && (
                        <p className="text-xl text-gray-500">No Posts Found</p>
                    )
                }
                {
                    loading && (
                        <p className="text-xl text-gray-500">Loading...</p>
                    )
                }
                {
                    !loading && posts && posts.map(post=>(
                        <PostCard key={post._id} post={post} />
                    ))
                }
                {
                    showMore && 
                    <button className="text-teal-500 text-lg hover:underline p-7 w-full" onClick={handleShowMore}>
                        Show More
                    </button>
                }
            </div>
        </div>

    </div>
  )
}