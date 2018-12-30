import axios from 'axios'
import ip from '../../configIp'

export function ALL_PRODUCTS(){
    return {
        type: "ALL_PRODUCTS",
        payload: axios.get(`${ip}/products`)
    }
}

export function ALL_ORDERS(){
    return {
        type:"ALL_ORDERS",
        payload: axios.get(`${ip}/orders`)
    }
}
 
// export function GET_PRODUCT(data){
    
//     return {
//         type: "GET_MOVIE",
//         payload: axios.get('http://192.168.0.11:3333/moviesid', data)
//     }
// }