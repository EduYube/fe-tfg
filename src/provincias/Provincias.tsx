import { ProvStoreProvider } from "../stores/provincias/ProvStore"
import { IProvincia } from '../stores/provincias/ProvIData'
import { ProvStore } from '../stores/provincias/ProvStore'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import provs from '../commons/ProvImgs'
import CreateModal from '../commons/CreateModal'
import Error from "../commons/Error"
import './Prov.css'

const Provincias = () => {
    return(<>
            <ProvStoreProvider>
                <ProvinciasComp />
            </ProvStoreProvider>
    </>)
}


const ProvinciasComp = () => {
    const [modal, showModal] = useState(false)
    const [crear, setCrear] = useState(false)
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const {provState, dispatch, admin} = useContext(ProvStore);
    const url = 'http://localhost:8080/provincias/'
    useEffect(() => {
        provState.provincias.length == 0 && getProvData()
    })

    const getProvData = async () => {
        const data = await fetch(url,{
            method: 'GET'
            })
        const dataJSON = await data.json()
            return dispatch({
            type: 'GET',
            payload: dataJSON
            })
    }
    const postProvData = async (name: string) => {
        const payload = JSON.stringify({
        nombre: name
        })
        await fetch(url, {
            method: 'POST',
            body: payload
            }).then((res) => {
            if(res.ok){
                getProvData()
            } else {
                setError('No se ha podido crear la provincia')
                setShowError(true)
            }
        })
    } 
    const putProvData = async(oldProv: string, newProv: string) => {
        const oldVal: IProvincia = provState.provincias.find((prov: IProvincia) => {
            if (prov.name == oldProv){
                return prov
            }
        })
        if(oldProv){
            await fetch(url+oldVal.id, {
                method: 'PUT',
                body: JSON.stringify({nombre: newProv})
                }).then((res) => {
                if(res.ok) {
                    getProvData()
                } else {
                    res.json().then((data) => {
                        setError(data.error.message)
                        setShowError(true)
                    })
                }
            })
        } else {
            setError('No existe la provinca a modificar')
            setShowError(true)
        }
    }

    function Provincia(_: any){
        const image = provs.find((prov) => {
            if(prov.prov == _.value.name.toLowerCase()){
            return prov
            }
        })
        const provName = image?.prov
        return (
            <Link to={'/ciudades/'+provName}>
                <img className='ciudades-img' src={image?.img} />
            </Link>
        )
    }

    return(<>  
        <div className='section'>
            <p className='section-title'>DESTINOS</p>
            { admin && 
                <div className='section-buttons'>
                    <button className='crear-button' onClick={(e) => {
                        e.preventDefault()
                        setCrear(false)
                        showModal(!modal)
                    }}> EDITAR PROVINCIA</button> 
                    <button className='crear-button' onClick={(e) => {
                        e.preventDefault()
                        showModal(!modal)
                        setCrear(true)
                    }}> CREAR PROVINCIA</button> 
                </div>
            }
        </div>
        {
            provState.provincias.map((prov :IProvincia) => {
                return( <Provincia value={prov} key={prov.id} />)
            })
        }
        <CreateModal 
            modalState ={modal}
            crear = {crear}
            show={showModal}
            postModal={postProvData}
            putModal={putProvData}
        />
        <Error 
            errorState={showError}
            error={error} 
            show={setShowError}
        />
    </>)
}


export default Provincias;