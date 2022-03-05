import {
    SELECT_CLIENTE,
    SELECT_PRODUCT,
    CANTIDAD_PRODUCTS,
    UPDATE_TOTAL,
}from '../types'
import store from '../store'

export function calculateTotal(){
    return (dispatch)=>{
       dispatch(updateTotal())
    }
}
const updateTotal = () =>({
    type: UPDATE_TOTAL
})


export function saveClient(data){
    return (dispatch) =>{
        dispatch(selectClient(data))
    }
}
const selectClient = data =>({
    type: SELECT_CLIENTE,
    payload: data
})

export function saveProduct(data){
    return (dispatch) =>{
        const state = store.getState()
         let newState
         if(state.pedidos.product.length>0){
             newState = data.map(producto => {
                 const newObject = state.pedidos.product.find(productState => productState.id === producto.id)
                 return {...producto, ...newObject }
             })
         }else{
             newState = data
         }
        dispatch(selectProduct(newState))
    }
}
const selectProduct = data =>({
    type: SELECT_PRODUCT,
    payload: data
})

export function savePedido(data){
    return (dispatch)=>{
        dispatch(updatePedido(data))
    }
}

const updatePedido = data =>({
    type: CANTIDAD_PRODUCTS,
    payload: data
})


