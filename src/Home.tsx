import logoIg from './assets/logos/Logo-Insta.png'
import logoX from './assets/logos/Logo-Twitter.png'
import logoPin from './assets/logos/Logo-Pinterest.png'
import logoCont from './assets/logos/Logo-Contacto.png'
import './Home.css';

function Home() {
  return (
    <div className='main-nav'>
      <p className='nav-text'>Destinos</p>
      <button className='nav-text'>Sobre Nosotros</button>
      <p className='nav-separator'> | </p>
      <div className='nav-icons'>
          <img className='nav-logo' src={logoIg} />
          <img className='nav-logo-tw' src={logoX} />
          <img className='nav-logo' src={logoPin} />
          <img className='nav-logo' src={logoCont} />
      </div>
    </div>
  );
}

export default Home;
