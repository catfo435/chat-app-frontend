"use client"
import React, { useEffect, useState } from 'react'
import UserPane from './components/UserPane'
import Divider from './components/Divider'
import TextPane from './components/TextPane'

const socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKETURL!)

export default function Page() {

  const [messages,setMessages] = useState<Array<any>>([])
  const [messageVal,setMessageVal] = useState("")
  const user = localStorage.getItem("user")

  useEffect(() => {
    socket.onmessage = ({data}) => {
    data = JSON.parse(data)
    setMessages(messages => {
      messages=[...messages,data]
      return messages
    })
    }
  },[])

  function handleSendMessage(){
    socket.send(JSON.stringify({message:messageVal,toUser:"user2"}))
    setMessageVal("")
  }

  return (
    <div className='content flex w-screen h-screen'>
      <div className='navBar flex bg-sky-700 h-full w-20'>
      </div>
      <div className='userList flex flex-col items-center bg-slate-300 h-full w-[400px]'>
        <div className='searchBarContainer flex justify-center items-center bg-[#BCC7D6] w-full h-20 mb-5'>
          <input className='searchBar flex h-1/2 w-[90%] rounded-xl px-4' placeholder='🔍  Search'></input>
        </div>
        <div className='userContainer flex flex-col w-full grow overflow-scroll'>
          <UserPane active />
          <UserPane />
          <UserPane /> 
          {/* change later, fetch from backend */}
        </div>
      </div>
      <div className='textArea flex flex-col bg-slate-200 h-full grow'>
        <div className='userInfoHeaderContainer flex flex-col w-full h-20'>
        <div className='userInfoHeader flex flex-col w-full h-20 p-2 pl-10'>
          <div className='flex font-bold text-3xl mb-1'>Username</div>
          <div className='flex text-slate-500 mb-2'>Last texted at 03:00</div>
        </div>
        <Divider/>
        </div>
        <div className='textHistory flex flex-col justify-end items-center w-full grow p-10'>
          {messages.map((message) => (
            <div className={`textMessage flex w-full h-12 ${(message["toUser"] === user)?"justify-start":"justify-end"} mb-2`}>
              <TextPane sent={message["toUser"] !== user} message={message["message"]} timestamp='03:00'/>
            </div>
          ))}
        </div>
        <Divider/>
        <div className='textInputField flex justify-start items-center h-20 ml-10'>
          <input className='searchBar flex bg-slate-200 h-[92%] w-[85%] rounded-lg px-4 focus:outline-none' value={messageVal} onChange={(e) => {setMessageVal(e.target.value)}} placeholder='Send a message'></input>
          <button className='sendButton flex justify-center items-center bg-sky-500 w-36 h-12 rounded-lg' onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}
