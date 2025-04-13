import './Modal.css'
import React, { useState } from 'react'
import logo from '../assets/logos/Logo-LVDL.png'

interface ModalProps {
    modalState: boolean;
    crear: boolean;
    show: (value: boolean) => void;
    postModal: (provName: string) => void
    putModal: (provName: string, newProvName: string) => void
  }
  
  
  const CreateModal: React.FC<ModalProps> = ({ modalState, crear, show, postModal: postProv, putModal: putProv }) => {
    const [provName, setProv] = useState('')
    const [newProvName, setNewProv] = useState('')
    return(
        <>
        {modalState &&
            <div className='overlay'>
                <div className='container'>
                    <button className='modal-close' onClick={(e) => {
                        e.preventDefault()
                        show(!modalState)}}
                    >X</button>
                    <h2>{crear ? 'Crea' : 'Edita la información' }</h2>
                    <img className='modal-logo' src={logo} />
                    <form className='modal-form' onSubmit={(e) => {
                        e.preventDefault()
                        show(!modalState)
                        crear ? postProv(provName) : putProv(provName, newProvName)
                    }}>     
                        <input className='modal-input' onChange={(e) => {
                            e.preventDefault()
                            setProv(e.target.value)
                        }} placeholder={ crear ? 'Nombre' : 'Nombre antiguo'}/>
                        
                        {!crear && <input className='modal-input' onChange={(e) => {
                            e.preventDefault()
                            setNewProv(e.target.value)
                        }} placeholder='Nombre nuevo'/>}
                        <button className='modal-button' type='submit'>{crear ? 'Crear' : 'Editar'}</button>
                    </form>
                </div>
            </div>
        }
        </>
    )
}

export default CreateModal;