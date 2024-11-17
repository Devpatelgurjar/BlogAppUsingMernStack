import { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Blog from './Pages/Blog'
import Login from './Pages/Login'
import Register from './Pages/Register'
import MyBlogs from './Pages/MyBlogs'
import CreateBlog from './Pages/CreateBlog'
import EditBlog from './Pages/Edit-blog'

function App() {
  return (
      <>
        <Header/>
       <Routes>
        <Route path='/' element={<Blog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/blogs' element={<Blog/>}/>
        <Route path='/my-blogs' element={<MyBlogs/>}/>
        <Route path='/create-blog' element={<CreateBlog/>}/>
        <Route path='/edit-blog/:id' element={<EditBlog/>}/>
      </Routes>
      </>
  )
}

export default App
