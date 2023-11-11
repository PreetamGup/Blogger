"use client"
import Link from "next/link";

import { useEffect, useState } from "react"
import axios from "axios";

export default function Home() {
  const [allBlog, setAllBlog]= useState([]);

  async function fetching (){
    
    try {
      const response = await axios.get("/api/blogs");

      if(response.data.success){
        setAllBlog(response.data.allBlog)
      }
    } catch (error) {
      console.warn(response.data.message)
    }
  }

  useEffect(()=>{
    fetching()
  },[])

  return (
    <main className="flex min-h-screen gap-10 p-10 w-[70%] m-auto bg-red-400 flex-wrap "> 
      {
        allBlog?.map((blog)=>(
          <Link href={`/blog/${blog._id}`} key={blog._id}>
            <div  className=" w-72 h-[350px] border-4 border-black p-4 rounded-lg cursor-pointer hover:border-fuchsia-700 hover:border-4">
              <h1 className=" text-3xl font-bold">{blog.title.slice(0,40)}</h1>
              <p>{blog.description.split(" ").splice(0,25).join(" ")}...</p>
              <p className="mt-1 font-semibold" ><span className="">Date:- {blog.createdAt.split("T")[0].split("-").reverse().join("-")}</span> <br/> <span className="">By:- {blog.createdBy}</span></p>
            </div>
          </Link>
        ))
      }


    </main>
  )
}
