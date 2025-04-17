import { useContext, useEffect } from 'react'
import { CiudadesStore, CiudadesStoreProvider } from './stores/ciudades/CiudadStore'
import { ICiudad } from './stores/ciudades/CiudadIData'
import { Link } from 'react-router-dom'
import logoIg from './assets/logos/Logo-Insta.png'
import logoX from './assets/logos/Logo-Twitter.png'
import logoPin from './assets/logos/Logo-Pinterest.png'
import logoCont from './assets/logos/Logo-Contacto.png'
import images from './commons/CiudadesImg'
import './Home.css';

const Home = () => {
  return (
    <>
      <CiudadesStoreProvider>
        <Dashboard />
      </CiudadesStoreProvider>
    </>
  )
}

  const Dashboard = () => {
    const { ciudadesState, dispatch: ciudadesDispatch } = useContext(CiudadesStore)
    const baseURL = 'http://localhost:8080/'
  
    useEffect(() => {
      ciudadesState.ciudades.length === 0 && getCiudadesData() 
    })
  
    const getCiudadesData = async () => {
      await fetch(baseURL+'ciudades').then((res) => {
        if(res.ok){
          res.json().then( (data) => {
            return ciudadesDispatch({
              type: 'GET',
              payload: data
            })
          })
        }
      })
    }
    return (<>
      <div className='main-nav'>
      <Link className='nav-text' to='/provincias'>Destinos</Link>
        <button className='nav-text'>Sobre Nosotros</button>
        <p className='nav-separator'> | </p>
        <div className='nav-icons'>
            <img className='nav-logo' src={logoIg} />
            <img className='nav-logo-tw' src={logoX} />
            <img className='nav-logo' src={logoPin} />
            <img className='nav-logo' src={logoCont} />
        </div>
      </div>
    { (ciudadesState.ciudades.length > 0) && 
      <div className='ciudades'>
        <h3 className='ciudades-title'>Destinos favoritos de Lexa</h3>
        {
          ciudadesState.ciudades.slice(0,4).map((ciudad: ICiudad) => {
            return(
              <Ciudad value={ciudad} key={ciudad.id}/>
            )
          })
        }
      </div>
    }
    </>);
  }
  function Ciudad(ciudad: any){
    const image = images.find((obj) => {
      if(obj.ciudad == ciudad.value.name.toLowerCase()){
      return obj
      }
    })
    return (<>{
      image && <img className='ciudades-img' src={image?.img} />}</>
    )
  }

export default Home;
