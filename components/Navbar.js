'use client'

import Link from "next/link"
import { useContext } from "react"
import { UserContext } from "@/app/userProvider"
import { useRouter } from "next/navigation";

export default function Navbar(){
  const user = useContext(UserContext)
  const router = useRouter();
  const handleLogout=()=>{
    user.setUser({
      name:null,
      isLoggedIn:false
    })

    router.push("/")
  }

  return (
    <nav className="w-full flex justify-center items-center py-2 bg-green-300">
      <ul className=" flex items-center gap-5 cursor-pointer">
        <Link href={"/"}><li className=" hover:bg-indigo-700  px-2 py-1 rounded-md">Blogs</li></Link>
        

        {
          user.user.isLoggedIn ?
          <>
          <Link href={"/newblog"}><li className=" hover:bg-indigo-700 px-2 py-1 rounded-md">Add New Blog</li></Link>
          <li className=" hover:bg-indigo-700 px-2 py-1 rounded-md" onClick={handleLogout}>Logout</li>
          <li className=" ml-28">Hello, {user.user.name}</li>
          </>
          :
          <Link href={"/login"}><li className=" hover:bg-indigo-700 px-2 py-1 rounded-md">Login</li></Link>
        }
        
      
      </ul>
    </nav>
  )
}