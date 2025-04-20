import cariño from '../assets/ciudades/cariño.png'
import bilbao from '../assets/ciudades/bilbao.png'
import peñiscola from '../assets/ciudades/peñiscola.png'
import covadonga from '../assets/ciudades/covadonga.png'

export interface ICiudadesImg {
    ciudad: string,
    img: string
}

const CiudadesImg: Array<ICiudadesImg> = [
    {ciudad: 'cariño', img: cariño},
    {ciudad: 'bilbao', img: bilbao},
    {ciudad: 'peñíscola', img: peñiscola},
    {ciudad: 'covadonga', img: covadonga},
]

export default CiudadesImg