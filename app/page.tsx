"use client"
import React, { useEffect, useState } from 'react'
import UserPane from './components/UserPane'
import Divider from './components/Divider'
import TextPane from './components/TextPane'
import { io } from "socket.io-client";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import AddUserModal from './components/AddUserModal'

type Message = {
  message : string,
  sender : string,
  receiver : string
}

type User = {
  username : string
}

const socket= io(process.env.NEXT_PUBLIC_APIURL!,{autoConnect : false})

export default function Page() {

  const [messages,setMessages] = useState<Array<Message>>([])
  const [lastMessage, setLastMessage] = useState("...")
  const [messageVal,setMessageVal] = useState("")
  const [loginState,setLoginState] = useState(false)
  const [username,setUsername] = useState("")
  const [selectedUser,setSelectedUser] = useState("") //change this later

  const [openModal, setOpenModal] = useState(false)

  const isAuthenticated = useIsAuthenticated()
  const authHeader = useAuthHeader();
  const headers =  {
    authorization: authHeader!
  }
  const user = useAuthUser<User>()
  const signOut = useSignOut()

  useEffect(() => {

    if (!isAuthenticated()) {
      window.location.replace("/login")
      return;
    }
    else {

      setLoginState(true)
      setUsername(user!.username)
      setSelectedUser(user!.username === "user1"?"user2":"user1")
      socket.auth = {token : headers.authorization}
      socket.connect()
    }

    fetchMessageHistory()
  },[])

  useEffect(() => {
    fetchMessageHistory()
  },[selectedUser])

  function fetchMessageHistory(){
    fetch(process.env.NEXT_PUBLIC_APIURL! + "/messages",{headers}
    )
    .then((res) => {

      if (res.status === 403) {
        alert("Authorization Failure")
        signOut()
        window.location.replace("/")
      }

      res.json()
      .then((data) => {
        setMessages(data.messages)
        const lastMessageData : Message = data.messages[data.messages.length-1]
        setLastMessage(`${(lastMessageData.sender === username)?"You":lastMessageData.sender} : ${lastMessageData.message}`)
      })
    }
    )
  }


  socket.on("message", ({ message, sender, receiver }) => {
    //check if sender is active, or put unread messages
    //track dms active with an array
    
    setMessages([...messages,{message,sender,receiver}])

  });

  function handleSendMessage(){
    socket.emit("message",{message:messageVal,sender:username,receiver:selectedUser})
    setMessages([...messages,{message:messageVal,sender:username,receiver:selectedUser}])
    setMessageVal("")
  }

  function handleLogout(){
    socket.disconnect()
    signOut()
    window.location.href = "/login"
  }

  return (
    <div>
      {loginState?<div className='content flex w-screen h-screen'>
      <AddUserModal openModal={openModal} setOpenModal={setOpenModal} setUser={setSelectedUser} />
      <div className='navBar relative flex bg-sky-600 h-full w-20'>
        <div className='logoutBtnContainer absolute flex justify-center w-full h-10 bottom-3'>
          <button className='logoutBtn bg-red-600 w-3/4 h-full rounded-lg' onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className='userList relative flex flex-col items-center bg-slate-300 h-full w-[400px]'>
        <div className='searchBarContainer flex justify-center items-center bg-[#BCC7D6] w-full h-20 mb-5'>
          <input className='searchBar flex h-1/2 w-[90%] rounded-xl px-4' placeholder='🔍  Search'></input>
        </div>
        <div className='userContainer flex flex-col w-full grow overflow-scroll'>
          <UserPane active username={selectedUser} lastMessage={lastMessage}/>
          {/* change later, fetch from backend */}
        </div>
        <button onClick={() => setOpenModal(true)} className='addUserButton absolute right-4 bottom-4 bg-sky-500 w-16 h-16 text-3xl rounded-full'>+</button>
      </div>
      <div className='textArea flex flex-col bg-slate-200 h-full grow'>
        <div className='userInfoHeaderContainer flex flex-col w-full h-20'>
        <div className='userInfoHeader flex flex-col w-full h-20 p-2 pl-10'>
          <div className='flex font-bold text-3xl mb-1'>{selectedUser}</div>
          <div className='flex text-slate-500 mb-2'>Last texted at 03:00</div>
        </div>
        <Divider/>
        </div>
        <div className='textHistory flex flex-col justify-end items-center w-full h-[800px] overflow-y-scroll p-10'>
          {messages.map((message,index) => (
            <div key={index} className={`textMessage flex w-full h-12 ${(message.receiver === username)?"justify-start":"justify-end"} mb-2`}>
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
    </div>:null}
    </div>
  )
}
