import { useContext, useEffect, useState } from 'react'
import { ICiudad } from '../stores/ciudades/CiudadIData'
import { CiudadesStore, CiudadesStoreProvider } from "../stores/ciudades/CiudadStore"
import { Link, useParams } from 'react-router-dom'
import './Ciudades.css'
import CreateModal from '../commons/CreateModal'

const Ciudades = () => {
    return(<>
            <CiudadesStoreProvider>
                <CiudadesComp />
            </CiudadesStoreProvider>
    </>)
}
const CiudadesComp = () => {
    const { ciudadesState, dispatch, admin } = useContext(CiudadesStore)
    const url = 'http://localhost:8080/ciudades/'
    const { prov } = useParams()
    const [modal, showModal] = useState(false)
    const [crear, setCrear] = useState(false)
    useEffect(() => {
      ciudadesState.ciudades.length === 0 && getCiudadesData() 
    }, [])

    const getCiudadesData = async () => {
        await fetch(url).then((res) => {
          if(res.ok){
            res.json().then( (data) => {
              return dispatch({
                type: 'GET',
                payload: data
              })
            })
          }
        })
      }

    const postCiudadesData = async (nombre: string) => {
        const payload = JSON.stringify({
        nombre: nombre,
        provinciaId: prov
        })
        await fetch(url, {
            method: 'POST',
            body: payload
            }).then((res) => {
            if(res.ok){
                getCiudadesData()
            }
        })
    } 

    const putCiudadesData = async(oldCity: string, newCity: string) => {
        const oldVal: ICiudad = ciudadesState.ciudades.find((ciudad: ICiudad) => {
            if (ciudad.nombre == oldCity){
                return ciudad
            }
        })
        if(oldVal)
            await fetch(url+oldVal.id, {
                method: 'PUT',
                body: JSON.stringify({nombre: newCity})
                }).then((res) => {
                    if(res.ok){
                        getCiudadesData()
                    }
            })
    }

    function Ciudad(_: any){
        return (
        <Link to={'/publicacion/'+_.ciudad.nombre}>
            <button className='ciudad-button'>{_.ciudad.nombre}</button>
        </Link>
        )
    }
    return(<>  
        <div className='section'>
            <p className='section-title'>{prov?.toUpperCase()}</p>
            { admin && 
                <div className='section-buttons'>
                    <button className='crear-button' onClick={(e) => {
                        e.preventDefault()
                        setCrear(false)
                        showModal(!modal)
                    }}> EDITAR CIUDAD</button> 
                    <button className='crear-button' onClick={(e) => {
                        e.preventDefault()
                        showModal(!modal)
                        setCrear(true)
                    }}> CREAR CIUDAD</button> 
                </div>
            }
        </div>
        <div className='cities-spacer' />
        {
            ciudadesState.ciudades.map((ciudad: ICiudad) => {
                if (ciudad.provincia?.toLowerCase() == prov) {
                    return(<Ciudad ciudad={ ciudad } key={ciudad.id} />)
                }
            })
        }
        <CreateModal 
            modalState ={modal}
            crear = {crear}
            show={showModal}
            postModal={postCiudadesData}
            putModal={putCiudadesData}
        />
    </>)
}

export default Ciudades;