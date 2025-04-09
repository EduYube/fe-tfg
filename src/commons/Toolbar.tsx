import './Toolbar.css';
import { Link } from 'react-router-dom';
import out from '../assets/logos/Logo-Out.svg';
import encabezado from '../assets/encabezado.png';
import logo from '../assets/logos/Logo-LVDL.png';
import { useState, useContext } from 'react';
import { UserStore, UserStoreProvider } from '../stores/users/UserStore';

function ToolbarComponent(props: any) {
    const {state, dispatch} = useContext(UserStore);
    const [loged, setLoged] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const baseURL = 'http://localhost:8080/'
    
    const logOut = () => {
        setPass('')
        setUser('')
        setLoged(false)
        setShowLogin(false)
        return dispatch({
            type: 'OUT',
            payload: {name: '', password:'', admin: false}
        })
    }

    const login = async () => {
        const cred = {nick: user, password: pass}
        await fetch(baseURL+'usuarios',{
            method: 'POST',
            body: JSON.stringify(cred)
            }
        ).then(res => {
            if(res.ok){
                setLoged(true)
                setShowLogin(true)
                res.json().then(data => {
                    return dispatch({
                        type: 'LOGIN',
                        payload: data
                    })
                })
            } else {
                setLoged(false)
                setShowLogin(true)
            }
        })
    }

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
                            <div className={showLogin ? '' : 'none-vis'}>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setShowLogin(false)
                                    setUser('')
                                    setPass('')
                                }} className='toolbar-close'>X</button>
                                <input className='toolbar-input' value={user} onChange={(e) => {
                                    e.preventDefault()
                                    setUser(e.target.value)
                                }} placeholder='Usuario'/>
                                <input className='toolbar-input' value={pass} type='password' onChange={(e) =>{ 
                                    e.preventDefault()
                                    setPass(e.target.value)
                                }} placeholder='Contraseña'/>
                            </div>
                            <button className='toolbar-button' onClick={(e) => {
                                e.preventDefault()
                                !showLogin ? setShowLogin(true) : login()
                                }}>Ingresar</button>
                            <button className='toolbar-button'>Registrar</button>
                        </form>  
                        : <div className='toolbar-right'>
                            <h3 className='user-name'> Hola {state.nick} </h3> 
                            <img className='toolbar-out' src={out} onClick={(e) => {
                                e.preventDefault()
                                logOut()
                            }}/>
                        </div>
                    }
            </div>
    </>)
}

export default function Toolbar(props: any) {
    return(
    <UserStoreProvider>
        <ToolbarComponent />
        {props.children}
    </UserStoreProvider>)
}