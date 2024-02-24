import React from 'react'

type TextPaneProps = {
    message : string
    timestamp : string
}

export default function TextPane(props : TextPaneProps) {
  return (
    <div className='messagePane flex justify-center items-center bg-sky-500 w-fit h-12 px-4 rounded-lg mb-2'>{props.message}</div>
  )
}
