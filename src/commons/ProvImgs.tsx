import alava from '../assets/provincias/alava.png'
import albacete from '../assets/provincias/albacete.png'
import alicante from '../assets/provincias/alicante.png'
import almeria from '../assets/provincias/almeria.png'
import Asturias from '../assets/provincias/asturias.png'
import avila from '../assets/provincias/avila.png'
import badajoz from '../assets/provincias/badajoz.png'
import baleares from '../assets/provincias/baleares.png'
import barcelona from '../assets/provincias/barcelona.png'
import bilbao from '../assets/provincias/bilbao.png'
import burgos from '../assets/provincias/burgos.png'
import caceres from '../assets/provincias/caceres.png'
import cadiz from '../assets/provincias/cadiz.png'
import canarias from '../assets/provincias/canarias.png'
import cantabria from '../assets/provincias/cantabria.png'
import castellon from '../assets/provincias/castellon.png'
import ciudadreal from '../assets/provincias/ciudadreal.png'
import cordoba from '../assets/provincias/cordoba.png'
import cuenca from '../assets/provincias/cuenca.png'
import girona from '../assets/provincias/girona.png'
import granada from '../assets/provincias/granada.png'
import guadalajara from '../assets/provincias/guadalajara.png'
import huelva from '../assets/provincias/huelva.png'
import huesca from '../assets/provincias/huesca.png'
import jaen from '../assets/provincias/jaen.png'
import coruna from '../assets/provincias/lacoruña.png'
import rioja from '../assets/provincias/larioja.png'
import leon from '../assets/provincias/leon.png'
import lleida from '../assets/provincias/lleida.png'
import lugo from '../assets/provincias/lugo.png'
import madrid from '../assets/provincias/madrid.png'
import malaga from '../assets/provincias/malaga.png'
import murcia from '../assets/provincias/murcia.png'
import navarra from '../assets/provincias/navarra.png'
import orense from '../assets/provincias/orense.png'
import palencia from '../assets/provincias/palencia.png'
import pontevedra from '../assets/provincias/pontevedra.png'
import salamanca from '../assets/provincias/salamanca.png'
import donosti from '../assets/provincias/sansebastian.png'
import segovia from '../assets/provincias/segovia.png'
import sevilla from '../assets/provincias/sevilla.png'
import soria from '../assets/provincias/soria.png'
import tarragona from '../assets/provincias/tarragona.png'
import teruel from '../assets/provincias/teruel.png'
import toledo from '../assets/provincias/toledo.png'
import valencia from '../assets/provincias/valencia.png'
import valladolid from '../assets/provincias/valladolid.png'
import zamora from '../assets/provincias/zamora.png'
import zaragoza from '../assets/provincias/zaragoza.png'

interface IProvImg {
    prov: string,
    img: string
}

const provs: Array<IProvImg> = [{prov: 'alava', img:alava},
    { prov: 'albacete', img: albacete},
    { prov: 'alicante', img: alicante},
    { prov: 'almeria', img: almeria},
    { prov: 'asturias', img: Asturias},
    { prov: 'avila', img: avila},
    { prov: 'badajoz', img: badajoz},
    { prov: 'baleares', img: baleares},
    { prov: 'barcelona', img: barcelona},
    { prov: 'bilbao', img: bilbao},
    { prov: 'burgos', img: burgos},
    { prov: 'caceres', img: caceres},
    { prov: 'cadiz', img: cadiz},
    { prov: 'canarias', img: canarias},
    { prov: 'cantabria', img: cantabria},
    { prov: 'castellón', img: castellon},
    { prov: 'ciudadreal', img: ciudadreal},
    { prov: 'cordoba', img: cordoba},
    { prov: 'cuenca', img: cuenca},
    { prov: 'girona', img: girona},
    { prov: 'granada', img: granada},
    { prov: 'guadalajara', img: guadalajara},
    { prov: 'huelva', img: huelva},
    { prov: 'huesca', img: huesca},
    { prov: 'jaen', img: jaen},
    { prov: 'coruña', img: coruna},
    { prov: 'rioja', img: rioja},
    { prov: 'leon', img: leon},
    { prov: 'lleida', img: lleida},
    { prov: 'lugo', img: lugo},
    { prov: 'madrid', img: madrid},
    { prov: 'malaga', img: malaga},
    { prov: 'murcia', img: murcia},
    { prov: 'navarra', img: navarra},
    { prov: 'orense', img: orense},
    { prov: 'palencia', img: palencia},
    { prov: 'pontevedra', img: pontevedra},
    { prov: 'salamanca', img: salamanca},
    { prov: 'donosti', img: donosti},
    { prov: 'segovia', img: segovia},
    { prov: 'sevilla', img: sevilla},
    { prov: 'soria', img: soria},
    { prov: 'tarragona', img: tarragona},
    { prov: 'teruel', img: teruel},
    { prov: 'toledo', img: toledo},
    { prov: 'valencia', img: valencia},
    { prov: 'valladolid', img: valladolid},
    { prov: 'zamora', img: zamora},
    { prov: 'zaragoza', img: zaragoza}]

export default provs