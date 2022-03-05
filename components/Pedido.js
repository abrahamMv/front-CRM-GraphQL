import React, { useState, useEffect } from 'react';
import mutations from '../graphql/mutations';
import query from '../graphql/query';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

const Pedido = ({ order }) => {

    const { id, total, cliente, state } = order

    const [stateOrder, setStateOrder] = useState(state)
    const [clase, setClase] = useState('')
    const [updateOrder] = useMutation(mutations.UPDATE_STATE_ORDER)
    const [deleteOrder] = useMutation(mutations.DELETE_ORDER,{
        update(cache){
            const {getOrderBySeller} = cache.readQuery({query : query.GET_ORDERS})

            cache.writeQuery({
                query:query.GET_ORDERS,
                data:{
                    getOrderBySeller: getOrderBySeller.filter(now => now.id !==id)
                }
            })
        }
    })

    useEffect(() => {
        if (stateOrder) {
            setStateOrder(stateOrder)
        }
        claseOrder()
    }, [stateOrder])

    const claseOrder = () =>{
        if(stateOrder==="PENDIENTE"){
            setClase("border-yellow-500")
        }else if(stateOrder==="COMPLETADO"){
            setClase("border-green-500")
        }else{
            setClase("border-red-800")
        }
    }

    const updateState = async state =>{
        try {
            const {data} = await updateOrder({
                variables:{
                    id,
                    input:{
                        cliente:cliente.id,
                        state
                    }
                }
            })
            setStateOrder(data.updateOrder.state);
        } catch (error) {
            console.log(error);
        }
    }

    const removeOrder = async () =>{

        Swal.fire({
            title: '¿Deseas eliminar este Pedido?',
            text: "Esta accion no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const {data} = await deleteOrder({
                        variables:{
                            id
                        }
                    })
                    Swal.fire(
                        'Eliminado!',
                        data.deleteOrder,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }

            }
        })
       
    }
    return (
        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg `}>
            <div>
                <p className='font-bold text-gray-800'>Cliente: {cliente.name} {cliente.lastName}</p>

                {cliente.email &&
                    (
                        <p className='flex items-center py-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {cliente.email}
                        </p>
                    )
                }

                {cliente.phone &&
                    (
                        <p className='flex items-center py-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {cliente.phone}
                        </p>
                    )
                }

                <h2 className='text-gray-800 font-bold mt-10'>Estado Pedido: </h2>

                <select
                    className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold'
                    value={stateOrder}
                    onChange={e => updateState(e.target.value)}
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>
            </div>

            <div>
                <h2 className='text-gray-800 font-bold mt-2'>Resumen del Pedido</h2>

                {order.order.map(articulo => (
                    <div key={articulo.id} className='mt-4'>
                        <p className='text-sm text-gray-600'>Producto: {articulo.name}</p>
                        <p className='text-sm text-gray-600'>Cantidad: {articulo.cantidad}</p>
                    </div>
                ))}

                <p className='text-gray-800 font-bold mt-3'>Total a pagar:
                    <span className='font-light'>$ {total}</span>
                </p>
                <button onClick={removeOrder} className='flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold'>
                    Eliminar Pedido
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Pedido;