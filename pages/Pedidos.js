import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
import query from '../graphql/query';
import { useQuery } from '@apollo/client';
import Pedido from '../components/Pedido';

const Pedidos = () => {

     const {data, loading} = useQuery(query.GET_ORDERS)
     if(loading) return "Cargando..."
     return (
          <Layout>
               <h1 className='text-2xl text-gray-800 font-loght'>Pedidos</h1>

               <Link href="/newPedido">
                    <a className='bg-blue-800 py-2 px-3 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'>Nuevo Pedido</a>
               </Link>

               {data.getOrderBySeller ===0 ? (
                    <p className='mt-5 text-center text-2xl'>Aún no hay pedidos</p>
               ):(
                 data.getOrderBySeller.map(order => (
                      <Pedido
                      key={order.id}
                      order={order}
                      />
                 ))
               )}
          </Layout>
     );
}

export default Pedidos;