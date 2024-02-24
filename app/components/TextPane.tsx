import React from 'react'

type TextPaneProps = {
    message : string
    timestamp : string
    sent : boolean
}

export default function TextPane(props : TextPaneProps) {
  return (
    <div className={`messagePane flex justify-center items-center ${props.sent?"bg-sky-500":"bg-white"} w-fit h-12 px-4 rounded-lg`}>{props.message}</div>
  )
}
