import {
    SELECT_CLIENTE,
    SELECT_PRODUCT,
    CANTIDAD_PRODUCTS,
    UPDATE_TOTAL,
}from '../types'

const initialState ={
    client:{},
    product:[],
    total:0
}

export default function(state = initialState, action){
    switch(action.type){
        case SELECT_CLIENTE: 
        return{
            ...state,
            client:action.payload
        }
        case SELECT_PRODUCT: 
        return{
            ...state,
            product: action.payload
        }
        case CANTIDAD_PRODUCTS: 
        return{
            ...state,
            product: state.product.map(producto => producto.id ===action.payload.id ? producto = action.payload : producto)
        }
        case UPDATE_TOTAL: 
        return{
            ...state,
            total: state.product.reduce((newTotal, articulo)=> newTotal += articulo.price * articulo.cantidad,0)
        }
        default:return state
    }
}
  