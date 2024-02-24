import React from 'react'
import Divider from './Divider'

type UserPaneProps = {
  active? : boolean
}

export default function UserPane({active = false}: UserPaneProps) {
  return (
    <div className='flex flex-col mb-5'>
      <div className='userPane flex h-20 w-full'>
        <div className='profilePicContainer flex justify-center h-full w-20'>
            <div className='flex justify-center items-center bg-[#BCC7D6] h-14 w-14 rounded-full'></div>
        </div>
        <div className='userDetails flex flex-col w-52'>
          <div className='flex font-bold'>Username</div>
          <div className='flex'>This is the last message</div>
        </div>
        <div className='lastMessageTime text-slate-500 w-20 text-right'>
          03:00
        </div>
        <div className='flex grow justify-end items-center'>
        {active?<div className='activePaneTriangle w-0 h-0 border-r-[30px] border-r-slate-200 border-y-[15px] border-y-transparent border-solid'></div>:""}
        </div>
      </div>
      <Divider/>
    </div>
  )
}
