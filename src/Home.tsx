import { Link } from 'react-router-dom'
import logoIg from './assets/logos/Logo-Insta.png'
import logoX from './assets/logos/Logo-Twitter.png'
import logoPin from './assets/logos/Logo-Pinterest.png'
import logoCont from './assets/logos/Logo-Contacto.png'
import images from './commons/CiudadesImg'
import './Home.css';
import { PubsStoreProvider, PubStore } from './stores/publicaciones/PubStore'
import { use, useContext, useEffect } from 'react'
import { IPub } from './stores/publicaciones/PubIData'

const Home = () => {
  return (
    <>
      <PubsStoreProvider>
        <Dashboard />
      </PubsStoreProvider>
    </>
  )
}

  const Dashboard = () => {
    const { pubsState, dispatch } = useContext (PubStore)
    const baseURL = 'http://localhost:8080/'

    useEffect( () => {
      pubsState.pubs.length == 0 && getPubsData()
      },[]
    )

    function getPubsData(){
      fetch(baseURL + 'publicaciones').then((res) => {
        if(res.ok){
          res.json().then((data) => {
            if(data){
              dispatch({
                type: 'GET',
                payload: data
              })
            }
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
    { images.length > 0 && 
      <div className='ciudades'>
        <h3 className='ciudades-title'>Destinos favoritos de Lexa</h3>
        {
          images.map((ciudad: any) => {
            return(
              <Ciudad value={ciudad} key={ciudad.id}/>
            )
          })
        }
      </div>
    }
    { pubsState.pubs.length > 0 && <>
      <h3 className='ciudades-title'>Últimas publicaciones de Lexa</h3>
      <div className='pubs'>
      {
        pubsState.pubs.reverse().slice(0,2).map((pub: IPub) => {
          return(
            <Pubs value={pub} key={pub.id}/>
          )
        })
      }
      </div>
      </>
    }
    </>);
  }

  function Pubs(pub: any){
    const image = `/publicaciones/${pub.value.img.toLowerCase()}.png`
    return(<>
        <div className='pub-card'>
          <Link to={'/publicacion/'+pub.value.id} key={pub.id} className='pub-content'>
            <img className='pub-img' src={image} />
            <p className='pub-text'>{pub.value.img}</p>
          </Link>
        </div>
    </>)
  }

  function Ciudad(ciudad: any){
    const image = images.find((obj) => {
      if(obj.ciudad == ciudad?.value.ciudad?.toLowerCase()){
      return obj
      }
    })
    return (<>{
      image && <img className='ciudades-img' src={image?.img} />}</>
    )
  }

export default Home;
