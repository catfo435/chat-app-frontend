"use client"
import React, { useEffect, useState } from 'react'

const socket = new WebSocket("ws://localhost:5000")

export default function Page() {

  const [messages,setMessages] = useState<Array<any>>([])
  const [messageVal,setMessageVal] = useState("")

  useEffect(() => {
    socket.onmessage = ({data}) => {
    console.log(data)
    setMessages(messages => {
      messages=[...messages,data]
      return messages
    })
    }
  },[])

  function handleSendMessage(){
    socket.send(messageVal)
    setMessageVal("")
  }

  return (
    <div className='content flex justify-center items-center w-screen h-screen'>
      <div className='flex flex-col justify-center items-center w-2/3 h-[600px] border-2 border-blue-500 rounded-lg'>
        <div className='chatWindow flex flex-col w-full h-2/3 bg-slate-400'>
          {messages.map((message,index) => (<div key={index}>{message}</div>))}
        </div>
        <div className='messageBar flex flex-col items-center w-full h-1/3'>
          <input className='messageInput w-full bg-gray-200 h-1/2 p-2 mb-4' value={messageVal} onChange={(e) => {setMessageVal(e.target.value)}} placeholder='Enter a message'>
          </input>
          <button className='sendButton bg-gray-400 w-20 h-10' onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}
