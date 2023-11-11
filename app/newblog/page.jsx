'use client'

import { useState, useContext } from 'react';
import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../userProvider';
import { useRouter } from 'next/navigation';
import ImageResize from "quill-image-resize-module-react";
import axios from 'axios';

Quill.register("modules/imageResize", ImageResize);

const AddNewBlog = () => {
  const [content, setContent] = useState('');
  const user = useContext(UserContext)
  const router= useRouter();


  const module = {
    toolbar: [
      [{ 'header': [1, 2, 3,4, false] }, {font:[]}],
      [{ size: [] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{'align':'center'},{'align':'right'},{'align':'justify'} ],
      ['link', 'image', 'video'],
      ['clean']
    ],

    clipboard: {
      matchVisual: false
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"]
    }
  }

 const format = [
    'header',"font","size",
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align','center',
    'link', 'image','video',
  ]

  
  const handleSubmit=async(e)=>{
    e.preventDefault();

    const blogContent ={
      title:e.target[0].value,
      description:e.target[1].value,
      content,
      createdBy:user.user.name
    }

    try {
      const response = await axios.post("/api/blogs", blogContent);
    
      if(response.data.success){
        alert(response.data.message)
      }else{
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  if(!user.user.isLoggedIn){
   return router.push("/")
  }


  return (
    <div className='w-[90%] m-auto mt-10'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="blogTitle">Blog Title: - 
          <input type="text" required className='border mb-3 mx-2 px-1'/>
        </label>
          <br />
        <label htmlFor="blogDescription">Description: - <br />
          <textarea name="blogDescription" id="blogDescription" cols="50" rows="5" className='border mb-3 px-1'></textarea>
        </label>
        <div>
          <button className=' float-right bg-white rounded-sm px-2 mt-2 mr-2'>Publish</button>
          <ReactQuill  value={content} onChange={setContent} modules={module} formats={format} />
        </div>

      </form>
     
    </div>
  )
}

export default AddNewBlog