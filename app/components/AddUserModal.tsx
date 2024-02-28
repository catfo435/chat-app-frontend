import { Modal } from 'flowbite-react'
import React, { useState } from 'react'

type AddUserModalProps = {
  openModal : boolean
  setOpenModal : Function
  setUser : Function
}

export default function AddUserModal({openModal, setOpenModal, setUser} : AddUserModalProps) {

  const [error,setError] = useState(false)
  const [findUser,setFindUser] = useState<string>()

  function onCloseModal() {
    setOpenModal(false);
  }

  function handleClick(){
    fetch(process.env.NEXT_PUBLIC_APIURL! + `/users/${findUser}`,)
    .then((res) => {
      if (res.status === 200){
        setUser(findUser)
        onCloseModal()
        return
      }
      else{
        setError(true)
      }
    })
  }

  return (
    <div>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header className='addUsermodalHeader bg-slate-300 rounded-t-lg'>New Conversation</Modal.Header>
        <Modal.Body className='addUsermodalHeader bg-slate-300 rounded-b-lg'>
          <div className='addNewUserContainer flex flex-col items-center'>
          <input className='userSearch flex h-10 w-[70%] rounded-xl px-4 my-4' placeholder='Enter a username' value={findUser} onChange={
            (e) => {
              setError(false)
              setFindUser(e.target.value)
            }
          }></input>
          <button className='Button flex justify-center items-center bg-sky-500 w-28 h-12 rounded-lg' onClick={handleClick}>Add User</button>
          {error?<span className='errorText text-red-700'>User not Found!</span>:null}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
