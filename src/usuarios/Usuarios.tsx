import { UsuarioStoreProvider, UsuarioStore } from "../stores/usuarios/UsuarioStore"
import { useContext, useEffect, useState } from "react"
import './Usuarios.css'
import { IUsuario } from "../stores/usuarios/UsuarioIData"
import ojoAbierto from '../assets/ojo-abierto.png'
import ojoCerrado from '../assets/ojo-cerrado.png'

const Usuarios = () => {
    return (
        <UsuarioStoreProvider>
            <UsuariosComp />
        </UsuarioStoreProvider>
    )
}

const UsuariosComp = () => {
const url = 'http://localhost:8080/'
const { usuarioState, dispatch, user } = useContext(UsuarioStore)
const [usuarios, setUsuarios] = useState([])

useEffect(() => {
    usuarioState.usuarios.length === 0 && getUsuariosData()
}, [])

const getUsuariosData = async () => {
    await fetch(url+'/usuarios').then((res) => {
        if(res.ok){
            res.json().then((data) => {
                if(data){
                    setUsuarios(data)
                    return dispatch({
                        type: 'GET',
                        payload: data
                    })
                }
            })
        }
    })
}

const putUser = async (user: IUsuario) => {
    await fetch(url+'/usuarios', {
        method: 'PUT',
        body: JSON.stringify(user)
    }).then((res) => {
        if(res.ok){
            getUsuariosData()
        }
    })
}

const deleteUser = async (nick: any) => {
    await fetch(url+'/usuarios', {
        method: 'DELETE',
        body: JSON.stringify(nick)
    }).then((res) => {
        if(res.ok){
            getUsuariosData()
        }
    })
}

const Usuario = (_: any) => {
        const [ nick, setNick ] = useState(_.value.nick)
        const [ admin, setAdmin ] = useState(_.value.admin == 1)
    return (
        <>
            <input className="alias-input" type="text" value={nick} onChange={(e) => {
                setNick(e.target.value)
            }}/>
            <input className="toggle" type="checkbox" checked={admin} onClick={(e) => {
                setAdmin(!admin)
            }}
            onChange={() => {
                setAdmin(!admin)
            }}/>
            <button className="delete-btn" title="Eliminar usuario" onClick={(e) => {
                deleteUser({nick: nick})
            }}>🗑️</button>
            <button className="edit-btn" onClick={(e) => {
                putUser({nick: nick, password: _.value.password, admin: admin ? 1 : 0})
            }}>✏️</button>
        </>
        )
}


const UsuarioPropio = (_: any) => {
        const [ nick, setNick ] = useState(_.value.nick)
        const [ password, setPassword ] = useState(_.value.password)
        const [ showPass, setShowPass ] = useState(false)
    return (
        <>
            <input className="alias-input" type="text" value={nick} onChange={(e) => {
                setNick(e.target.value)
            }}/>

            <div className="password-container">
                <input className="password-input" type={showPass ? 'text' : 'password'} value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPass(!showPass)} >
                    {showPass ? <img className='pass-img' src={ojoAbierto} alt="Ver" /> : <img className='pass-img' src={ojoCerrado} alt="No ver" />}
                </button>
            </div>
            <button className="delete-btn" title="Eliminar usuario" onClick={() => {
                deleteUser({nick: nick})
            }}>🗑️</button>
            <button className="edit-btn" onClick={(e) => {
                e.preventDefault()
                putUser({nick: nick, password: password, admin: _.value.admin})
            }}>✏️</button>
        </>
        )
}

const usuario = usuarios.length > 0 ? usuarios.find((it: IUsuario) => {
    if (it.nick === user.nick)
        return it
}) : user
    
    return (<>
    {console.log(usuarios)}
    {console.log(usuario)}
        {user && <> 
            <div className='section'>
              <p className='user-title'>Panel de usuario</p>
            </div>
            <div className="spacer" />
            <p className='user-title'>Mis datos</p>
            <div className="user-grid">
                <div className="grid-header">Alias</div>
                <div className="grid-header">Password</div>
                <div className="grid-header">Eliminar</div>
                <div className="grid-header">Editar</div>
                <UsuarioPropio value={usuario} key={user.nick} />
            </div>
            { user.admin &&
            <>
                <div className="spacer" />
                <p className='user-title'>Panel de administración</p>
                <div className="user-grid">
                    <div className="grid-header">Alias</div>
                    <div className="grid-header">Admin</div>
                    <div className="grid-header">Eliminar</div>
                    <div className="grid-header">Editar</div>
                    { usuarios.map((user: IUsuario) => {
                        return (
                            <Usuario value={user} key={user.nick} />
                        )
                    })}
                </div>
            </>}
            </>}
        </>
    )
}

export default Usuarios