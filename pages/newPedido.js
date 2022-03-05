import React,{useState} from 'react';
import Layout from '../components/Layout';
import DefineCliente from '../components/pedidos/defineCliente';
import DefineProducts from '../components/pedidos/defineProducts';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';
import { useSelector } from 'react-redux';
import mutations from '../graphql/mutations'
import query from '../graphql/query';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';


const NewPedido = () => {
    const cliente = useSelector(state => state.pedidos.client)
    const productos = useSelector(state => state.pedidos.product)
    const total = useSelector(state => state.pedidos.total)

    const [newOrder] = useMutation(mutations.NEW_ORDER,{
        update(cache, {data:{newOrder}}){
            const {getOrderBySeller} = cache.readQuery({query: query.GET_ORDERS})

            cache.writeQuery({
                query: query.GET_ORDERS,
                data:{
                    getOrderBySeller: [...getOrderBySeller, newOrder ]
                }
            })
        }
    })
    const [msg, setMsg] = useState(null)
    const router = useRouter()

    const validatePedido = () =>{
        return !productos.every(producto => producto.cantidad > 0) || total===0 ||  !cliente ? "opacity-50 cursor-not-allowed" :  ""
    }

    const createOrder =async () =>{

        const order = productos.map(({existence,__typename,...producto})=> producto )
        
         try {
            const {data} = await newOrder({
                variables:{
                   input:{
                    cliente:cliente.id,
                    total,
                    order
                   }
                }
            })
            Swal.fire(
                'Creado!',
                'El pedido se registró correctamente',
                'success'
            )
              router.push("/Pedidos")
        } catch (error) {
            setMsg(error.message)
            setTimeout(() => {
                setMsg(null)
            }, 3000);  
        }
    } 

    const viewMessage = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{msg}</p>
            </div>
        )
    }
    
    return (
        <Layout>
               {msg && viewMessage()}
            <h1 className='text-2xl text-gray-800 font-light'>Nuevos Pedidos</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <DefineCliente />
                    <DefineProducts />
                    <ResumenPedido />
                    <Total />

                    <button
                    onClick={createOrder}
                    type='button'
                    className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validatePedido()} `}
                    >Registrar Pedido</button>
                </div>
            </div>

        </Layout>
    );
}

export default NewPedido;