"use client"
import React, { useEffect, useState } from 'react'

export default function Page() {

  const [users,setUsers] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:5000/users").then(
      res => res.json().then(
        data => {
          console.log(data);
          
          setUsers(data.users)
        }
      )
    )
  },[])

  return (
    <div className='content flex justify-center items-center w-screen h-screen'>
      <div className='flex flex-col justify-center items-center w-2/3 h-[600px] border-2 border-blue-500 rounded-lg'>
        <div className='chatWindow flex w-full h-2/3 bg-slate-400'>

        </div>
        <div className='messageBar flex flex-col items-center w-full h-1/3'>
          <input className='messageInput w-full bg-gray-200 h-1/2 p-2 mb-4' placeholder='Enter a message'>
          </input>
          <button className='sendButton bg-gray-400 w-20 h-10'>Send</button>
        </div>
      </div>
    </div>
  )
}
