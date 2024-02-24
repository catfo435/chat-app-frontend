import React from 'react'

type DividerProps = {
    percentageWidth : number
}

export default function Divider({percentageWidth} : DividerProps) {
  return (
    <div className='flex justify-center items-center h-1 w-full'>
      <div className={`userPanediver flex bg-slate-400 opacity-45 h-0.5 w-[${percentageWidth}%] rounded-lg`}></div>
    </div>
  )
}
