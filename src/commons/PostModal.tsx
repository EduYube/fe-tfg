import './Modal.css'
import React, { useState } from 'react'
import logo from '../assets/Logo-LVDL.png'

interface ModalProps {
    modalState: boolean;
    crear: boolean;
    show: (value: boolean) => void;
    postModal: (texto: string, ciudad:string, provincia: string, img: string) => void
  }
  
  
  const PostModal: React.FC<ModalProps> = ({ modalState, show, postModal: postProv }) => {
    const [texto, setTexto] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [provincia, setProvincia] = useState('')
    const [img, setImg] = useState('')
    return(
        <>
        {modalState &&
            <div className='overlay'>
                <div className='container'>
                    <button className='modal-close' onClick={(e) => {
                        e.preventDefault()
                        show(!modalState)}}
                    >X</button>
                    <h2>Crea el nuevo post</h2>
                    <img className='modal-logo' src={logo} />
                    <form className='modal-form' onSubmit={(e) => {
                        e.preventDefault()
                        show(!modalState)
                        postProv(texto, ciudad, provincia, img)
                    }}>     
                    <input className='modal-input' onChange={(e) => {
                        e.preventDefault()
                        setCiudad(e.target.value)
                    }} placeholder='Ciudad'/>
                    <input className='modal-input' onChange={(e) => {
                            e.preventDefault()
                            setProvincia(e.target.value)
                        }} placeholder='Provincia'/>
                        <input className='modal-input' onChange={(e) => {
                            e.preventDefault()
                            setImg(e.target.value)
                        }} placeholder='Imagen'/>
                        <input className='modal-input' onChange={(e) => {
                            e.preventDefault()
                            setTexto(e.target.value)
                        }} placeholder='Texto'/>
                        <button className='modal-button' type='submit'>Crear</button>
                    </form>
                </div>
            </div>
        }
        </>
    )
}

export default PostModal;