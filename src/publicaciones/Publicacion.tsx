import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IPub } from "../stores/publicaciones/PubIData"
import { PubsStoreProvider, PubStore } from "../stores/publicaciones/PubStore"
import './Pubs.css'
import PostModal from "../commons/PostModal"
import { ComentarioStore, ComentarioStoreProvider } from "../stores/comentario/ComentarioStore"
import { IComentario } from "../stores/comentario/ComentarioIData"
import Info from "../commons/Info"

const Publicaciones = () => {
    return(<>
        <PubsStoreProvider>
            <ComentarioStoreProvider>
                <PubsComp />
            </ComentarioStoreProvider>
        </PubsStoreProvider>
    </>)
}
const PubsComp = () => {
    const url = 'http://localhost:8080/'
    const { ciudad } = useParams()
    const { dispatch, loged, admin, user} = useContext(PubStore)
    const { comentarioState, dispatch: comentarioDispatch } = useContext(ComentarioStore)
    const [modal, showModal] = useState(false)
    const [crear, setCrear] = useState(false)
    const [pub, setPub] = useState<IPub>()
    const [comentario, setComentario] = useState('')
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        !pub && !modal && getPubsDeatilData(ciudad) 
    }, [])

    const getComentarios = async (id: number) => {
        await fetch(url+`/comentarios/${id}`).then((res) => {
            if(res.ok){
                res.json().then((data) => {
                    if(data){
                        comentarioDispatch({
                            type: 'GET',
                            payload: data
                        })
                    }
                })
            } else {
                setError('No se han podido cargar los comentarios')
                setShowError(true)
            }
        })
    }

    const postComentarios = async (texto: string, id: number) => {
        const comentario = JSON.stringify({ texto, id, user})
        await fetch(url+'/comentarios/',{
            method: 'POST',
            body: comentario
        }).then((res) => {
            if(res.ok){
                getComentarios(id)
            } else {
                setError('No se ha podido crear el comentario')
                setShowError(true)
            }
        })
    }

    const getPubsDeatilData = async (ciudad: string | undefined) => {
        await fetch(url+'/publicaciones/'+ciudad).then((res) => {
            if(res.ok){
              res.json().then((data) => {
                if(data){
                    setPub(data)
                    setCrear(false)
                    showModal(false)
                    getComentarios(data.id)
                    return dispatch({
                    type: 'GET',
                    payload: data
                    })
                }  else {
                    if(admin){
                        setCrear(true)
                        showModal(true)
                    } else {
                        setError('No hay publicaciones para esta ciudad')
                        setShowError(true)
                    }
                }
              })
            } else {
                if(admin){
                    setCrear(true)
                    showModal(true)
                } else {
                    setError('No hay publicaciones para esta ciudad')
                    setShowError(true)
                }
            }
          })
    }

    const postPub = async (texto: string, ciudad:string, provincia: string, img: string) => {
        const publi = JSON.stringify({ texto, ciudad, provincia, img})
        await fetch(url+'/publicaciones/',{
            method: 'POST',
            body: publi
        }).then((res) => {
            if(res.ok) {
                setPub(JSON.parse(publi))
                getPubsDeatilData(ciudad)
                return
            }
        })
    }

    return(<>
    {console.log(pub)}
        <div className='section'>
            <p className='section-title'>{ciudad?.toUpperCase()}</p>
            { admin && pub &&
                <div className='section-buttons'>
                    <button className='crear-button' onClick={(e) => {
                        e.preventDefault()
                        setCrear(false)
                        showModal(true)
                    }}> EDITAR PUBLICACIÓN</button> 
                </div>
            }
        </div>
        { pub && <div className='comments'>
            <div className='container'>
                <img className='img-post' src={`/publicaciones/${pub.image?.toLowerCase()}.png`} />
                <p className='content-right'>{pub.text}</p>
            </div>
            { comentarioState.comentarios.length > 0 && 
                <div className='comments'>
                    <p className='section-comments'>COMENTARIOS</p>
                    {
                        comentarioState.comentarios.map((comentario: IComentario) => {
                            return ( <>
                                <p className="comment-text">{comentario.usuario}</p>
                                <p className='comment-text'>{comentario.texto}</p>
                                </>
                            )
                        })
                    }
                </div>
            }
            </div>
        }
        { loged && !modal &&
        <div className='comment'> 
            <div>
                <textarea className="comment-box" value={comentario} maxLength={500} onChange={(e) => {
                    setComentario(e.target.value)
                }}/>
                <p className="char-count">
                    {500 - comentario.length}/500 caracteres restantes
                </p>
            </div>
            <button className="comment-button" onClick={(e) => {
                e.preventDefault()
                if(comentario.length > 0 && pub){
                    postComentarios(comentario, pub.id)
                    setComentario('')
                }   
            }}>Enviar</button>
        </div>
        }

        <PostModal 
            modalState ={modal}
            crear = {crear}
            show={showModal}
            postModal={postPub}
        />
        <Info 
            infoState={showError}
            info={error} 
            show={setShowError} />
    </>)
}

export default Publicaciones