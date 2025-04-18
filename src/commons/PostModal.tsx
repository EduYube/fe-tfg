import './Modal.css'
import React, { useState } from 'react'
import logo from '../assets/logos/Logo-LVDL.png'

interface ModalProps {
    modalState: boolean;
    crear: boolean;
    show: (value: boolean) => void;
    postModal: (texto: string, ciudad:string, provincia: string, img: string) => void
  }
  
  const StepZero = ({ciudad, setCiudad, provincia, setProvincia, img, setImg, setStep}: any) => { 
    return ( <>
            <input className='modal-input' value={ciudad} onChange={(e) => {
                e.preventDefault()
                setCiudad(e.target.value)
            }} placeholder='Ciudad'/>
            <input className='modal-input' value={provincia} onChange={(e) => {
                e.preventDefault()
                setProvincia(e.target.value)
            }} placeholder='Provincia'/>
            <input className='modal-input' value={img} onChange={(e) => {
                e.preventDefault()
                setImg(e.target.value)
            }} placeholder='Imagen'/>
            <button className='modal-button' onClick={(e) => {
                e.preventDefault()
                setStep(1)
            }}>Siguiente</button>
        </>)
}
const StepOne = ({ texto, setTexto, setStep}: any) => {
    return ( <>
            <input className='post-box' value={texto} onChange={(e) => {
                e.preventDefault()
                setTexto(e.target.value)
            }}/>
            <div className='buttons-container'>
                <button className='post-button' onClick={(e) => {
                    e.preventDefault()
                    setStep(0)
                }}>Anterior</button>
                <button className='post-button' type='submit'>Crear</button>
            </div>
        </>
    )}
  
  const PostModal: React.FC<ModalProps> = ({ modalState, show, postModal: postProv }) => {
    const [texto, setTexto] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [provincia, setProvincia] = useState('')
    const [img, setImg] = useState('')
    const [step, setStep] = useState(0)
    return(
        <>
        { modalState &&
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
                    {step == 0 ? <StepZero ciudad={ciudad} setCiudad={setCiudad} provincia={provincia} setProvincia={setProvincia} img={img} setImg={setImg} setStep={setStep} /> 
                    : <StepOne texto={texto} setTexto={setTexto} setStep={setStep} />}
                    </form>
                </div>
            </div>}
        </>
    )
}


export default PostModal;
