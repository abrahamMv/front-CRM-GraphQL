import {combineReducers} from 'redux';
import PedidoReducer from './PedidoReducer'


export default combineReducers({
    pedidos: PedidoReducer,
})