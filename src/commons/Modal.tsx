import './Modal.css'
import React, { useState } from 'react'
import logo from '../assets/logos/Logo-LVDL.png'

interface ModalProps {
    modalState: boolean;
    show: (value: boolean) => void;
    postUser: (nick: string, password: string) => void
  }
  
  
  const Modal: React.FC<ModalProps> = ({ modalState, show, postUser }) => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    return(
        <>
        {modalState &&
            <div className='overlay'>
                <div className='container'>
                    <button className='modal-close' onClick={(e) => {
                        e.preventDefault()
                        show(!modalState)}}
                    >X</button>
                    <h2>Bienvenid@ a</h2>
                    <img className='modal-logo' src={logo} />
                    <form className='modal-form' onSubmit={() => {
                        postUser(user,pass)
                    }}>     
                        <input className='modal-input' onChange={(e) => {
                            e.preventDefault()
                            setUser(e.target.value)
                        }} placeholder='Usuario'/>
                        <input className='modal-input' type='password' onChange={(e) =>{ 
                            e.preventDefault()
                            setPass(e.target.value)
                        }} placeholder='Contraseña'/>
                        <button className='modal-button' type='submit'>Crear</button>
                    </form>
                </div>
            </div>
        }
        </>
    )
}

export default Modal;