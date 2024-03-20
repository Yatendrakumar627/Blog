import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCreate } from "react-icons/io5";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const url = 'http://localhost:4000/api/v1';
    const navigate = useNavigate();

    async function fetchBlogs() {
        try {
            const response = await fetch(`${url}/show`, {
                method: 'GET',
                headers: {
                    'Content-type': 'Application/json'
                }
            });
            const result = await response.json();
            setBlogs(result.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    async function handleDeleteBlog(id) {
        try {
            await fetch(`${url}/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'Application/json'
                }
            });
            // Refresh blogs after deletion
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    }

    return (
        <div className="w-full">
            <div className="max-w-[1080px] w-11/12 mx-auto pt-14 pb-7">
                <div className="w-full flex justify-between items-center">
                    <h1 className="font-bold text-3xl tracking-wide" style={{ color: "#240A34" }}>Your Blogs</h1>
                    <button className="bg-blue-500 text-white py-3 px-4 rounded-md font-bold flex items-center justify-between gap-x-3 button" onClick={() => navigate('/create-blog')}><span>Create a Blog</span><span><IoCreate /></span></button>
                </div>
                <div className="flex flex-col gap-6 mt-[3rem]">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="max-w-[500px] w-11/12">
                            <p className="font-bold text-[14px]" style={{ color: "#240A34" }}>{blog.name}</p>
                            <p className="font-bold text-xl mt-1" style={{ color: "#240A34" }}>{blog.title}</p>
                            <p className="text-gray-500 mt-1" style={{ color: "#F7418F" }}>{blog.description}</p>
                            <p className="mt-4 text-[14px] text-gray-500">{blog.publishedAt}</p>
                            <button onClick={() => handleDeleteBlog(blog.id)} className="bg-red-500 text-white py-2 px-4 rounded-md font-bold mt-2">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
