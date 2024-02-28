"use client"
import React, { MouseEventHandler, useEffect, useState } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

export default function Page() {

  const signIn = useSignIn()

  function handleSignIn(){

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
    .then((res) => (res.json()).then((data) => {
      switch(res.status){
        case 200:
          if(signIn({
            auth : {
              token : data.token
            },
            userState : {
              username : username
            }
          })){
            window.location.href = "/"
          }
          else{
            alert("Something went wrong. Couldn't sign in")
          }
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
    }))
    .catch((e) => {
      alert("Something went wrong")
      console.error(e)
    })
  }

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [rePassword,setRePassword] = useState("")
  const [signUpState, setSignUp] = useState(false)

  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated()){
      window.location.replace("/")
    }
  },[])

  return (
    <div className='loginPage flex w-screen h-screen'>
        <div className='flex justify-center items-center w-1/3 h-full'>
            <div className='signInUpPane flex flex-col items-center w-[400px] h-[500px]'>
                <div className='text-5xl'>{signUpState?"Sign Up":"Sign In"}</div>
                <form onSubmit={(e) => {e.preventDefault()}} className='flex flex-col items-center mt-5'>
                <input className='w-[300px] h-10 bg-slate-200 rounded-md mb-5 px-2' value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" id="username" name="username" placeholder='Username' required></input>
                <input className='w-[300px] h-10 bg-slate-200 rounded-md mb-5 px-2' value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" id="pwd" name="pwd" placeholder='Password' required></input>
                {signUpState?<input className='w-[300px] h-10 bg-slate-200 rounded-md mb-5 px-2' value={rePassword} onChange={(e) => {setRePassword(e.target.value)}} type="password" id="pwd" name="pwd" placeholder=' Repeat Password' required></input>:""}
                <button className='flex justify-center items-center bg-sky-500 w-36 h-12 rounded-lg mb-5' onClick={handleSignIn}>{signUpState?"Sign Up":"Sign In"}</button>
                </form>
                <button className='newUserBtn hover:underline' onClick={() => {setSignUp(!signUpState)}}>{signUpState?"Sign In?":"New User?"}</button>
            </div>
        </div>
        <div className='flex grow h-full bg-sky-600'>
        </div>
    </div>
  )
}