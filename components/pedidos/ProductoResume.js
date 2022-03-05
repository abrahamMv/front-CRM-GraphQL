import React,{useState,useEffect} from 'react';
import {savePedido, calculateTotal} from '../../actions/PedidosActions'
import {useDispatch} from 'react-redux'

const ProductoResume = ({product}) => {
    const {name, price} = product
    const dispatch = useDispatch()

    const [cantidad, setCantidad] = useState(0)
    const updateTotal = () => dispatch(calculateTotal())

    useEffect(()=>{
        updateCantidad()
        updateTotal()
    },[cantidad])

    const updateCantidad = () =>{
        const newProduct ={...product, cantidad: Number(cantidad)}
        dispatch(savePedido(newProduct))
    }
    return ( 
        <div className='md:flex md:justify-between md:items-center mt-5'>
            <div className='md:w-2/4 mb-2 md:mb-0'>
                <p className='text-sm'>{name}</p>
                <p>$ {price}</p>
            </div>
            <input
            type="number"
            value={cantidad}
            placeholder='Cantidad'
            className='shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4'
            onChange={(e) => setCantidad(e.target.value)}
            />
        </div>
     );
}
 
export default ProductoResume;