import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import toast from 'react-hot-toast'

export default function Create()
{
    const navigate = useNavigate();
    const url = 'http://localhost:4000/api/v1'
    const[formData,setFormData] = useState({
        name:'',
        title:'',
        description:''
    });

    function handleChange(e)
    {
        const{name,value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    async function createBlog()
    {
        try{
            const response = await fetch(`${url}/create`,{
                method:"POST",
                headers:{
                    'Content-type':'Application/json'
                },

                body:JSON.stringify(formData)
            });

            const data = await response.json();

            if(data.success)
            {
                navigate('/blogs');
                toast.success('Blog published successfully');
            }

            else {
                if (data.error === 'DUPLICATE_KEY') {
                    toast.error('A blog with similar details already exists. Please provide different details.');
                } else {
                    toast.error('An error occurred while publishing the blog. Please try again later.');
                }
            }

        }catch(error){
            console.error(error);
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        createBlog();
    }
    return(
        <div className="w-full">
            <div className="max-w-[1080px] w-11/12 mx-auto pt-16">
            <h1 className="text-3xl font-bold mb-8 text-center" style={{color:"#401F71"}}>Create a post</h1>
               <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-y-7">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name" className="text-xl font-bold" style={{color:"#401F71"}}>Add a name</label>
                        <input type='text' className="border-2 py-2 px-4 rounded-md" name='name' value={formData.name} onChange={handleChange} autoComplete='off' style={{backgroundColor : "#FFE6E6"}}></input>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="title" className="text-xl font-bold" style={{color:"#401F71"}} >Add a title</label>
                        <input type='text' className="border-2 py-2 px-4 rounded-md" name='title' value={formData.title} onChange={handleChange} autoComplete='off' style={{backgroundColor : "#FFE6E6"}}></input>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="description" className="text-xl font-bold" style={{color:"#401F71"}}>Add a description</label>
                        <textarea className="border-2 py-2 px-4 rounded-md" name='description' rows={6} value={formData.description} onChange={handleChange} autoComplete='off' style={{backgroundColor : "#FFE6E6"}}></textarea>
                    </div>

                    <button className="bg-blue-500 text-white py-2 px-5 rounded-md text-lg font-bold tracking-wide button text" style={{color:"#240A34"}}>Publish</button>
                </div>
               </form>
            </div>
        </div>
    )
}