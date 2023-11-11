'use client';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../userProvider";


 const Login = () => {
  const user = useContext(UserContext)
  const router = useRouter();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const LoginDetail ={
      username: e.target[0].value,
      password: e.target[1].value
    }
    

    try {

      const response = await axios.post("/api/login",LoginDetail);

      if(response.data.success){
        alert(response.data.message)
        user.setUser({name:response.data.user , isLoggedIn: true});
        router.push("/")
        
      }
      else{
        alert(response.data.message)
      }

      
    } catch (error) {
      console.log(error.message)
    }


  }

  return (
    <div className="w-full flex justify-center items-center h-[60vh]">
        <form onSubmit={handleSubmit} className=" border p-4 rounded-lg bg-orange-300">
            <h2 className="text-xl text-center font-semibold mb-4">Login</h2>
            <label htmlFor="username"> <span>UserName :-</span> <br />
              <input type="text" id="username" required placeholder="UserName" className="px-2 py-1 mb-2 text-black" />
            </label>
              <br />
            <label htmlFor="password"> <span>Password :-</span> <br />
              <input type="password" required placeholder="Password" className="px-2 py-1 mb-2 text-black" />
            </label>
              <br />

              <button className=" bg-slate-400 p-1 rounded-sm w-full mt-2 hover:bg-blue-700" >Login</button>
              <br />
              <Link href={"/register"}><button className=" bg-slate-400 p-1 rounded-sm w-full mt-2 hover:bg-blue-700" >Register</button></Link>
        </form>
    </div>
  )
}

export default Login
