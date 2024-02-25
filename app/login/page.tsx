"use client"
import React, { FormEvent, useState } from 'react'

export default function Page() {

  function handleSignIn(e:FormEvent){
    e.preventDefault()
    const reqBody = {
      username : username,
      password : password
    }
    fetch(process.env.NEXT_PUBLIC_APIURL! + "/authenticate",{
      method : "post",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(reqBody)
    })
    .then((res) => {
      switch(res.status){
        case 401:
          alert("Incorrect Credentials")
          break;
        case 200:
          alert("Succesful Login!")
          break;
        default:
          alert("Something went wrong. Please try again.")
      }
    })
    .catch(console.error)
  }

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  return (
    <div className='loginPage flex w-screen h-screen'>
        <div className='flex justify-center items-center w-1/3 h-full'>
            <div className='signInPane flex flex-col items-center w-[400px] h-[500px]'>
                <div className='text-5xl'>Sign In</div>
                <form onSubmit={handleSignIn} className='flex flex-col items-center mt-5'>
                <input className='w-[300px] h-10 bg-slate-200 rounded-md mb-5 px-2' value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" id="username" name="username" placeholder='Username' required></input>
                <input className='w-[300px] h-10 bg-slate-200 rounded-md mb-5 px-2' value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" id="pwd" name="pwd" placeholder='Password'></input>
                <button className='flex justify-center items-center bg-sky-500 w-36 h-12 rounded-lg'>Sign In</button>
                </form>
            </div>
        </div>
        <div className='flex grow h-full bg-sky-600'>
        </div>
    </div>
  )
}