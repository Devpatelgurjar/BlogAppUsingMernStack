import React, { useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import { useState } from 'react'
import axios from 'axios'
const Blog = () => {

  const [blogs, setBlogs] = useState([]);
  const getUserBlogs = async () => {
    try {
      const item = localStorage.getItem("userid");
      const id = JSON.stringify(item); // this method adds "" around the id so causing error in url
      console.log(id);
      const response = await axios.get(`/api/v1/blog/user-blog/${item}`);
      console.log(response.data);
      setBlogs(response.data.userBlog.blog); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      <h1>MyBlog</h1>
      {blogs && blogs.map((blog) => <BlogCard 
        title={blog.title}
        isUser={true}
        description={blog.description}
        image={blog.images}
        username={blog.user.username}
        key={blog._id}
        id={blog._id}
        time={blog.createdAt}
      />)}
    </div>
  )
}

export default Blog


