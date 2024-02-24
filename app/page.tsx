"use client"
import React, { useEffect, useState } from 'react'
import UserPane from './components/UserPane'
import Divider from './components/Divider'

// const socket = new WebSocket(process.env.NEXT_PUBLIC_APIURL!)

export default function Page() {

  const [messages,setMessages] = useState<Array<any>>([])
  const [messageVal,setMessageVal] = useState("")

  // useEffect(() => {
  //   socket.onmessage = ({data}) => {
  //   setMessages(messages => {
  //     messages=[...messages,data]
  //     return messages
  //   })
  //   }
  // },[])

  function handleSendMessage(){
    socket.send(messageVal)
    setMessageVal("")
  }

  return (
    <div className='content flex w-screen h-screen'>
      {/* <div className='flex flex-col justify-center items-center w-2/3 h-[600px] border-2 border-blue-500 rounded-lg'>
        <div className='chatWindow flex flex-col w-full h-2/3 bg-slate-400'>
          {messages.map((message,index) => (<div key={index}>{message}</div>))}
        </div>
        <div className='messageBar flex flex-col items-center w-full h-1/3'>
          <input className='messageInput w-full bg-gray-200 h-1/2 p-2 mb-4' value={messageVal} onChange={(e) => {setMessageVal(e.target.value)}} placeholder='Enter a message'>
          </input>
          <button className='sendButton bg-gray-400 w-20 h-10' onClick={handleSendMessage}>Send</button>
        </div>
      </div> */}
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
        <Divider percentageWidth={95} />
        </div>
        <div className='textHistory flex w-full grow'>
        </div>
        <Divider percentageWidth={95} />
        <div className='textInputField flex justify-start items-center h-20 ml-10'>
          <input className='searchBar flex bg-slate-200 h-[92%] w-[85%] rounded-lg px-4 focus:outline-none' placeholder='Send a message'></input>
          <button className='sendButton flex justify-center items-center bg-sky-500 w-36 h-12 rounded-lg'>Send</button>
        </div>
      </div>
    </div>
  )
}
