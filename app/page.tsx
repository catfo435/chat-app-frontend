"use client"
import React, { useEffect, useState } from 'react'
import UserPane from './components/UserPane'
import Divider from './components/Divider'
import TextPane from './components/TextPane'
import { useSearchParams } from 'next/navigation'
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_APIURL!,{autoConnect : false})

type Message = {
  message : string,
  sender : string,
  receiver : string
}

export default function Page() {

  const [messages,setMessages] = useState<Array<Message>>([])
  const [messageVal,setMessageVal] = useState("")
  const [loginState,setLoginState] = useState(false)
  const [username,setUsername] = useState("")
  const [selectedUser,setSelectedUser] = useState("user2"); //change this later

  const params = useSearchParams()

  useEffect(() => {

    if (params.get('user') === null) {
      window.location.href = "/login"
      return;
    }
    else {
      setLoginState(true)
      setUsername(params.get('user')!)
      socket.auth = { username : params.get('user')! }
      socket.connect()
    }

    fetch(process.env.NEXT_PUBLIC_APIURL! + "/getmessages")
    .then((res) => (res.json())
    .then((data) => {
      setMessages(data.messages)
    })
    )

    socket.on("message", ({ message, sender, receiver }) => {
      //check if sender is active, or put unread messages
      //track dms active with an array

      setMessages(messages => (
        messages = [...messages,{message,sender,receiver}]
      ))

    });
  },[])

  function handleSendMessage(){
    socket.emit("message",{message:messageVal,sender:username,receiver:selectedUser})
    setMessages(messages => (
      messages = [...messages,{message:messageVal,sender:username,receiver:selectedUser}]
    ))
    setMessageVal("")
  }

  return (
    <div>
      {loginState?<div className='content flex w-screen h-screen'>
      <div className='navBar flex bg-sky-600 h-full w-20'>
      </div>
      <div className='userList relative flex flex-col items-center bg-slate-300 h-full w-[400px]'>
        <div className='searchBarContainer flex justify-center items-center bg-[#BCC7D6] w-full h-20 mb-5'>
          <input className='searchBar flex h-1/2 w-[90%] rounded-xl px-4' placeholder='🔍  Search'></input>
        </div>
        <div className='userContainer flex flex-col w-full grow overflow-scroll'>
          <UserPane active username={"User2"} lastMessage="last message" />
          {/* change later, fetch from backend */}
        </div>
        <button className='addUserButton absolute right-4 bottom-4 bg-sky-500 w-16 h-16 text-3xl rounded-full'>+</button>
      </div>
      <div className='textArea flex flex-col bg-slate-200 h-full grow'>
        <div className='userInfoHeaderContainer flex flex-col w-full h-20'>
        <div className='userInfoHeader flex flex-col w-full h-20 p-2 pl-10'>
          <div className='flex font-bold text-3xl mb-1'>Username</div>
          <div className='flex text-slate-500 mb-2'>Last texted at 03:00</div>
        </div>
        <Divider/>
        </div>
        <div className='textHistory flex flex-col justify-end items-center w-full h-[800px] overflow-y-scroll p-10'>
          {messages.map((message) => (
            <div className={`textMessage flex w-full h-12 ${(message.receiver === username)?"justify-start":"justify-end"} mb-2`}>
              <TextPane sent={message.receiver !== username} message={message["message"]} timestamp='03:00'/>
            </div>
          ))}
        </div>
        <Divider/>
        <div className='textInputField flex justify-start items-center h-20 ml-10'>
          <input className='searchBar flex bg-slate-200 h-[92%] w-[85%] rounded-lg px-4 focus:outline-none' value={messageVal} onChange={(e) => {setMessageVal(e.target.value)}} placeholder='Send a message'></input>
          <button className='sendButton flex justify-center items-center bg-sky-500 w-36 h-12 rounded-lg' onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>:""}
    </div>
  )
}
