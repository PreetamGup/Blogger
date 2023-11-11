'use client'

import axios from "axios"
import { useEffect, useState } from "react"


 const page = ({params})=> {
  const [blog, setBlog]= useState("")
  const [comments, setComments]= useState([])
  const [newComment, setNewComment]= useState("");

  async function handleComment(e){

    try {
      const res = await axios.post(`/api/blogs/comments/${params.id}`, {comment:newComment});
      if(res.data.success){
        alert(res.data.message)
        setNewComment("")
        getData();
      }
      else{
        console.warn(res.data.message)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }


  async function getData() {
    
    try {
      const res = await axios.get(`/api/blogs/comments/${params.id}`);
      if(res.data.success){
        setBlog(res.data.Blog)
        setComments(res.data.allComment)
      }
      
    } catch (error) {
      console.warn(error.message)
    }
   
  }

  useEffect(() => {
  getData();
    
  }, [])
  
  

  return (
    <div className="w-[80%] m-auto pt-5">
      <div dangerouslySetInnerHTML={{__html: blog.content}}>

      </div>

      <div className=" mt-10">

        <div>
          <textarea className="p-2" cols={60} rows={3} value={newComment} onChange={(e)=>setNewComment(e.target.value)}></textarea><br></br>
          <button onClick={handleComment} className="bg-white rounded-sm px-2 py-1 cursor-pointer hover:bg-blue-600 hover:text-white">Comment</button>
        </div>

        <div className=" mb-10">
          {
            comments?.map((comment)=>(
              <div className="my-2 w-[50%] bg-slate-200">
                <p className="p-2">{comment.comment} <span className=" float-right">{comment.createdAt.split("T")[0].split("-").reverse().join("-")}</span></p>
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default page
