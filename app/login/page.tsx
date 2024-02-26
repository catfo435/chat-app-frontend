"use client"
import React, { FormEvent, useState } from 'react'

export default function Page() {

  function handleSignIn(e:FormEvent){
    e.preventDefault()

    if (signUpState && password !== rePassword){
      alert("Password's dont match")
      return
    }

    const reqBody = {
      username : username,
      password : password
    }

    const requestURL = signUpState?(process.env.NEXT_PUBLIC_APIURL! + "/users"):(process.env.NEXT_PUBLIC_APIURL! + "/users/login")
    fetch(requestURL,{
      method : "post",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(reqBody)
    })
    .then((res) => {
      switch(res.status){
        case 200:
          window.location.href = `/?user=${username}&sessionToken=abcd`
          break
        case 401:
          alert("Incorrect Credentials")
          break
        case 403:
          alert("Username already exists!")
          break
        case 501:
          alert("Not Implemented Yet, use user1-abcd or user2-efgh")
          break
        default:
          alert("Something went wrong. Please try again.")
      }
    })
    .catch((e) => {
      alert("Something went wrong")
      console.error(e)
    })
  }

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [rePassword,setRePassword] = useState("")
  const [signUpState, setSignUp] = useState(false)

  return (
    <div className='loginPage flex w-screen h-screen'>
        <div className='flex justify-center items-center w-1/3 h-full'>
            <div className='signInUpPane flex flex-col items-center w-[400px] h-[500px]'>
                <div className='text-5xl'>{signUpState?"Sign Up":"Sign In"}</div>
                <form onSubmit={handleSignIn} className='flex flex-col items-center mt-5'>
                <input className='w-[300px] h-10 bg-slate-200 rounded-md mb-5 px-2' value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" id="username" name="username" placeholder='Username' required></input>
                <input className='w-[300px] h-10 bg-slate-200 rounded-md mb-5 px-2' value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" id="pwd" name="pwd" placeholder='Password' required></input>
                {signUpState?<input className='w-[300px] h-10 bg-slate-200 rounded-md mb-5 px-2' value={rePassword} onChange={(e) => {setRePassword(e.target.value)}} type="password" id="pwd" name="pwd" placeholder=' Repeat Password' required></input>:""}
                <button className='flex justify-center items-center bg-sky-500 w-36 h-12 rounded-lg mb-5'>{signUpState?"Sign Up":"Sign In"}</button>
                </form>
                <button className='newUserBtn hover:underline' onClick={() => {setSignUp(!signUpState)}}>{signUpState?"Sign In?":"New User?"}</button>
            </div>
        </div>
        <div className='flex grow h-full bg-sky-600'>
        </div>
    </div>
  )
}