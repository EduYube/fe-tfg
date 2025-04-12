import cariño from '../assets/ciudades/cariñoFav.png'
import bilbao from '../assets/ciudades/bilbaofav.png'
import peñiscola from '../assets/ciudades/peñiscolaFav.png'
import covadonga from '../assets/ciudades/covadongaFav.png'

interface ICiudadesImg {
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