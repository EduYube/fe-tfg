import './Toolbar.css'
import { Link } from 'react-router-dom';
import out from '../assets/logos/Logo-Out.svg'
import encabezado from '../assets/encabezado.png'
import logo from '../assets/logos/Logo-LVDL.png'
import { useState } from 'react';

export default function Toolbar(props: any) {
    const [loged, setLoged] = useState(false)
    return(<>
        {props.children}
            <div className='toolbar' id='top'>
                <img className='encabezado' src={encabezado} />
                <div className='toolbar-left'>
                    <Link to='/'><img src={logo} className='logo' /></Link>
                    <h3 className='toolbar-title'>Tu sitio dogfriendly</h3>
                </div>
                    { !loged ?
                        <form className='toolbar-right'>     
                            <div className={loged ? '' : 'none-vis'}>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setLoged(false)
                                }} className='toolbar-close'>X</button>
                                <input className='toolbar-input' placeholder='Usuario'/>
                                <input placeholder='Contraseña'/>
                            </div>
                            <button className='toolbar-button' onClick={(e) => {
                                e.preventDefault()
                                setLoged(true)
                                }}>Ingresar</button>
                            <button className='toolbar-button'>Registrar</button>
                        </form>  
                        : <div className='toolbar-right'>
                            <h3 className='user-name'> Hola </h3> 
                            <img className='toolbar-out' src={out} onClick={(e) => {
                                e.preventDefault()
                                setLoged(false)
                                }}/>
                        </div>
                    }
            </div>
    </>)
}