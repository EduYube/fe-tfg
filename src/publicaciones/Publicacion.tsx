import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IPub } from "../stores/publicaciones/PubIData"
import { PubsStoreProvider, PubStore } from "../stores/publicaciones/PubStore"
import './Pubs.css'
import PostModal from "../commons/PostModal"

const Publicaciones = () => {
    return(<>
        <PubsStoreProvider>
            <PubsComp />
        </PubsStoreProvider>
    </>)
}
const PubsComp = () => {
    const url = 'http://localhost:8080/publicaciones/'
    const { ciudad } = useParams()
    const { dispatch, loged, admin} = useContext(PubStore)
    const [modal, showModal] = useState(false)
    const [crear, setCrear] = useState(false)
    const [pub, setPub] = useState<IPub>()

    useEffect(() => {
        !pub && !modal && getPubsDeatilData(ciudad) 
    }, [])

    const getPubsDeatilData = async (ciudad: string | undefined) => {
        await fetch(url+ciudad).then((res) => {
            if(res.ok){
              res.json().then((data) => {
                if(data){
                    setPub(data)
                    setCrear(false)
                    showModal(false)
                    return dispatch({
                    type: 'GET',
                    payload: data
                    })
                }  else {
                    setCrear(true)
                    showModal(true)
                }
              })
            } else {
                setCrear(true)
                showModal(true)
            }
          })
    }

    const postPub = async (texto: string, ciudad:string, provincia: string, img: string) => {
        const publi = JSON.stringify({ texto, ciudad, provincia, img})
        await fetch(url,{
            method: 'POST',
            body: publi
        }).then((res) => {
            if(res.ok) {
                setPub(JSON.parse(publi))
                getPubsDeatilData(pub?.id.toString())
                return
            }
        })
    }
    const image = (img: string) => {
        return `/publicaciones/${img}`
    }
    return(<>
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
        { pub ?
            <div>
                <img className='img-post' src={image(pub.img)} />
                <p>{pub.text}</p>
                { pub.comentarioId && <div>
                <p className='section-comments'>COMENTARIOS</p>
                <p className="comment-text">{pub.comentarioId}</p>
                </div>}
            </div> : 
            admin && <button className='crear-button' onClick={(e) => {
                e.preventDefault()
                showModal(true)
                setCrear(true)
            }}> CREAR PUBLICACIÓN</button> 
        }
        { loged && !showModal &&
        <div className='comment'>
            <textarea className="comment-box" maxLength={500}/>
            <button className="crear-button">Enviar</button>
        </div>
        }
        <PostModal 
            modalState ={modal}
            crear = {crear}
            show={showModal}
            postModal={postPub}
        />
    </>)
}

export default Publicaciones