import './Toolbar.css';
import { Link } from 'react-router-dom';
import out from '../assets/logos/Logo-Out.svg';
import encabezado from '../assets/encabezado.png';
import logo from '../assets/logos/Logo-LVDL.png';
import { useState, useContext } from 'react';
import { UserStore, UserStoreProvider } from '../stores/users/UserStore';
import Modal from './Modal';
import Error from './Error';

function ToolbarComponent(props: any) {
    const {state, dispatch} = useContext(UserStore);
    const [loged, setLoged] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [register, showRegister] = useState(false)
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const baseURL = 'http://localhost:8080/'
    
    const logOut = () => {
        setPass('')
        setUser('')
        setLoged(false)
        setShowLogin(false)
        return dispatch({
            type: 'OUT',
            payload: {nombre: '', password:'', admin: false}
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
                setShowLogin(false)
                setShowError(false)
                res.json().then(data => {
                    return dispatch({
                        type: 'LOGIN',
                        payload: data
                    })
                })
            } else {
                setPass('')
                setUser('')
                setLoged(false)
                setShowLogin(false)
                setError("Algo ha ido mal, vuelve a intentarlo")
                setShowError(true)
            }
        })
    }
    
    const postUser = async (user: string, pass: string) => {
        const creat = {nick: user, password: pass, creation: true}
        await fetch (baseURL+'usuarios',{
            method: 'POST',
            body: JSON.stringify(creat)
            }
        ).then((res) => {
            console.log(res)
            if(res.ok){
                setShowError(false)
                res.json().then(data => {
                    return dispatch({
                        type: 'REG',
                        payload: data
                    })
                })
            } else {
                setPass('')
                setUser('')
                showRegister(false)
                setShowLogin(false)
                setError("Algo ha ido mal, vuelve a intentarlo")
                setShowError(true)
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
                        <form
                        className="toolbar-right"
                        onSubmit={(e) => {
                          e.preventDefault();
                          !showLogin ? setShowLogin(true) : login();
                        }}
                      >
                        {showLogin && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setShowLogin(false);
                                setUser("");
                                setPass("");
                              }}
                              className="toolbar-close" >
                              X
                            </button>
                            <input
                              className="toolbar-input"
                              value={user}
                              onChange={(e) => setUser(e.target.value)}
                              placeholder="Usuario" />
                            <input
                              className="toolbar-input"
                              value={pass}
                              type="password"
                              onChange={(e) => setPass(e.target.value)}
                              placeholder="Contraseña" />
                          </>
                        )}
                      
                        <button className="toolbar-button" type="submit">
                          Ingresar
                        </button>
                        <button
                          className="toolbar-button"
                          type="button"
                          onClick={() => showRegister(!register)}
                        >
                          Registrar
                        </button>
                      </form>
                        : <div className='toolbar-right'>
                            <h3 className='user-name'> Hola {state.nick} </h3> 
                            <img className='toolbar-out' src={out} onClick={(e) => {
                                e.preventDefault()
                                logOut()
                            }}/>
                        </div>
                    }
                <Modal 
                    modalState={register} 
                    show={showRegister} 
                    postUser={postUser}
                />
                <Error 
                    errorState={showError}
                    error={error} 
                    show={setShowError}
                />
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